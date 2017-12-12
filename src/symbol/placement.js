// @flow

const CollisionIndex = require('./collision_index');
const EXTENT = require('../data/extent');
const symbolSize = require('./symbol_size');
const projection = require('./projection');
const symbolLayoutProperties = require('../style/style_layer/symbol_style_layer_properties').layout;
const assert = require('assert');
const pixelsToTileUnits = require('../source/pixels_to_tile_units');

import type Transform from '../geo/transform';
import type StyleLayer from '../style/style_layer';
import type Tile from '../source/tile';
import type SymbolBucket from '../data/bucket/symbol_bucket';
import type mat4 from '@mapbox/gl-matrix';
import type {CollisionBoxArray, CollisionVertexArray} from '../data/array_types';

class OpacityState {
    opacity: number;
    placed: boolean;
    constructor(prevState: ?OpacityState, increment: number, placed: boolean, offscreen: ?boolean) {
        if (prevState) {
            this.opacity = Math.max(0, Math.min(1, prevState.opacity + (prevState.placed ? increment : -increment)));
        } else {
            this.opacity = (offscreen && placed) ? 1 : 0;
        }
        this.placed = placed;
    }
    isHidden() {
        return this.opacity === 0 && !this.placed;
    }
}

class JointOpacityState {
    text: OpacityState;
    icon: OpacityState;
    constructor(prevState: ?JointOpacityState, increment: number, placedText: boolean, placedIcon: boolean, offscreen: ?boolean) {
        this.text = new OpacityState(prevState ? prevState.text : null, increment, placedText, offscreen);
        this.icon = new OpacityState(prevState ? prevState.icon : null, increment, placedIcon, offscreen);
    }
    isHidden() {
        return this.text.isHidden() && this.icon.isHidden();
    }
}

class JointPlacement {
    text: boolean;
    icon: boolean;
    // offscreen = outside viewport, but within CollisionIndex::viewportPadding px of the edge
    // Because these symbols aren't onscreen yet, we can skip the "fade in" animation,
    // and if a subsequent viewport change brings them into view, they'll be fully
    // visible right away.
    offscreen: boolean;
    constructor(text: boolean, icon: boolean, offscreen: boolean) {
        this.text = text;
        this.icon = icon;
        this.offscreen = offscreen;
    }
}

class Placement {
    transform: Transform;
    collisionIndex: CollisionIndex;
    recentUntil: number;
    placements: { [string | number]: JointPlacement };
    opacities: { [string | number]: JointOpacityState };
    commitTime: number;
    stale: boolean;

    constructor(transform: Transform) {
        this.transform = transform.clone();
        this.collisionIndex = new CollisionIndex(this.transform);
        this.recentUntil = -Infinity;
        this.placements = {};
        this.opacities = {};
        this.stale = false;
    }

    placeLayer(styleLayer: StyleLayer, tiles: Array<Tile>, showCollisionBoxes: boolean) {
        const seenCrossTileIDs = {};
        for (const tile of tiles) {
            this.placeLayerTile(styleLayer, tile, showCollisionBoxes, seenCrossTileIDs);
        }
    }

    placeLayerTile(styleLayer: StyleLayer, tile: Tile, showCollisionBoxes: boolean, seenCrossTileIDs: { [string | number]: boolean }) {
        const symbolBucket = ((tile.getBucket(styleLayer): any): SymbolBucket);
        if (!symbolBucket) return;

        const layout = symbolBucket.layers[0].layout;

        const scale = Math.pow(2, this.transform.zoom - tile.tileID.overscaledZ);
        const textPixelRatio = EXTENT / tile.tileSize;

        const posMatrix = this.transform.calculatePosMatrix(tile.tileID.toUnwrapped());

        const textLabelPlaneMatrix = projection.getLabelPlaneMatrix(posMatrix,
                layout.get('text-pitch-alignment') === 'map',
                layout.get('text-rotation-alignment') === 'map',
                this.transform,
                pixelsToTileUnits(tile, 1, this.transform.zoom));

        const iconLabelPlaneMatrix = projection.getLabelPlaneMatrix(posMatrix,
                layout.get('icon-pitch-alignment') === 'map',
                layout.get('icon-rotation-alignment') === 'map',
                this.transform,
                pixelsToTileUnits(tile, 1, this.transform.zoom));

        this.placeLayerBucket(symbolBucket, posMatrix, textLabelPlaneMatrix, iconLabelPlaneMatrix, scale, textPixelRatio,
                showCollisionBoxes, seenCrossTileIDs, tile.collisionBoxArray, tile.tileID.key, styleLayer.source);
    }

