// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow

const assert = require('assert');
const {StructArray} = require('../util/struct_array');
const {Struct} = require('../util/struct_array');
const {register} = require('../util/web_worker_transfer');
const Point = require('@mapbox/point-geometry');

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

/**
 * Implementation of the StructArray layout:
 * [0]: Int16[2]
 *
 * @private
 */
class StructArrayLayout_4_2i extends StructArray {
    uint8: Uint8Array;
    int16: Int16Array;

    _refreshViews() {
        this.uint8 = new Uint8Array(this.arrayBuffer);
        this.int16 = new Int16Array(this.arrayBuffer);
    }

    emplaceBack(v0: number, v1: number) {
        const i = this.length;
        this.resize(this.length + 1);
        const o2 = i * 2;
        this.int16[o2 + 0] = v0;
        this.int16[o2 + 1] = v1;
        return i;
    }

}

StructArrayLayout_4_2i.prototype.bytesPerElement = 4;
register('StructArrayLayout_4_2i', StructArrayLayout_4_2i);
module.exports = StructArrayLayout_4_2i;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

/**
 * Implementation of the StructArray layout:
 * [0]: Int16[4]
 *
 * @private
 */
class StructArrayLayout_8_4i extends StructArray {
    uint8: Uint8Array;
    int16: Int16Array;

    _refreshViews() {
        this.uint8 = new Uint8Array(this.arrayBuffer);
        this.int16 = new Int16Array(this.arrayBuffer);
    }

    emplaceBack(v0: number, v1: number, v2: number, v3: number) {
        const i = this.length;
        this.resize(this.length + 1);
        const o2 = i * 4;
        this.int16[o2 + 0] = v0;
        this.int16[o2 + 1] = v1;
        this.int16[o2 + 2] = v2;
        this.int16[o2 + 3] = v3;
        return i;
    }

}

StructArrayLayout_8_4i.prototype.bytesPerElement = 8;
register('StructArrayLayout_8_4i', StructArrayLayout_8_4i);
module.exports = StructArrayLayout_8_4i;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

/**
 * Implementation of the StructArray layout:
 * [0]: Int16[6]
 *
 * @private
 */
class StructArrayLayout_16_6i extends StructArray {
    uint8: Uint8Array;
    int16: Int16Array;

    _refreshViews() {
        this.uint8 = new Uint8Array(this.arrayBuffer);
        this.int16 = new Int16Array(this.arrayBuffer);
    }

    emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number) {
        const i = this.length;
        this.resize(this.length + 1);
        const o2 = i * 8;
        this.int16[o2 + 0] = v0;
        this.int16[o2 + 1] = v1;
        this.int16[o2 + 2] = v2;
        this.int16[o2 + 3] = v3;
        this.int16[o2 + 4] = v4;
        this.int16[o2 + 5] = v5;
        return i;
    }

}

StructArrayLayout_16_6i.prototype.bytesPerElement = 16;
register('StructArrayLayout_16_6i', StructArrayLayout_16_6i);
module.exports = StructArrayLayout_16_6i;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

/**
 * Implementation of the StructArray layout:
 * [0]: Int16[4]
 * [8]: Uint8[4]
 *
 * @private
 */
class StructArrayLayout_12_4i4ub extends StructArray {
    uint8: Uint8Array;
    int16: Int16Array;

    _refreshViews() {
        this.uint8 = new Uint8Array(this.arrayBuffer);
        this.int16 = new Int16Array(this.arrayBuffer);
    }

    emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number) {
        const i = this.length;
        this.resize(this.length + 1);
        const o2 = i * 6;
        const o1 = i * 12;
        this.int16[o2 + 0] = v0;
        this.int16[o2 + 1] = v1;
        this.int16[o2 + 2] = v2;
        this.int16[o2 + 3] = v3;
        this.uint8[o1 + 8] = v4;
        this.uint8[o1 + 9] = v5;
        this.uint8[o1 + 10] = v6;
        this.uint8[o1 + 11] = v7;
        return i;
    }

}

StructArrayLayout_12_4i4ub.prototype.bytesPerElement = 12;
register('StructArrayLayout_12_4i4ub', StructArrayLayout_12_4i4ub);
module.exports = StructArrayLayout_12_4i4ub;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

/**
 * Implementation of the StructArray layout:
 * [0]: Int16[4]
 * [8]: Uint16[4]
 *
 * @private
 */
class StructArrayLayout_16_4i4ui extends StructArray {
    uint8: Uint8Array;
    int16: Int16Array;
    uint16: Uint16Array;

    _refreshViews() {
        this.uint8 = new Uint8Array(this.arrayBuffer);
        this.int16 = new Int16Array(this.arrayBuffer);
        this.uint16 = new Uint16Array(this.arrayBuffer);
    }

    emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number) {
        const i = this.length;
        this.resize(this.length + 1);
        const o2 = i * 8;
        this.int16[o2 + 0] = v0;
        this.int16[o2 + 1] = v1;
        this.int16[o2 + 2] = v2;
        this.int16[o2 + 3] = v3;
        this.uint16[o2 + 4] = v4;
        this.uint16[o2 + 5] = v5;
        this.uint16[o2 + 6] = v6;
        this.uint16[o2 + 7] = v7;
        return i;
    }

}

