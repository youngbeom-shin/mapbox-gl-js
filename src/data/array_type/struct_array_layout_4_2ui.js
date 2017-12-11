// This file is generated. Edit build/generate-struct-arrays.js, then run `node build/generate-struct-arrays.js`.
// @flow
/* eslint-disable camelcase */

const {StructArray} = require('../../util/struct_array');
const {register} = require('../../util/web_worker_transfer');

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