    placeLayerBucket(bucket: SymbolBucket, posMatrix: mat4, textLabelPlaneMatrix: mat4, iconLabelPlaneMatrix: mat4,
            scale: number, textPixelRatio: number, showCollisionBoxes: boolean, seenCrossTileIDs: { [string | number]: boolean },
            collisionBoxArray: ?CollisionBoxArray, tileKey: number, sourceID: string) {

        const layout = bucket.layers[0].layout;

        const partiallyEvaluatedTextSize = symbolSize.evaluateSizeForZoom(bucket.textSizeData, this.transform.zoom, symbolLayoutProperties.properties['text-size']);

        const iconWithoutText = !bucket.hasTextData() || layout.get('text-optional');
        const textWithoutIcon = !bucket.hasIconData() || layout.get('icon-optional');

        for (const symbolInstance of bucket.symbolInstances) {
            if (!seenCrossTileIDs[symbolInstance.crossTileID]) {

                let placeText = false;
                let placeIcon = false;
                //let offscreen = true;

                let placedGlyphBoxes = [];
                let placedGlyphCircles = [];
                let placedIconBoxes = [];

                if (!symbolInstance.collisionArrays) {
                    symbolInstance.collisionArrays = bucket.deserializeCollisionBoxes(
                            ((collisionBoxArray: any): CollisionBoxArray), // TODO
                            symbolInstance.textBoxStartIndex, symbolInstance.textBoxEndIndex, symbolInstance.iconBoxStartIndex, symbolInstance.iconBoxEndIndex);
                }

                if (symbolInstance.collisionArrays.textBox) {
                    placedGlyphBoxes = this.collisionIndex.placeCollisionBox(symbolInstance.collisionArrays.textBox,
                            layout.get('text-allow-overlap'), textPixelRatio, posMatrix);
                    placeText = placedGlyphBoxes.length > 0;
                }
                const textCircles = symbolInstance.collisionArrays.textCircles;
                if (textCircles) {
                    const placedSymbol = (bucket.placedGlyphArray.get(symbolInstance.placedTextSymbolIndices[0]): any);
                    const fontSize = symbolSize.evaluateSizeForFeature(bucket.textSizeData, partiallyEvaluatedTextSize, placedSymbol);
                    placedGlyphCircles = this.collisionIndex.placeCollisionCircles(textCircles,
                            layout.get('text-allow-overlap'),
                            scale,
                            textPixelRatio,
                            symbolInstance.key,
                            placedSymbol,
                            bucket.lineVertexArray,
                            bucket.glyphOffsetArray,
                            fontSize,
                            posMatrix,
                            textLabelPlaneMatrix,
                            showCollisionBoxes,
                            layout.get('text-pitch-alignment') === 'map');
                    // If text-allow-overlap is set, force "placedCircles" to true
                    // In theory there should always be at least one circle placed
                    // in this case, but for now quirks in text-anchor
                    // and text-offset may prevent that from being true.
                    placeText = layout.get('text-allow-overlap') || placedGlyphCircles.length > 0;
                }

                if (symbolInstance.collisionArrays.iconBox) {
                    placedIconBoxes = this.collisionIndex.placeCollisionBox(symbolInstance.collisionArrays.iconBox,
                            layout.get('icon-allow-overlap'), textPixelRatio, posMatrix);
                    placeIcon = placedIconBoxes.length > 0;
                }

                // Combine the scales for icons and text.
                if (!iconWithoutText && !textWithoutIcon) {
                    placeIcon = placeText = placeIcon && placeText;
                } else if (!textWithoutIcon) {
                    placeText = placeIcon && placeText;
                } else if (!iconWithoutText) {
                    placeIcon = placeIcon && placeText;
                }

                if (placeText && symbolInstance.collisionArrays.textBox) {
                    this.collisionIndex.insertCollisionBox(placedGlyphBoxes, layout.get('text-ignore-placement'), tileKey, sourceID, symbolInstance.textBoxStartIndex);
                }
                if (placeIcon && symbolInstance.collisionArrays.iconBox) {
                    this.collisionIndex.insertCollisionBox(placedIconBoxes, layout.get('icon-ignore-placement'), tileKey, sourceID, symbolInstance.iconBoxStartIndex);
                }
                if (placeText && symbolInstance.collisionArrays.textCircles) {
                    this.collisionIndex.insertCollisionCircles(placedGlyphCircles, layout.get('text-ignore-placement'), tileKey, sourceID, symbolInstance.textBoxStartIndex);
                }

                assert(symbolInstance.crossTileID !== 0);

                const offscreen = false; // TODO
                this.placements[symbolInstance.crossTileID] = new JointPlacement(placeText, placeIcon, offscreen);
                seenCrossTileIDs[symbolInstance.crossTileID] = true;
            }
        }
    }