StructArrayLayout_16_4i4ui.prototype.bytesPerElement = 16;
register('StructArrayLayout_16_4i4ui', StructArrayLayout_16_4i4ui);
module.exports = StructArrayLayout_16_4i4ui;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

/**
 * Implementation of the StructArray layout:
 * [0]: Float32[3]
 *
 * @private
 */
class StructArrayLayout_12_3f extends StructArray {
    uint8: Uint8Array;
    float32: Float32Array;

    _refreshViews() {
        this.uint8 = new Uint8Array(this.arrayBuffer);
        this.float32 = new Float32Array(this.arrayBuffer);
    }

    emplaceBack(v0: number, v1: number, v2: number) {
        const i = this.length;
        this.resize(this.length + 1);
        const o4 = i * 3;
        this.float32[o4 + 0] = v0;
        this.float32[o4 + 1] = v1;
        this.float32[o4 + 2] = v2;
        return i;
    }

}

StructArrayLayout_12_3f.prototype.bytesPerElement = 12;
register('StructArrayLayout_12_3f', StructArrayLayout_12_3f);
module.exports = StructArrayLayout_12_3f;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

/**
 * Implementation of the StructArray layout:
 * [0]: Uint32[1]
 *
 * @private
 */
class StructArrayLayout_4_1ul extends StructArray {
    uint8: Uint8Array;
    uint32: Uint32Array;

    _refreshViews() {
        this.uint8 = new Uint8Array(this.arrayBuffer);
        this.uint32 = new Uint32Array(this.arrayBuffer);
    }

    emplaceBack(v0: number) {
        const i = this.length;
        this.resize(this.length + 1);
        const o4 = i * 1;
        this.uint32[o4 + 0] = v0;
        return i;
    }

}

StructArrayLayout_4_1ul.prototype.bytesPerElement = 4;
register('StructArrayLayout_4_1ul', StructArrayLayout_4_1ul);
module.exports = StructArrayLayout_4_1ul;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

/**
 * Implementation of the StructArray layout:
 * [0]: Int16[6]
 * [12]: Uint32[1]
 * [16]: Uint16[2]
 * [20]: Int16[2]
 *
 * @private
 */
class StructArrayLayout_24_6i1ul2ui2i extends StructArray {
    uint8: Uint8Array;
    int16: Int16Array;
    uint32: Uint32Array;
    uint16: Uint16Array;

    _refreshViews() {
        this.uint8 = new Uint8Array(this.arrayBuffer);
        this.int16 = new Int16Array(this.arrayBuffer);
        this.uint32 = new Uint32Array(this.arrayBuffer);
        this.uint16 = new Uint16Array(this.arrayBuffer);
    }

    emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number) {
        const i = this.length;
        this.resize(this.length + 1);
        const o2 = i * 12;
        const o4 = i * 6;
        this.int16[o2 + 0] = v0;
        this.int16[o2 + 1] = v1;
        this.int16[o2 + 2] = v2;
        this.int16[o2 + 3] = v3;
        this.int16[o2 + 4] = v4;
        this.int16[o2 + 5] = v5;
        this.uint32[o4 + 3] = v6;
        this.uint16[o2 + 8] = v7;
        this.uint16[o2 + 9] = v8;
        this.int16[o2 + 10] = v9;
        this.int16[o2 + 11] = v10;
        return i;
    }

}

StructArrayLayout_24_6i1ul2ui2i.prototype.bytesPerElement = 24;
register('StructArrayLayout_24_6i1ul2ui2i', StructArrayLayout_24_6i1ul2ui2i);
module.exports = StructArrayLayout_24_6i1ul2ui2i;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

/**
 * Implementation of the StructArray layout:
 * [0]: Int16[6]
 *
 * @private
 */
class StructArrayLayout_12_6i extends StructArray {
    uint8: Uint8Array;
    int16: Int16Array;

    _refreshViews() {
        this.uint8 = new Uint8Array(this.arrayBuffer);
        this.int16 = new Int16Array(this.arrayBuffer);
    }

    emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number) {
        const i = this.length;
        this.resize(this.length + 1);
        const o2 = i * 6;
        this.int16[o2 + 0] = v0;
        this.int16[o2 + 1] = v1;
        this.int16[o2 + 2] = v2;
        this.int16[o2 + 3] = v3;
        this.int16[o2 + 4] = v4;
        this.int16[o2 + 5] = v5;
        return i;
    }

}

StructArrayLayout_12_6i.prototype.bytesPerElement = 12;
register('StructArrayLayout_12_6i', StructArrayLayout_12_6i);
module.exports = StructArrayLayout_12_6i;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

/**
 * Implementation of the StructArray layout:
 * [0]: Uint8[2]
 *
 * @private
 */
class StructArrayLayout_4_2ub extends StructArray {
    uint8: Uint8Array;

    _refreshViews() {
        this.uint8 = new Uint8Array(this.arrayBuffer);
    }

    emplaceBack(v0: number, v1: number) {
        const i = this.length;
        this.resize(this.length + 1);
        const o1 = i * 4;
        this.uint8[o1 + 0] = v0;
        this.uint8[o1 + 1] = v1;
        return i;
    }

}

