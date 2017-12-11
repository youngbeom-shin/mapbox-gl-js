// @flow

'use strict'; // eslint-disable-line strict

require('flow-remove-types/register');

const assert = require('assert');
const fs = require('fs');
const ejs = require('ejs');
const util = require('../src/util/util');
const spec = require('../src/style-spec/reference/v8');
const {createLayout, viewTypes} = require('../src/util/struct_array');

import type {ViewType, StructArrayLayout} from '../src/util/struct_array';

const structArrayLayoutJs = ejs.compile(fs.readFileSync('src/util/struct_array_layout.js.ejs', 'utf8'), {strict: true});
const structArrayJs = ejs.compile(fs.readFileSync('src/util/struct_array.js.ejs', 'utf8'), {strict: true});

const typeAbbreviations = {
    'Int8': 'b',
    'Uint8': 'ub',
    'Int16': 'i',
    'Uint16': 'ui',
    'Int32': 'l',
    'Uint32': 'ul',
    'Float32': 'f'
};

const arrayTypeEntries = new Set();
const layoutCache = {};
const filesWritten = new Set();

function createStructArrayType(name: string, layout: StructArrayLayout, includeStructAccessors: boolean = false) {
    let hasAnchorPoint = false;
    const usedTypes = new Set(['Uint8']);
    const members = layout.members.map((member) => {
        if (!usedTypes.has(member.type)) usedTypes.add(member.type);
        if (member.name === 'anchorPointX') hasAnchorPoint = true;
        return util.extend(member, {
            size: sizeOf(member.type),
            view: member.type.toLowerCase()
        });
    });

    const layoutModule = createStructArrayLayoutType(layout, usedTypes);

    const key = `${camelize(name)}Array`;

    if (includeStructAccessors) {
        const code = structArrayJs({
            name,
            members,
            size: layout.size,
            usedTypes,
            hasAnchorPoint,
            layoutModule,
            includeStructAccessors
        });

        const file = `src/data/array_type/${name}.js`;
        assert(!filesWritten.has(file), `${file} already exists`);
        filesWritten.add(file);
        fs.writeFileSync(file, code);
        arrayTypeEntries.add(`    ${key}: require('./${name}')`);
    } else {
        arrayTypeEntries.add(`    ${key}: require('./${layoutModule}')`);
    }

    return key;
}

function createStructArrayLayoutType({members, size}, usedTypes) {
    // combine consecutive 'members' with same underlying type, summing their
    // component counts
    members = members.reduce((memo, member) => {
        if (memo.length > 0 && memo[memo.length - 1].type === member.type) {
            const last = memo[memo.length - 1];
            return memo.slice(0, -1).concat(util.extend({}, last, {
                components: last.components + member.components,
            }));
        }
        return memo.concat(member);
    }, []);

    const key = `${size}_${members.map(m => `${m.components}${typeAbbreviations[m.type]}`).join('')}`;
    const moduleName = `struct_array_layout_${key}`;
    if (!layoutCache[key]) {
        const code = structArrayLayoutJs({
            name: moduleName,
            members,
            size,
            usedTypes
        });
        const file = `src/data/array_type/${moduleName}.js`;
        assert(!filesWritten.has(file), `${file} already exists`);
        filesWritten.add(file);
        fs.writeFileSync(file, code);
        layoutCache[key] = true;
    }
    return moduleName;
}

function sizeOf(type: ViewType): number {
    return viewTypes[type].BYTES_PER_ELEMENT;
}

function camelize (str) {
    return str.replace(/(?:^|[-_])(.)/g, (_, x) => {
        return /^[0-9]$/.test(x) ? _ : x.toUpperCase();
    });
}

function stringify(object: Object): string {
    return JSON.stringify(object)
        .replace(/,/g, ', ')
        .replace(/:/g, ': ');
}

global.camelize = camelize;

createStructArrayType('pos', require('../src/data/pos_attributes'));
createStructArrayType('raster_bounds', require('../src/data/raster_bounds_attributes'));

// layout vertex arrays
const layoutAttributes = {
    circle: require('../src/data/bucket/circle_attributes'),
    fill: require('../src/data/bucket/fill_attributes'),
    'fill-extrusion': require('../src/data/bucket/fill_extrusion_attributes'),
    heatmap: require('../src/data/bucket/circle_attributes'),
    line: require('../src/data/bucket/line_attributes')
};
for (const name in layoutAttributes) {
    createStructArrayType(`${name.replace(/-/g, '_')}_layout`, layoutAttributes[name]);
}