    commit(prevPlacement: ?Placement, now: number) {
        this.commitTime = now;

        let placementChanged = false;

        const increment = prevPlacement ?
            (this.commitTime - prevPlacement.commitTime) / 300 :
            1;

        const prevOpacities = prevPlacement ? prevPlacement.opacities : {};

        // add the opacities from the current placement, and copy their current values from the previous placement
        for (const crossTileID in this.placements) {
            const jointPlacement = this.placements[crossTileID];
            const prevOpacity = prevOpacities[crossTileID];
            if (prevOpacity) {
                this.opacities[crossTileID] = new JointOpacityState(prevOpacity, increment, jointPlacement.text, jointPlacement.icon);
                placementChanged = placementChanged ||
                    jointPlacement.text !== prevOpacity.text.placed ||
                    jointPlacement.icon !== prevOpacity.icon.placed;
            } else {
                this.opacities[crossTileID] = new JointOpacityState(null, increment, jointPlacement.text, jointPlacement.icon, jointPlacement.offscreen);
                placementChanged = placementChanged || jointPlacement.text || jointPlacement.icon;
            }
        }

        // copy and update values from the previous placement that aren't in the current placement but haven't finished fading
        for (const crossTileID in prevOpacities) {
            const prevOpacity = prevOpacities[crossTileID];
            if (!this.opacities[crossTileID]) {
                const jointOpacity = new JointOpacityState(prevOpacity, increment, false, false);
                if (!jointOpacity.isHidden()) {
                    this.opacities[crossTileID] = jointOpacity;
                    placementChanged = placementChanged || prevOpacity.text.placed || prevOpacity.icon.placed;
                }
            }
        }

        return placementChanged;
    }

    updateLayerOpacities(styleLayer: StyleLayer, tiles: Array<Tile>) {
        const seenCrossTileIDs = {};

        for (const tile of tiles) {
            const symbolBucket = ((tile.getBucket(styleLayer): any): SymbolBucket);
            if (symbolBucket) {
                this.updateBucketOpacities(symbolBucket, seenCrossTileIDs, tile.collisionBoxArray);
            }
        }
    }

    updateBucketOpacities(bucket: SymbolBucket, seenCrossTileIDs: { [string | number]: boolean }, collisionBoxArray: ?CollisionBoxArray) {
        if (bucket.hasTextData()) bucket.text.opacityVertexArray.clear();
        if (bucket.hasIconData()) bucket.icon.opacityVertexArray.clear();
        if (bucket.hasCollisionBoxData()) bucket.collisionBox.collisionVertexArray.clear();
        if (bucket.hasCollisionCircleData()) bucket.collisionCircle.collisionVertexArray.clear();

        for (let s = 0; s < bucket.symbolInstances.length; s++) {
            const symbolInstance = bucket.symbolInstances[s];
            const isDuplicate = seenCrossTileIDs[symbolInstance.crossTileID];
            const opacityState = (!isDuplicate && this.opacities[symbolInstance.crossTileID]) ?
                this.opacities[symbolInstance.crossTileID] :
                new JointOpacityState(null, 0, false, false, false);

            seenCrossTileIDs[symbolInstance.crossTileID] = true;

            const hasText = !(symbolInstance.textBoxStartIndex === symbolInstance.textBoxEndIndex);
            const hasIcon = !(symbolInstance.iconBoxStartIndex === symbolInstance.iconBoxEndIndex);

            if (hasText) {
                const packedOpacity = packOpacity(opacityState.text);
                // Vertical text fades in/out on collision the same way as corresponding
                // horizontal text. Switch between vertical/horizontal should be instantaneous
                const opacityEntryCount = (symbolInstance.numGlyphVertices + symbolInstance.numVerticalGlyphVertices) / 4;
                for (let i = 0; i < opacityEntryCount; i++) {
                    bucket.text.opacityVertexArray.emplaceBack(packedOpacity);
                }
                for (const placedTextSymbolIndex of symbolInstance.placedTextSymbolIndices) {
                    const placedSymbol = (bucket.placedGlyphArray.get(placedTextSymbolIndex): any);
                    // If this label is completely faded, mark it so that we don't have to calculate
                    // its position at render time
                    placedSymbol.hidden = opacityState.text.isHidden();
                }
            }

            if (hasIcon) {
                const packedOpacity = packOpacity(opacityState.icon);
                for (let i = 0; i < symbolInstance.numIconVertices / 4; i++) {
                    bucket.icon.opacityVertexArray.emplaceBack(packedOpacity);
                }
                const placedSymbol = (bucket.placedIconArray.get(s): any);
                placedSymbol.hidden = opacityState.icon.isHidden();
            }

            if (!symbolInstance.collisionArrays) {
                symbolInstance.collisionArrays = bucket.deserializeCollisionBoxes(
                        ((collisionBoxArray: any): CollisionBoxArray), // TODO
                        symbolInstance.textBoxStartIndex, symbolInstance.textBoxEndIndex, symbolInstance.iconBoxStartIndex, symbolInstance.iconBoxEndIndex);
            }

            const collisionArrays = symbolInstance.collisionArrays;
            if (collisionArrays) {
                if (collisionArrays.textBox && bucket.hasCollisionBoxData()) {
                    updateCollisionVertices(bucket.collisionBox.collisionVertexArray, opacityState.text.placed, false);
                }

                if (collisionArrays.iconBox && bucket.hasCollisionBoxData()) {
                    updateCollisionVertices(bucket.collisionBox.collisionVertexArray, opacityState.icon.placed, false);
                }

                const textCircles = collisionArrays.textCircles;
                if (textCircles && bucket.hasCollisionCircleData()) {
                    for (let k = 0; k < textCircles.length; k += 5) {
                        const notUsed = isDuplicate || textCircles[k + 4] === 0;
                        updateCollisionVertices(bucket.collisionCircle.collisionVertexArray, opacityState.text.placed, notUsed);
                    }
                }
            }
        }

        bucket.sortFeatures(this.transform.angle);
        //bucket.updateOpacity();
        // TODO move this to the upload pass
        if (bucket.hasTextData() && bucket.text.opacityVertexBuffer) {
            bucket.text.opacityVertexBuffer.updateData(bucket.text.opacityVertexArray);
        }
        if (bucket.hasIconData() && bucket.icon.opacityVertexBuffer) {
            bucket.icon.opacityVertexBuffer.updateData(bucket.icon.opacityVertexArray);
        }
        if (bucket.hasCollisionBoxData() && bucket.collisionBox.collisionVertexBuffer) {
            bucket.collisionBox.collisionVertexBuffer.updateData(bucket.collisionBox.collisionVertexArray);
        }
        if (bucket.hasCollisionCircleData() && bucket.collisionCircle.collisionVertexBuffer) {
            bucket.collisionCircle.collisionVertexBuffer.updateData(bucket.collisionCircle.collisionVertexArray);
        }

        assert(bucket.text.opacityVertexArray.length === bucket.text.layoutVertexArray.length / 4);
        assert(bucket.icon.opacityVertexArray.length === bucket.icon.layoutVertexArray.length / 4);
    }