StructArrayLayout_4_2ub.prototype.bytesPerElement = 4;
register('StructArrayLayout_4_2ub', StructArrayLayout_4_2ub);
module.exports = StructArrayLayout_4_2ub;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

/**
 * Implementation of the StructArray layout:
 * [0]: Int16[2]
 * [4]: Uint16[2]
 * [8]: Uint32[3]
 * [20]: Uint16[3]
 * [28]: Float32[2]
 * [36]: Uint8[2]
 *
 * @private
 */
class StructArrayLayout_40_2i2ui3ul3ui2f2ub extends StructArray {
    uint8: Uint8Array;
    int16: Int16Array;
    uint16: Uint16Array;
    uint32: Uint32Array;
    float32: Float32Array;

    _refreshViews() {
        this.uint8 = new Uint8Array(this.arrayBuffer);
        this.int16 = new Int16Array(this.arrayBuffer);
        this.uint16 = new Uint16Array(this.arrayBuffer);
        this.uint32 = new Uint32Array(this.arrayBuffer);
        this.float32 = new Float32Array(this.arrayBuffer);
    }

    emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number, v13: number) {
        const i = this.length;
        this.resize(this.length + 1);
        const o2 = i * 20;
        const o4 = i * 10;
        const o1 = i * 40;
        this.int16[o2 + 0] = v0;
        this.int16[o2 + 1] = v1;
        this.uint16[o2 + 2] = v2;
        this.uint16[o2 + 3] = v3;
        this.uint32[o4 + 2] = v4;
        this.uint32[o4 + 3] = v5;
        this.uint32[o4 + 4] = v6;
        this.uint16[o2 + 10] = v7;
        this.uint16[o2 + 11] = v8;
        this.uint16[o2 + 12] = v9;
        this.float32[o4 + 7] = v10;
        this.float32[o4 + 8] = v11;
        this.uint8[o1 + 36] = v12;
        this.uint8[o1 + 37] = v13;
        return i;
    }

}

StructArrayLayout_40_2i2ui3ul3ui2f2ub.prototype.bytesPerElement = 40;
register('StructArrayLayout_40_2i2ui3ul3ui2f2ub', StructArrayLayout_40_2i2ui3ul3ui2f2ub);
module.exports = StructArrayLayout_40_2i2ui3ul3ui2f2ub;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

/**
 * Implementation of the StructArray layout:
 * [0]: Float32[1]
 *
 * @private
 */
class StructArrayLayout_4_1f extends StructArray {
    uint8: Uint8Array;
    float32: Float32Array;

    _refreshViews() {
        this.uint8 = new Uint8Array(this.arrayBuffer);
        this.float32 = new Float32Array(this.arrayBuffer);
    }

    emplaceBack(v0: number) {
        const i = this.length;
        this.resize(this.length + 1);
        const o4 = i * 1;
        this.float32[o4 + 0] = v0;
        return i;
    }

}

StructArrayLayout_4_1f.prototype.bytesPerElement = 4;
register('StructArrayLayout_4_1f', StructArrayLayout_4_1f);
module.exports = StructArrayLayout_4_1f;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

/**
 * Implementation of the StructArray layout:
 * [0]: Int16[3]
 *
 * @private
 */
class StructArrayLayout_6_3i extends StructArray {
    uint8: Uint8Array;
    int16: Int16Array;

    _refreshViews() {
        this.uint8 = new Uint8Array(this.arrayBuffer);
        this.int16 = new Int16Array(this.arrayBuffer);
    }

    emplaceBack(v0: number, v1: number, v2: number) {
        const i = this.length;
        this.resize(this.length + 1);
        const o2 = i * 3;
        this.int16[o2 + 0] = v0;
        this.int16[o2 + 1] = v1;
        this.int16[o2 + 2] = v2;
        return i;
    }

}

StructArrayLayout_6_3i.prototype.bytesPerElement = 6;
register('StructArrayLayout_6_3i', StructArrayLayout_6_3i);
module.exports = StructArrayLayout_6_3i;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

/**
 * Implementation of the StructArray layout:
 * [0]: Uint32[1]
 * [4]: Uint16[2]
 *
 * @private
 */
class StructArrayLayout_12_1ul2ui extends StructArray {
    uint8: Uint8Array;
    uint32: Uint32Array;
    uint16: Uint16Array;

    _refreshViews() {
        this.uint8 = new Uint8Array(this.arrayBuffer);
        this.uint32 = new Uint32Array(this.arrayBuffer);
        this.uint16 = new Uint16Array(this.arrayBuffer);
    }

    emplaceBack(v0: number, v1: number, v2: number) {
        const i = this.length;
        this.resize(this.length + 1);
        const o4 = i * 3;
        const o2 = i * 6;
        this.uint32[o4 + 0] = v0;
        this.uint16[o2 + 2] = v1;
        this.uint16[o2 + 3] = v2;
        return i;
    }

}

StructArrayLayout_12_1ul2ui.prototype.bytesPerElement = 12;
register('StructArrayLayout_12_1ul2ui', StructArrayLayout_12_1ul2ui);
module.exports = StructArrayLayout_12_1ul2ui;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

/**
 * Implementation of the StructArray layout:
 * [0]: Uint16[3]
 *
 * @private
 */
