// @flow

const browser = require('../util/browser');
const Placement = require('../symbol/placement');

import type Transform from '../geo/transform';
import type StyleLayer from './style_layer';
import type SourceCache from '../source/source_cache';
import type CrossTileSymbolIndex from '../symbol/cross_tile_symbol_index';
import type Tile from'../source/tile';

class LayerPlacement {
    _currentTileIndex: number;
    _tiles: Array<Tile>;
    _seenCrossTileIDs: { [string | number]: boolean };

    constructor(tileIDs: Array<number>, styleLayer: StyleLayer, sourceCache: SourceCache, crossTileSymbolIndex: CrossTileSymbolIndex) {
        this._currentTileIndex = 0;
        this._seenCrossTileIDs = {};
        this._tiles = [];

        for (const tileID of tileIDs) {
            this._tiles.push(sourceCache.getTileByID(tileID));
        }
        crossTileSymbolIndex.addLayer(styleLayer, this._tiles);
    }

    continuePlacement(sourceCache, placement: Placement, showCollisionBoxes: boolean, styleLayer: StyleLayer, shouldPausePlacement) {
        while (this._currentTileIndex < this._tiles.length) {
            const tile = this._tiles[this._currentTileIndex];
            placement.placeLayerTile(styleLayer, tile, showCollisionBoxes, this._seenCrossTileIDs);

            this._currentTileIndex++;
            if (shouldPausePlacement()) {
                return true;
            }
        }
    }
}

class PauseablePlacement {
    placement: Placement;
    prevPlacement: ?Placement;
    crossTileSymbolIndex: CrossTileSymbolIndex;
    _done: boolean;
    _currentPlacementIndex: number;
    _forceFullPlacement: boolean;
    _showCollisionBoxes: boolean;
    _delayUntil: number;
    _collisionFadeTimes: any;
    _inProgressLayer: ?LayerPlacement;
    _sourceCacheTileIDs: {[string]: Array<number>};

    constructor(transform: Transform, crossTileSymbolIndex: CrossTileSymbolIndex, order: Array<string>,
            forceFullPlacement: boolean, showCollisionBoxes: boolean, fadeDuration: number,
            previousPlacement: ?PauseablePlacement) {

        this.placement = new Placement(transform);
        this.prevPlacement = previousPlacement ? previousPlacement.placement : null;
        this.crossTileSymbolIndex = crossTileSymbolIndex;
        this._currentPlacementIndex = order.length - 1;
        this._forceFullPlacement = forceFullPlacement;
        this._showCollisionBoxes = showCollisionBoxes;
        this._sourceCacheTileIDs = {};
        this._done = false;

        if (forceFullPlacement || !previousPlacement || fadeDuration === 0) {
            this._delayUntil = browser.now();
        } else {
            this._delayUntil = previousPlacement._delayUntil + 300;
        }

        if (previousPlacement) {
            this._collisionFadeTimes = previousPlacement._collisionFadeTimes;
        } else {
            this._collisionFadeTimes = {
                latestStart: 0,
                duration: fadeDuration
            };
        }
    }

    isDone(): boolean {
        return this._done;
    }

    continuePlacement(order: Array<string>, layers: {[string]: StyleLayer}, sourceCaches: {[string]: SourceCache}) {
        const startTime = browser.now();

        if (startTime < this._delayUntil) return true;

        const shouldPausePlacement = () => {
            const elapsedTime = browser.now() - startTime;
            return this._forceFullPlacement ? false : elapsedTime > 2;
        };

        while (this._currentPlacementIndex >= 0) {
            const layerId = order[this._currentPlacementIndex];
            const layer = layers[layerId];
            if (layer.type === 'symbol') {
                const sourceCache = sourceCaches[layer.source];

                if (!this._inProgressLayer) {
                    if (!this._sourceCacheTileIDs[layer.source]) {
                        this._sourceCacheTileIDs[layer.source] = sourceCache.getRenderableIds().sort((a, b) => {
                            const aCoord = sourceCache.getTileByID(a).tileID;
                            const bCoord = sourceCache.getTileByID(b).tileID;

                            const zDiff = bCoord.overscaledZ - aCoord.overscaledZ;
                            if (zDiff) return zDiff;

                            if (aCoord.isLessThan(bCoord)) {
                                return -1;
                            } else if (bCoord.isLessThan(aCoord)) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                    }
                    this._inProgressLayer = new LayerPlacement(this._sourceCacheTileIDs[layer.source], layer, sourceCache, this.crossTileSymbolIndex);
                }

                const pausePlacement = this._inProgressLayer.continuePlacement(sourceCache, this.placement, this._showCollisionBoxes, layer, shouldPausePlacement);

                if (pausePlacement) {
                    // We didn't finish placing all layers within 2ms,
                    // but we can keep rendering with a partial placement
                    // We'll resume here on the next frame
                    return;
                }

                delete this._inProgressLayer;
            }

            this._currentPlacementIndex--;
        }

        this.placement.commit(this.prevPlacement, browser.now());

        for (const layerId in layers) {
            const layer = layers[layerId];
            if (layer.type === 'symbol') {
                const sourceCache = sourceCaches[layer.source];
                const tileIDs = this._sourceCacheTileIDs[layer.source];
                const tiles = tileIDs.map((id) => sourceCache.getTileByID(id));
                this.placement.updateLayerOpacities(layer, tiles);
            }
        }

        this._done = true;

    }

    symbolFadeChange(now: number) {
        if (this.isDone()) {
            return this.placement.symbolFadeChange(now);
        } else if (this.prevPlacement) {
            return this.prevPlacement.symbolFadeChange(now);
        } else {
            return 0;
        }
    }

    stillFading() {
        if (this.isDone()) {
            return this.placement.hasTransitions(browser.now());
        } else if (this.prevPlacement) {
            return this.prevPlacement.hasTransitions(browser.now());
        } else {
            return false;
        }
    }

}

module.exports = PauseablePlacement;