// symbol layer specific arrays
const symbolAttributes = require('../src/data/bucket/symbol_attributes');
createStructArrayType(`symbol_layout`, symbolAttributes.symbolLayoutAttributes);
createStructArrayType(`symbol_dynamic_layout`, symbolAttributes.dynamicLayoutAttributes);
createStructArrayType(`symbol_opacity`, symbolAttributes.placementOpacityAttributes);
createStructArrayType('collision_box', symbolAttributes.collisionBox, true);
createStructArrayType(`collision_box_layout`, symbolAttributes.collisionBoxLayout);
createStructArrayType(`collision_circle_layout`, symbolAttributes.collisionCircleLayout);
createStructArrayType(`collision_vertex`, symbolAttributes.collisionVertexAttributes);
createStructArrayType('placed_symbol', symbolAttributes.placement, true);
createStructArrayType('glyph_offset', symbolAttributes.glyphOffset, true);
createStructArrayType('symbol_line_vertex', symbolAttributes.lineVertex, true);

// feature index array
createStructArrayType('feature_index', createLayout([
    // the index of the feature in the original vectortile
    { type: 'Uint32', name: 'featureIndex' },
    // the source layer the feature appears in
    { type: 'Uint16', name: 'sourceLayerIndex' },
    // the bucket the feature appears in
    { type: 'Uint16', name: 'bucketIndex' }
], 4), true);

// triangle index array
createStructArrayType('triangle_index', createLayout([
    { type: 'Uint16', name: 'vertices', components: 3 }
]));

// line index array
createStructArrayType('line_index', createLayout([
    { type: 'Uint16', name: 'vertices', components: 2 }
]));

// paint vertex arrays

// collect paint attribute metadata from spec
const paintAttributes = [];

spec['paint_line']['line-floorwidth'] = util.clone(spec['paint_line']['line-width']);

for (const type in spec.layer.type.values) {
    for (const property in spec[`paint_${type}`]) {
        const propertySpec = spec[`paint_${type}`][property];
        if (!propertySpec['property-function']) continue;
        const name = paintAttributeName(property, type);
        paintAttributes.push({name, type: propertySpec.type, property});
    }
}

const paintAttributeEntries = new Set();
for (const attribute of paintAttributes) {

    const sourceArrayLayout = createLayout([{
        name: `a_${attribute.name}`,
        type: 'Float32',
        components: attribute.type === 'color' ? 2 : 1
    }], 4);
    const compositeArrayLayout = createLayout([{
        name: `a_${attribute.name}`,
        type: 'Float32',
        components: attribute.type === 'color' ? 4 : 2
    }], 4);

    paintAttributeEntries.add(`    '${attribute.property}': {
        SourceArray: arrayTypes.${camelize(attribute.property)}SourcePaintArray,
        sourceAttributes: ${stringify(sourceArrayLayout)},
        CompositeArray: arrayTypes.${camelize(attribute.property)}CompositePaintArray,
        compositeAttributes: ${stringify(compositeArrayLayout)},
    }`);

    createStructArrayType(`${attribute.property}_source_paint`, sourceArrayLayout);
    createStructArrayType(`${attribute.property}_composite_paint`, compositeArrayLayout);
}

fs.writeFileSync('src/data/paint_attributes.js',
    `// This file is generated. Edit build/generate-struct-arrays.js, then run \`node build/generate-struct-arrays.js\`.
// @flow
const arrayTypes = require('./array_type');

import type {StructArray, StructArrayLayout} from '../util/struct_array';
type PaintAttributeEntry = {
    SourceArray: Class<StructArray>,
    sourceAttributes: StructArrayLayout,
    CompositeArray: Class<StructArray>,
    compositeAttributes: StructArrayLayout,
}

const paintAttributes: {[string]: PaintAttributeEntry} = {
${[...paintAttributeEntries].join(',\n')}
};

module.exports = paintAttributes;\n`);

fs.writeFileSync('src/data/array_type/index.js',
    `// This file is generated. Edit build/generate-struct-arrays.js, then run \`node build/generate-struct-arrays.js\`.
// @flow
module.exports = {
${[...arrayTypeEntries].join(',\n')}
};\n`);

function paintAttributeName(property, type) {
    const attributeNameExceptions = {
        'text-opacity': 'opacity',
        'icon-opacity': 'opacity',
        'text-color': 'fill_color',
        'icon-color': 'fill_color',
        'text-halo-color': 'halo_color',
        'icon-halo-color': 'halo_color',
        'text-halo-blur': 'halo_blur',
        'icon-halo-blur': 'halo_blur',
        'text-halo-width': 'halo_width',
        'icon-halo-width': 'halo_width',
        'line-gap-width': 'gapwidth'
    };
    return attributeNameExceptions[property] ||
        property.replace(`${type}-`, '').replace(/-/g, '_');
}