class StructArrayLayout_6_3ui extends StructArray {
    uint8: Uint8Array;
    uint16: Uint16Array;

    _refreshViews() {
        this.uint8 = new Uint8Array(this.arrayBuffer);
        this.uint16 = new Uint16Array(this.arrayBuffer);
    }

    emplaceBack(v0: number, v1: number, v2: number) {
        const i = this.length;
        this.resize(this.length + 1);
        const o2 = i * 3;
        this.uint16[o2 + 0] = v0;
        this.uint16[o2 + 1] = v1;
        this.uint16[o2 + 2] = v2;
        return i;
    }

}

StructArrayLayout_6_3ui.prototype.bytesPerElement = 6;
register('StructArrayLayout_6_3ui', StructArrayLayout_6_3ui);
module.exports = StructArrayLayout_6_3ui;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

/**
 * Implementation of the StructArray layout:
 * [0]: Uint16[2]
 *
 * @private
 */
class StructArrayLayout_4_2ui extends StructArray {
    uint8: Uint8Array;
    uint16: Uint16Array;

    _refreshViews() {
        this.uint8 = new Uint8Array(this.arrayBuffer);
        this.uint16 = new Uint16Array(this.arrayBuffer);
    }

    emplaceBack(v0: number, v1: number) {
        const i = this.length;
        this.resize(this.length + 1);
        const o2 = i * 2;
        this.uint16[o2 + 0] = v0;
        this.uint16[o2 + 1] = v1;
        return i;
    }

}

StructArrayLayout_4_2ui.prototype.bytesPerElement = 4;
register('StructArrayLayout_4_2ui', StructArrayLayout_4_2ui);
module.exports = StructArrayLayout_4_2ui;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

/**
 * Implementation of the StructArray layout:
 * [0]: Float32[2]
 *
 * @private
 */
class StructArrayLayout_8_2f extends StructArray {
    uint8: Uint8Array;
    float32: Float32Array;

    _refreshViews() {
        this.uint8 = new Uint8Array(this.arrayBuffer);
        this.float32 = new Float32Array(this.arrayBuffer);
    }

    emplaceBack(v0: number, v1: number) {
        const i = this.length;
        this.resize(this.length + 1);
        const o4 = i * 2;
        this.float32[o4 + 0] = v0;
        this.float32[o4 + 1] = v1;
        return i;
    }

}

StructArrayLayout_8_2f.prototype.bytesPerElement = 8;
register('StructArrayLayout_8_2f', StructArrayLayout_8_2f);
module.exports = StructArrayLayout_8_2f;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

/**
 * Implementation of the StructArray layout:
 * [0]: Float32[4]
 *
 * @private
 */
class StructArrayLayout_16_4f extends StructArray {
    uint8: Uint8Array;
    float32: Float32Array;

    _refreshViews() {
        this.uint8 = new Uint8Array(this.arrayBuffer);
        this.float32 = new Float32Array(this.arrayBuffer);
    }

    emplaceBack(v0: number, v1: number, v2: number, v3: number) {
        const i = this.length;
        this.resize(this.length + 1);
        const o4 = i * 4;
        this.float32[o4 + 0] = v0;
        this.float32[o4 + 1] = v1;
        this.float32[o4 + 2] = v2;
        this.float32[o4 + 3] = v3;
        return i;
    }

}

StructArrayLayout_16_4f.prototype.bytesPerElement = 16;
register('StructArrayLayout_16_4f', StructArrayLayout_16_4f);
module.exports = StructArrayLayout_16_4f;


// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */
class CollisionBoxStruct extends Struct {
    anchorPointX: number;
    anchorPointY: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    featureIndex: number;
    sourceLayerIndex: number;
    bucketIndex: number;
    radius: number;
    signedDistanceFromAnchor: number;
    anchorPoint: Point;
}
(Object.defineProperty: any)(
    CollisionBoxStruct.prototype,
    'anchorPointX',
    {
        get: function () { return this._structArray.int16[this._pos2 + 0]; },
        set: function (x) { this._structArray.int16[this._pos2 + 0] = x; }
    }
);
(Object.defineProperty: any)(
    CollisionBoxStruct.prototype,
    'anchorPointY',
    {
        get: function () { return this._structArray.int16[this._pos2 + 1]; },
        set: function (x) { this._structArray.int16[this._pos2 + 1] = x; }
    }
);
(Object.defineProperty: any)(
    CollisionBoxStruct.prototype,
    'x1',
    {
        get: function () { return this._structArray.int16[this._pos2 + 2]; },
        set: function (x) { this._structArray.int16[this._pos2 + 2] = x; }
    }
);
(Object.defineProperty: any)(
    CollisionBoxStruct.prototype,
    'y1',
    {
        get: function () { return this._structArray.int16[this._pos2 + 3]; },
        set: function (x) { this._structArray.int16[this._pos2 + 3] = x; }
    }
);
(Object.defineProperty: any)(
    CollisionBoxStruct.prototype,
    'x2',
    {
        get: function () { return this._structArray.int16[this._pos2 + 4]; },
        set: function (x) { this._structArray.int16[this._pos2 + 4] = x; }
    }
);
(Object.defineProperty: any)(
    CollisionBoxStruct.prototype,
    'y2',
    {
        get: function () { return this._structArray.int16[this._pos2 + 5]; },
        set: function (x) { this._structArray.int16[this._pos2 + 5] = x; }
    }
);
(Object.defineProperty: any)(
    CollisionBoxStruct.prototype,
    'featureIndex',
    {
        get: function () { return this._structArray.uint32[this._pos4 + 3]; },
        set: function (x) { this._structArray.uint32[this._pos4 + 3] = x; }
    }
);
(Object.defineProperty: any)(
    CollisionBoxStruct.prototype,
    'sourceLayerIndex',
    {
        get: function () { return this._structArray.uint16[this._pos2 + 8]; },
        set: function (x) { this._structArray.uint16[this._pos2 + 8] = x; }
    }
);
(Object.defineProperty: any)(
    CollisionBoxStruct.prototype,
    'bucketIndex',
    {
        get: function () { return this._structArray.uint16[this._pos2 + 9]; },
        set: function (x) { this._structArray.uint16[this._pos2 + 9] = x; }
    }
);
(Object.defineProperty: any)(
    CollisionBoxStruct.prototype,
    'radius',
    {
        get: function () { return this._structArray.int16[this._pos2 + 10]; },
        set: function (x) { this._structArray.int16[this._pos2 + 10] = x; }
    }
);
(Object.defineProperty: any)(
    CollisionBoxStruct.prototype,
    'signedDistanceFromAnchor',
    {
        get: function () { return this._structArray.int16[this._pos2 + 11]; },
        set: function (x) { this._structArray.int16[this._pos2 + 11] = x; }
    }
);
// https://github.com/facebook/flow/issues/285
(Object.defineProperty: any)(CollisionBoxStruct.prototype, 'anchorPoint', {
    get() { return new Point(this.anchorPointX, this.anchorPointY); }
});
CollisionBoxStruct.prototype.size = 24;

export type CollisionBox = CollisionBoxStruct;


/**
 * @private
 */
class CollisionBoxArray extends StructArrayLayout_24_6i1ul2ui2i {
    getanchorPointX(index: number) { return this.int16[index * 12 + 0]; }
    getanchorPointY(index: number) { return this.int16[index * 12 + 1]; }
    getx1(index: number) { return this.int16[index * 12 + 2]; }
    gety1(index: number) { return this.int16[index * 12 + 3]; }
    getx2(index: number) { return this.int16[index * 12 + 4]; }
    gety2(index: number) { return this.int16[index * 12 + 5]; }
    getfeatureIndex(index: number) { return this.uint32[index * 6 + 3]; }
    getsourceLayerIndex(index: number) { return this.uint16[index * 12 + 8]; }
    getbucketIndex(index: number) { return this.uint16[index * 12 + 9]; }
    getradius(index: number) { return this.int16[index * 12 + 10]; }
    getsignedDistanceFromAnchor(index: number) { return this.int16[index * 12 + 11]; }
    /**
     * Return the CollisionBoxStruct at the given location in the array.
     * @param {number} index The index of the element.
     */
    get(index: number): CollisionBoxStruct {
        assert(!this.isTransferred);
        return new CollisionBoxStruct(this, index);
    }
}

