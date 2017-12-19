// @flow

const EXTENT = require('../data/extent');

import type {OverscaledTileID} from '../source/tile_id';
import type {SymbolInstance} from '../data/bucket/symbol_bucket';
import type SymbolBucket from '../data/bucket/symbol_bucket';
import type StyleLayer from '../style/style_layer';
import type Tile from '../source/tile';

/*
    The CrossTileSymbolIndex generally works on the assumption that
    a conceptual "unique symbol" can be identified by the text of
    the label combined with the anchor point. The goal is to keep
    symbol opacity states (determined by collision detection animations)
    consistent as we switch tile resolutions.

    Whenever we add a label, we look for duplicates at lower resolution,
    and if we find one, we copy its opacity state. If we find duplicates
    at higher resolution, we mark the added label as "blocked".

    When we remove a label that's currently showing, we look for duplicates
    at higher resolution, and if we find one we copy our opacity state
    to that label.

    The code mostly assumes that at any given time a "unique symbol" will have
    one "non-duplicate" entry, and that the rest of the entries in the
    index will all be marked as duplicate. This is not necessarily true:

    (1) The code searches child/parent hierarchies for duplicates, but it
        is possible for the source to contain symbols with anchors on tile
        boundaries, where the symbol does not stay in the same hierarchy
        at all zoom levels.
    (2) A high resolution tile may contain two symbols with the same label
        but different anchor points. At lower resolution, both of those
        symbols will appear to be the same.

    In the cases that violate our assumptions, copying opacities between
    zoom levels won't work as expected. However, the highest resolution
    tile should always "win", so that after some fade flicker the right
    label will show.
*/

// Round anchor positions to roughly 4 pixel grid
const roundingFactor = 512 / EXTENT / 2;

class TileLayerIndex {
    tileID: OverscaledTileID;
    indexedSymbolInstances: {[string]: Array<{
        crossTileID: number,
        coord: {
            x: number,
            y: number
        }
    }>};
    bucketInstanceId: number;

    constructor(tileID: OverscaledTileID, symbolInstances: Array<SymbolInstance>, bucketInstanceId: number) {
        this.tileID = tileID;
        this.indexedSymbolInstances = {};
        this.bucketInstanceId = bucketInstanceId;

        for (const symbolInstance of symbolInstances) {
            const key = symbolInstance.key;
            if (!this.indexedSymbolInstances[key]) {
                this.indexedSymbolInstances[key] = [];
            }
            // This tile may have multiple symbol instances with the same key
            // Store each one along with its coordinates
            this.indexedSymbolInstances[key].push({
                crossTileID: symbolInstance.crossTileID,
                coord: this.getScaledCoordinates(symbolInstance, tileID)
            });
        }
    }

    // Converts the coordinates of the input symbol instance into coordinates that be can compared
    // against other symbols in this index. Coordinates are:
    // (1) world-based (so after conversion the source tile is irrelevant)
    // (2) converted to the z-scale of this TileLayerIndex
    // (3) down-sampled by "roundingFactor" from tile coordinate precision in order to be
    //     more tolerant of small differences between tiles.
    getScaledCoordinates(symbolInstance: SymbolInstance, childTileID: OverscaledTileID) {
        const zDifference = childTileID.canonical.z - this.tileID.canonical.z;
        const scale = roundingFactor / Math.pow(2, zDifference);
        const anchor = symbolInstance.anchor;
        return {
            x: Math.floor((childTileID.canonical.x * EXTENT + anchor.x) * scale),
            y: Math.floor((childTileID.canonical.y * EXTENT + anchor.y) * scale)
        };
    }

    findMatches(symbolInstances: Array<SymbolInstance>, newTileID: OverscaledTileID) {
        const tolerance = this.tileID.canonical.z < newTileID.canonical.z ? 1 : Math.pow(2, this.tileID.canonical.z - newTileID.canonical.z);

        for (const symbolInstance of symbolInstances) {
            if (symbolInstance.crossTileID) {
                // already has a match, skip
                continue;
            }

            const indexedInstances = this.indexedSymbolInstances[symbolInstance.key];
            if (!indexedInstances) {
                // No symbol with this key in this bucket
                continue;
            }

            const scaledSymbolCoord = this.getScaledCoordinates(symbolInstance, newTileID);

            for (const thisTileSymbol of indexedInstances) {
                // Return any symbol with the same keys whose coordinates are within 1
                // grid unit. (with a 4px grid, this covers a 12px by 12px area)
                if (Math.abs(thisTileSymbol.coord.x - scaledSymbolCoord.x) <= tolerance &&
                    Math.abs(thisTileSymbol.coord.y - scaledSymbolCoord.y) <= tolerance) {
                    symbolInstance.crossTileID = thisTileSymbol.crossTileID;
                    break;
                }
            }
        }
    }
}