    symbolFadeChange(now: number) {
        // TODO handle non-continuous mode?
        return (now - this.commitTime) / 300;
    }

    hasTransitions(now: number) {
        return this.symbolFadeChange(now) < 1 || this.stale;
    }

    stillRecent(now: number) {
        // TODO handle non-continuous mode?
        return this.recentUntil > now;
    }

    setRecent(now: number) {
        this.stale = false;
        // TODO handle non-continuous mode?
        this.recentUntil = now + 300;
    }

    setStale() {
        this.stale = true;
    }
}

function updateCollisionVertices(collisionVertexArray: CollisionVertexArray, placed: boolean, notUsed: boolean) {
    collisionVertexArray.emplaceBack(placed ? 1 : 0, notUsed ? 1 : 0);
    collisionVertexArray.emplaceBack(placed ? 1 : 0, notUsed ? 1 : 0);
    collisionVertexArray.emplaceBack(placed ? 1 : 0, notUsed ? 1 : 0);
    collisionVertexArray.emplaceBack(placed ? 1 : 0, notUsed ? 1 : 0);
}

// All four vertices for a glyph will have the same opacity state
// So we pack the opacity into a uint8, and then repeat it four times
// to make a single uint32 that we can upload for each glyph in the
// label.
const shift25 = Math.pow(2, 25);
const shift24 = Math.pow(2, 24);
const shift17 = Math.pow(2, 17);
const shift16 = Math.pow(2, 16);
const shift9 = Math.pow(2, 9);
const shift8 = Math.pow(2, 8);
const shift1 = Math.pow(2, 1);
function packOpacity(opacityState: OpacityState): number {
    if (opacityState.opacity === 0 && !opacityState.placed) {
        return 0;
    } else if (opacityState.opacity === 1 && opacityState.placed) {
        return 4294967295;
    }
    const targetBit = opacityState.placed ? 1 : 0;
    const opacityBits = Math.floor(opacityState.opacity * 127);
    return opacityBits * shift25 + targetBit * shift24 +
        opacityBits * shift17 + targetBit * shift16 +
        opacityBits * shift9 + targetBit * shift8 +
        opacityBits * shift1 + targetBit;
}

module.exports = Placement;