register('CollisionBoxArray', CollisionBoxArray);
module.exports = CollisionBoxArray;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */
class PlacedSymbolStruct extends Struct {
    anchorX: number;
    anchorY: number;
    glyphStartIndex: number;
    numGlyphs: number;
    vertexStartIndex: number;
    lineStartIndex: number;
    lineLength: number;
    segment: number;
    lowerSize: number;
    upperSize: number;
    lineOffsetX: number;
    lineOffsetY: number;
    writingMode: number;
    hidden: number;
}
(Object.defineProperty: any)(
    PlacedSymbolStruct.prototype,
    'anchorX',
    {
        get: function () { return this._structArray.int16[this._pos2 + 0]; },
        set: function (x) { this._structArray.int16[this._pos2 + 0] = x; }
    }
);
(Object.defineProperty: any)(
    PlacedSymbolStruct.prototype,
    'anchorY',
    {
        get: function () { return this._structArray.int16[this._pos2 + 1]; },
        set: function (x) { this._structArray.int16[this._pos2 + 1] = x; }
    }
);
(Object.defineProperty: any)(
    PlacedSymbolStruct.prototype,
    'glyphStartIndex',
    {
        get: function () { return this._structArray.uint16[this._pos2 + 2]; },
        set: function (x) { this._structArray.uint16[this._pos2 + 2] = x; }
    }
);
(Object.defineProperty: any)(
    PlacedSymbolStruct.prototype,
    'numGlyphs',
    {
        get: function () { return this._structArray.uint16[this._pos2 + 3]; },
        set: function (x) { this._structArray.uint16[this._pos2 + 3] = x; }
    }
);
(Object.defineProperty: any)(
    PlacedSymbolStruct.prototype,
    'vertexStartIndex',
    {
        get: function () { return this._structArray.uint32[this._pos4 + 2]; },
        set: function (x) { this._structArray.uint32[this._pos4 + 2] = x; }
    }
);
(Object.defineProperty: any)(
    PlacedSymbolStruct.prototype,
    'lineStartIndex',
    {
        get: function () { return this._structArray.uint32[this._pos4 + 3]; },
        set: function (x) { this._structArray.uint32[this._pos4 + 3] = x; }
    }
);
(Object.defineProperty: any)(
    PlacedSymbolStruct.prototype,
    'lineLength',
    {
        get: function () { return this._structArray.uint32[this._pos4 + 4]; },
        set: function (x) { this._structArray.uint32[this._pos4 + 4] = x; }
    }
);
(Object.defineProperty: any)(
    PlacedSymbolStruct.prototype,
    'segment',
    {
        get: function () { return this._structArray.uint16[this._pos2 + 10]; },
        set: function (x) { this._structArray.uint16[this._pos2 + 10] = x; }
    }
);
(Object.defineProperty: any)(
    PlacedSymbolStruct.prototype,
    'lowerSize',
    {
        get: function () { return this._structArray.uint16[this._pos2 + 11]; },
        set: function (x) { this._structArray.uint16[this._pos2 + 11] = x; }
    }
);
(Object.defineProperty: any)(
    PlacedSymbolStruct.prototype,
    'upperSize',
    {
        get: function () { return this._structArray.uint16[this._pos2 + 12]; },
        set: function (x) { this._structArray.uint16[this._pos2 + 12] = x; }
    }
);
(Object.defineProperty: any)(
    PlacedSymbolStruct.prototype,
    'lineOffsetX',
    {
        get: function () { return this._structArray.float32[this._pos4 + 7]; },
        set: function (x) { this._structArray.float32[this._pos4 + 7] = x; }
    }
);
(Object.defineProperty: any)(
    PlacedSymbolStruct.prototype,
    'lineOffsetY',
    {
        get: function () { return this._structArray.float32[this._pos4 + 8]; },
        set: function (x) { this._structArray.float32[this._pos4 + 8] = x; }
    }
);
(Object.defineProperty: any)(
    PlacedSymbolStruct.prototype,
    'writingMode',
    {
        get: function () { return this._structArray.uint8[this._pos1 + 36]; },
        set: function (x) { this._structArray.uint8[this._pos1 + 36] = x; }
    }
);
(Object.defineProperty: any)(
    PlacedSymbolStruct.prototype,
    'hidden',
    {
        get: function () { return this._structArray.uint8[this._pos1 + 37]; },
        set: function (x) { this._structArray.uint8[this._pos1 + 37] = x; }
    }
);
PlacedSymbolStruct.prototype.size = 40;

export type PlacedSymbol = PlacedSymbolStruct;


/**
 * @private
 */
class PlacedSymbolArray extends StructArrayLayout_40_2i2ui3ul3ui2f2ub {
    getanchorX(index: number) { return this.int16[index * 20 + 0]; }
    getanchorY(index: number) { return this.int16[index * 20 + 1]; }
    getglyphStartIndex(index: number) { return this.uint16[index * 20 + 2]; }
    getnumGlyphs(index: number) { return this.uint16[index * 20 + 3]; }
    getvertexStartIndex(index: number) { return this.uint32[index * 10 + 2]; }
    getlineStartIndex(index: number) { return this.uint32[index * 10 + 3]; }
    getlineLength(index: number) { return this.uint32[index * 10 + 4]; }
    getsegment(index: number) { return this.uint16[index * 20 + 10]; }
    getlowerSize(index: number) { return this.uint16[index * 20 + 11]; }
    getupperSize(index: number) { return this.uint16[index * 20 + 12]; }
    getlineOffsetX(index: number) { return this.float32[index * 10 + 7]; }
    getlineOffsetY(index: number) { return this.float32[index * 10 + 8]; }
    getwritingMode(index: number) { return this.uint8[index * 40 + 36]; }
    gethidden(index: number) { return this.uint8[index * 40 + 37]; }
    /**
     * Return the PlacedSymbolStruct at the given location in the array.
     * @param {number} index The index of the element.
     */
    get(index: number): PlacedSymbolStruct {
        assert(!this.isTransferred);
        return new PlacedSymbolStruct(this, index);
    }
}

register('PlacedSymbolArray', PlacedSymbolArray);
module.exports = PlacedSymbolArray;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */
class GlyphOffsetStruct extends Struct {
    offsetX: number;
}
(Object.defineProperty: any)(
    GlyphOffsetStruct.prototype,
    'offsetX',
    {
        get: function () { return this._structArray.float32[this._pos4 + 0]; },
        set: function (x) { this._structArray.float32[this._pos4 + 0] = x; }
    }
);
GlyphOffsetStruct.prototype.size = 4;

export type GlyphOffset = GlyphOffsetStruct;


/**
 * @private
 */
class GlyphOffsetArray extends StructArrayLayout_4_1f {
    getoffsetX(index: number) { return this.float32[index * 1 + 0]; }
    /**
     * Return the GlyphOffsetStruct at the given location in the array.
     * @param {number} index The index of the element.
     */
    get(index: number): GlyphOffsetStruct {
        assert(!this.isTransferred);
        return new GlyphOffsetStruct(this, index);
    }
}

