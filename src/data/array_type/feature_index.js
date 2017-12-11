// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

const assert = require('assert');
const {Struct} = require('../../util/struct_array');
const StructArrayLayout_12_1ul2ui = require('./struct_array_layout_12_1ul2ui');
const {register} = require('../../util/web_worker_transfer');
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
class FeatureIndexStructArray extends StructArrayLayout_12_1ul2ui {
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

FeatureIndexStructArray.prototype.members = [{"name":"featureIndex", "type":"Uint32", "components":1, "offset":0, "size":4, "view":"uint32"}, {"name":"sourceLayerIndex", "type":"Uint16", "components":1, "offset":4, "size":2, "view":"uint16"}, {"name":"bucketIndex", "type":"Uint16", "components":1, "offset":8, "size":2, "view":"uint16"}];

register('FeatureIndexStructArray', FeatureIndexStructArray);
module.exports = FeatureIndexStructArray;
