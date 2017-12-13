// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
const arrayTypes = require('./array_types');

import type {StructArray, StructArrayLayout} from '../util/struct_array';
type PaintAttributeEntry = {
    SourceArray: Class<StructArray>,
    sourceAttributes: StructArrayLayout,
    CompositeArray: Class<StructArray>,
    compositeAttributes: StructArrayLayout,
}

const paintAttributes: {[string]: PaintAttributeEntry} = {
    'fill-opacity': {
        SourceArray: arrayTypes.FillOpacitySourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_opacity", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.FillOpacityCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_opacity", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'fill-color': {
        SourceArray: arrayTypes.FillColorSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_color", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
        CompositeArray: arrayTypes.FillColorCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_color", "type": "Float32", "components": 4, "offset": 0}], "size": 16},
    },
    'fill-outline-color': {
        SourceArray: arrayTypes.FillOutlineColorSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_outline_color", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
        CompositeArray: arrayTypes.FillOutlineColorCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_outline_color", "type": "Float32", "components": 4, "offset": 0}], "size": 16},
    },
    'line-opacity': {
        SourceArray: arrayTypes.LineOpacitySourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_opacity", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.LineOpacityCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_opacity", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'line-color': {
        SourceArray: arrayTypes.LineColorSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_color", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
        CompositeArray: arrayTypes.LineColorCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_color", "type": "Float32", "components": 4, "offset": 0}], "size": 16},
    },
    'line-width': {
        SourceArray: arrayTypes.LineWidthSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_width", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.LineWidthCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_width", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'line-gap-width': {
        SourceArray: arrayTypes.LineGapWidthSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_gapwidth", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.LineGapWidthCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_gapwidth", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'line-offset': {
        SourceArray: arrayTypes.LineOffsetSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_offset", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.LineOffsetCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_offset", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'line-blur': {
        SourceArray: arrayTypes.LineBlurSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_blur", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.LineBlurCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_blur", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'line-floorwidth': {
        SourceArray: arrayTypes.LineFloorwidthSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_floorwidth", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.LineFloorwidthCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_floorwidth", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'icon-opacity': {
        SourceArray: arrayTypes.IconOpacitySourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_opacity", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.IconOpacityCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_opacity", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'icon-color': {
        SourceArray: arrayTypes.IconColorSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_fill_color", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
        CompositeArray: arrayTypes.IconColorCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_fill_color", "type": "Float32", "components": 4, "offset": 0}], "size": 16},
    },
    'icon-halo-color': {
        SourceArray: arrayTypes.IconHaloColorSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_halo_color", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
        CompositeArray: arrayTypes.IconHaloColorCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_halo_color", "type": "Float32", "components": 4, "offset": 0}], "size": 16},
    },
    'icon-halo-width': {
        SourceArray: arrayTypes.IconHaloWidthSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_halo_width", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.IconHaloWidthCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_halo_width", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'icon-halo-blur': {
        SourceArray: arrayTypes.IconHaloBlurSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_halo_blur", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.IconHaloBlurCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_halo_blur", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'text-opacity': {
        SourceArray: arrayTypes.TextOpacitySourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_opacity", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.TextOpacityCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_opacity", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'text-color': {
        SourceArray: arrayTypes.TextColorSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_fill_color", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
        CompositeArray: arrayTypes.TextColorCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_fill_color", "type": "Float32", "components": 4, "offset": 0}], "size": 16},
    },
    'text-halo-color': {
        SourceArray: arrayTypes.TextHaloColorSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_halo_color", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
        CompositeArray: arrayTypes.TextHaloColorCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_halo_color", "type": "Float32", "components": 4, "offset": 0}], "size": 16},
    },
    'text-halo-width': {
        SourceArray: arrayTypes.TextHaloWidthSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_halo_width", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.TextHaloWidthCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_halo_width", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'text-halo-blur': {
        SourceArray: arrayTypes.TextHaloBlurSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_halo_blur", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.TextHaloBlurCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_halo_blur", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'circle-radius': {
        SourceArray: arrayTypes.CircleRadiusSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_radius", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.CircleRadiusCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_radius", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'circle-color': {
        SourceArray: arrayTypes.CircleColorSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_color", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
        CompositeArray: arrayTypes.CircleColorCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_color", "type": "Float32", "components": 4, "offset": 0}], "size": 16},
    },
    'circle-blur': {
        SourceArray: arrayTypes.CircleBlurSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_blur", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.CircleBlurCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_blur", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'circle-opacity': {
        SourceArray: arrayTypes.CircleOpacitySourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_opacity", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.CircleOpacityCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_opacity", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'circle-stroke-width': {
        SourceArray: arrayTypes.CircleStrokeWidthSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_stroke_width", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.CircleStrokeWidthCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_stroke_width", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'circle-stroke-color': {
        SourceArray: arrayTypes.CircleStrokeColorSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_stroke_color", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
        CompositeArray: arrayTypes.CircleStrokeColorCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_stroke_color", "type": "Float32", "components": 4, "offset": 0}], "size": 16},
    },
    'circle-stroke-opacity': {
        SourceArray: arrayTypes.CircleStrokeOpacitySourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_stroke_opacity", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.CircleStrokeOpacityCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_stroke_opacity", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'heatmap-weight': {
        SourceArray: arrayTypes.HeatmapWeightSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_weight", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.HeatmapWeightCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_weight", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'fill-extrusion-color': {
        SourceArray: arrayTypes.FillExtrusionColorSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_color", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
        CompositeArray: arrayTypes.FillExtrusionColorCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_color", "type": "Float32", "components": 4, "offset": 0}], "size": 16},
    },
    'fill-extrusion-height': {
        SourceArray: arrayTypes.FillExtrusionHeightSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_height", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.FillExtrusionHeightCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_height", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    },
    'fill-extrusion-base': {
        SourceArray: arrayTypes.FillExtrusionBaseSourcePaintArray,
        sourceAttributes: {"members": [{"name": "a_base", "type": "Float32", "components": 1, "offset": 0}], "size": 4},
        CompositeArray: arrayTypes.FillExtrusionBaseCompositePaintArray,
        compositeAttributes: {"members": [{"name": "a_base", "type": "Float32", "components": 2, "offset": 0}], "size": 8},
    }
};

module.exports = paintAttributes;