register('GlyphOffsetArray', GlyphOffsetArray);
module.exports = GlyphOffsetArray;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */
class SymbolLineVertexStruct extends Struct {
    x: number;
    y: number;
    tileUnitDistanceFromAnchor: number;
}
(Object.defineProperty: any)(
    SymbolLineVertexStruct.prototype,
    'x',
    {
        get: function () { return this._structArray.int16[this._pos2 + 0]; },
        set: function (x) { this._structArray.int16[this._pos2 + 0] = x; }
    }
);
(Object.defineProperty: any)(
    SymbolLineVertexStruct.prototype,
    'y',
    {
        get: function () { return this._structArray.int16[this._pos2 + 1]; },
        set: function (x) { this._structArray.int16[this._pos2 + 1] = x; }
    }
);
(Object.defineProperty: any)(
    SymbolLineVertexStruct.prototype,
    'tileUnitDistanceFromAnchor',
    {
        get: function () { return this._structArray.int16[this._pos2 + 2]; },
        set: function (x) { this._structArray.int16[this._pos2 + 2] = x; }
    }
);
SymbolLineVertexStruct.prototype.size = 6;

export type SymbolLineVertex = SymbolLineVertexStruct;


/**
 * @private
 */
class SymbolLineVertexArray extends StructArrayLayout_6_3i {
    getx(index: number) { return this.int16[index * 3 + 0]; }
    gety(index: number) { return this.int16[index * 3 + 1]; }
    gettileUnitDistanceFromAnchor(index: number) { return this.int16[index * 3 + 2]; }
    /**
     * Return the SymbolLineVertexStruct at the given location in the array.
     * @param {number} index The index of the element.
     */
    get(index: number): SymbolLineVertexStruct {
        assert(!this.isTransferred);
        return new SymbolLineVertexStruct(this, index);
    }
}

register('SymbolLineVertexArray', SymbolLineVertexArray);
module.exports = SymbolLineVertexArray;

// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */
class FeatureIndexStruct extends Struct {
    featureIndex: number;
    sourceLayerIndex: number;
    bucketIndex: number;
}
(Object.defineProperty: any)(
    FeatureIndexStruct.prototype,
    'featureIndex',
    {
        get: function () { return this._structArray.uint32[this._pos4 + 0]; },
        set: function (x) { this._structArray.uint32[this._pos4 + 0] = x; }
    }
);
(Object.defineProperty: any)(
    FeatureIndexStruct.prototype,
    'sourceLayerIndex',
    {
        get: function () { return this._structArray.uint16[this._pos2 + 2]; },
        set: function (x) { this._structArray.uint16[this._pos2 + 2] = x; }
    }
);
(Object.defineProperty: any)(
    FeatureIndexStruct.prototype,
    'bucketIndex',
    {
        get: function () { return this._structArray.uint16[this._pos2 + 4]; },
        set: function (x) { this._structArray.uint16[this._pos2 + 4] = x; }
    }
);
FeatureIndexStruct.prototype.size = 12;

export type FeatureIndex = FeatureIndexStruct;


/**
 * @private
 */
class FeatureIndexArray extends StructArrayLayout_12_1ul2ui {
    getfeatureIndex(index: number) { return this.uint32[index * 3 + 0]; }
    getsourceLayerIndex(index: number) { return this.uint16[index * 6 + 2]; }
    getbucketIndex(index: number) { return this.uint16[index * 6 + 4]; }
    /**
     * Return the FeatureIndexStruct at the given location in the array.
     * @param {number} index The index of the element.
     */
    get(index: number): FeatureIndexStruct {
        assert(!this.isTransferred);
        return new FeatureIndexStruct(this, index);
    }
}

register('FeatureIndexArray', FeatureIndexArray);
module.exports = FeatureIndexArray;