class CrossTileIDs {
    maxCrossTileID: number;
    constructor() {
        this.maxCrossTileID = 0;
    }
    generate() {
        return ++this.maxCrossTileID;
    }
}

class CrossTileSymbolLayerIndex {
    indexes: {[zoom: string | number]: {[tileId: string | number]: TileLayerIndex}};

    constructor() {
        this.indexes = {};
    }

    addBucket(tileID: OverscaledTileID, bucket: SymbolBucket, crossTileIDs: CrossTileIDs) {
        if (this.indexes[tileID.overscaledZ] &&
            this.indexes[tileID.overscaledZ][tileID.key] &&
            this.indexes[tileID.overscaledZ][tileID.key].bucketInstanceId === bucket.bucketInstanceId) {
            return false;
        }

        let minZoom = 25;
        let maxZoom = 0;
        for (const zoom in this.indexes) {
            minZoom = Math.min(+zoom, minZoom);
            maxZoom = Math.max(+zoom, maxZoom);
        }

        // make all higher-res child tiles block duplicate labels in this tile
        for (let z = maxZoom; z > tileID.overscaledZ; z--) {
            const zoomIndexes = this.indexes[z];
            for (const id in zoomIndexes) {
                const childIndex = zoomIndexes[(id: any)];
                if (!childIndex.tileID.isChildOf(tileID)) continue;
                // Mark labels in this tile blocked, and don't copy opacity state
                // into this tile
                childIndex.findMatches(bucket.symbolInstances, tileID);
            }
        }

        // make this tile block duplicate labels in lower-res parent tiles
        for (let z = tileID.overscaledZ; z >= minZoom; z--) {
            const parentCoord = tileID.scaledTo(z);
            const parentIndex = this.indexes[z] && this.indexes[z][parentCoord.key];
            if (parentIndex) {
                parentIndex.findMatches(bucket.symbolInstances, tileID);
            }
        }

        for (const symbolInstance of bucket.symbolInstances) {
            if (!symbolInstance.crossTileID) {
                // symbol did not match any known symbol, assign a new id
                symbolInstance.crossTileID = crossTileIDs.generate();
            }
        }
        if (this.indexes[tileID.overscaledZ] === undefined) {
            this.indexes[tileID.overscaledZ] = {};
        }
        this.indexes[tileID.overscaledZ][tileID.key] = new TileLayerIndex(tileID, bucket.symbolInstances, bucket.bucketInstanceId);

        return true;
    }

    removeStaleBuckets(currentIDs: { [string | number]: boolean }) {
        let tilesChanged = false;
        for (const z in this.indexes) {
            const zoomIndexes = this.indexes[z];
            for (const tileKey in zoomIndexes) {
                if (!currentIDs[zoomIndexes[tileKey].bucketInstanceId]) {
                    delete zoomIndexes[tileKey];
                    tilesChanged = true;
                }
            }
        }
        return tilesChanged;
    }
}

class CrossTileSymbolIndex {
    layerIndexes: {[layerId: string]: CrossTileSymbolLayerIndex};
    crossTileIDs: CrossTileIDs;
    maxBucketInstanceId: number;

    constructor() {
        this.layerIndexes = {};
        this.crossTileIDs = new CrossTileIDs();
        this.maxBucketInstanceId = 0;
    }

    addLayer(styleLayer: StyleLayer, tiles: Array<Tile>) {
        let layerIndex = this.layerIndexes[styleLayer.id];
        if (layerIndex === undefined) {
            layerIndex = this.layerIndexes[styleLayer.id] = new CrossTileSymbolLayerIndex();
        }

        let symbolBucketsChanged = false;
        const currentBucketIDs = {};

        for (const tile of tiles) {
            const symbolBucket = ((tile.getBucket(styleLayer): any): SymbolBucket);
            if (!symbolBucket) continue;

            if (!symbolBucket.bucketInstanceId) {
                symbolBucket.bucketInstanceId = ++this.maxBucketInstanceId;
            }

            if (layerIndex.addBucket(tile.tileID, symbolBucket, this.crossTileIDs)) {
                symbolBucketsChanged = true;
            }
            currentBucketIDs[symbolBucket.bucketInstanceId] = true;
        }

        if (layerIndex.removeStaleBuckets(currentBucketIDs)) {
            symbolBucketsChanged = true;
        }

        return symbolBucketsChanged;
    }
}

module.exports = CrossTileSymbolIndex;