module.exports = {
    StructArrayLayout_4_2i,
    StructArrayLayout_8_4i,
    StructArrayLayout_16_6i,
    StructArrayLayout_12_4i4ub,
    StructArrayLayout_16_4i4ui,
    StructArrayLayout_12_3f,
    StructArrayLayout_4_1ul,
    StructArrayLayout_24_6i1ul2ui2i,
    StructArrayLayout_12_6i,
    StructArrayLayout_4_2ub,
    StructArrayLayout_40_2i2ui3ul3ui2f2ub,
    StructArrayLayout_4_1f,
    StructArrayLayout_6_3i,
    StructArrayLayout_12_1ul2ui,
    StructArrayLayout_6_3ui,
    StructArrayLayout_4_2ui,
    StructArrayLayout_8_2f,
    StructArrayLayout_16_4f,
    PosArray: StructArrayLayout_4_2i,
    RasterBoundsArray: StructArrayLayout_8_4i,
    CircleLayoutArray: StructArrayLayout_4_2i,
    FillLayoutArray: StructArrayLayout_4_2i,
    FillExtrusionLayoutArray: StructArrayLayout_16_6i,
    HeatmapLayoutArray: StructArrayLayout_4_2i,
    LineLayoutArray: StructArrayLayout_12_4i4ub,
    SymbolLayoutArray: StructArrayLayout_16_4i4ui,
    SymbolDynamicLayoutArray: StructArrayLayout_12_3f,
    SymbolOpacityArray: StructArrayLayout_4_1ul,
    CollisionBoxLayoutArray: StructArrayLayout_12_6i,
    CollisionCircleLayoutArray: StructArrayLayout_12_6i,
    CollisionVertexArray: StructArrayLayout_4_2ub,
    TriangleIndexArray: StructArrayLayout_6_3ui,
    LineIndexArray: StructArrayLayout_4_2ui,
    FillOpacitySourcePaintArray: StructArrayLayout_4_1f,
    FillOpacityCompositePaintArray: StructArrayLayout_8_2f,
    FillColorSourcePaintArray: StructArrayLayout_8_2f,
    FillColorCompositePaintArray: StructArrayLayout_16_4f,
    FillOutlineColorSourcePaintArray: StructArrayLayout_8_2f,
    FillOutlineColorCompositePaintArray: StructArrayLayout_16_4f,
    LineOpacitySourcePaintArray: StructArrayLayout_4_1f,
    LineOpacityCompositePaintArray: StructArrayLayout_8_2f,
    LineColorSourcePaintArray: StructArrayLayout_8_2f,
    LineColorCompositePaintArray: StructArrayLayout_16_4f,
    LineWidthSourcePaintArray: StructArrayLayout_4_1f,
    LineWidthCompositePaintArray: StructArrayLayout_8_2f,
    LineGapWidthSourcePaintArray: StructArrayLayout_4_1f,
    LineGapWidthCompositePaintArray: StructArrayLayout_8_2f,
    LineOffsetSourcePaintArray: StructArrayLayout_4_1f,
    LineOffsetCompositePaintArray: StructArrayLayout_8_2f,
    LineBlurSourcePaintArray: StructArrayLayout_4_1f,
    LineBlurCompositePaintArray: StructArrayLayout_8_2f,
    LineFloorwidthSourcePaintArray: StructArrayLayout_4_1f,
    LineFloorwidthCompositePaintArray: StructArrayLayout_8_2f,
    IconOpacitySourcePaintArray: StructArrayLayout_4_1f,
    IconOpacityCompositePaintArray: StructArrayLayout_8_2f,
    IconColorSourcePaintArray: StructArrayLayout_8_2f,
    IconColorCompositePaintArray: StructArrayLayout_16_4f,
    IconHaloColorSourcePaintArray: StructArrayLayout_8_2f,
    IconHaloColorCompositePaintArray: StructArrayLayout_16_4f,
    IconHaloWidthSourcePaintArray: StructArrayLayout_4_1f,
    IconHaloWidthCompositePaintArray: StructArrayLayout_8_2f,
    IconHaloBlurSourcePaintArray: StructArrayLayout_4_1f,
    IconHaloBlurCompositePaintArray: StructArrayLayout_8_2f,
    TextOpacitySourcePaintArray: StructArrayLayout_4_1f,
    TextOpacityCompositePaintArray: StructArrayLayout_8_2f,
    TextColorSourcePaintArray: StructArrayLayout_8_2f,
    TextColorCompositePaintArray: StructArrayLayout_16_4f,
    TextHaloColorSourcePaintArray: StructArrayLayout_8_2f,
    TextHaloColorCompositePaintArray: StructArrayLayout_16_4f,
    TextHaloWidthSourcePaintArray: StructArrayLayout_4_1f,
    TextHaloWidthCompositePaintArray: StructArrayLayout_8_2f,
    TextHaloBlurSourcePaintArray: StructArrayLayout_4_1f,
    TextHaloBlurCompositePaintArray: StructArrayLayout_8_2f,
    CircleRadiusSourcePaintArray: StructArrayLayout_4_1f,
    CircleRadiusCompositePaintArray: StructArrayLayout_8_2f,
    CircleColorSourcePaintArray: StructArrayLayout_8_2f,
    CircleColorCompositePaintArray: StructArrayLayout_16_4f,
    CircleBlurSourcePaintArray: StructArrayLayout_4_1f,
    CircleBlurCompositePaintArray: StructArrayLayout_8_2f,
    CircleOpacitySourcePaintArray: StructArrayLayout_4_1f,
    CircleOpacityCompositePaintArray: StructArrayLayout_8_2f,
    CircleStrokeWidthSourcePaintArray: StructArrayLayout_4_1f,
    CircleStrokeWidthCompositePaintArray: StructArrayLayout_8_2f,
    CircleStrokeColorSourcePaintArray: StructArrayLayout_8_2f,
    CircleStrokeColorCompositePaintArray: StructArrayLayout_16_4f,
    CircleStrokeOpacitySourcePaintArray: StructArrayLayout_4_1f,
    CircleStrokeOpacityCompositePaintArray: StructArrayLayout_8_2f,
    HeatmapWeightSourcePaintArray: StructArrayLayout_4_1f,
    HeatmapWeightCompositePaintArray: StructArrayLayout_8_2f,
    FillExtrusionColorSourcePaintArray: StructArrayLayout_8_2f,
    FillExtrusionColorCompositePaintArray: StructArrayLayout_16_4f,
    FillExtrusionHeightSourcePaintArray: StructArrayLayout_4_1f,
    FillExtrusionHeightCompositePaintArray: StructArrayLayout_8_2f,
    FillExtrusionBaseSourcePaintArray: StructArrayLayout_4_1f,
    FillExtrusionBaseCompositePaintArray: StructArrayLayout_8_2f,
    CollisionBoxArray,
    PlacedSymbolArray,
    GlyphOffsetArray,
    SymbolLineVertexArray,
    FeatureIndexArray
};
