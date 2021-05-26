"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundThird = exports.pascalDecode = exports.pascalEncode = void 0;
// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const trytesHelper_1 = require("./trytesHelper");
/* eslint-disable no-bitwise */
// @internal
const ZERO = new Int8Array([1, 0, 0, -1]);
// @internal
const RADIX = 3;
// @internal
const TRITS_PER_TRYTE = 3;
/**
 * Perform pascal encoding of the value.
 * @param value The value to encode.
 * @returns The trits for the encoded value.
 * @internal
 */
function pascalEncode(value) {
    if (value === 0) {
        return ZERO;
    }
    const length = roundThird(minTrits(Math.abs(value), 1));
    const trits = new Int8Array(encodedLength(value));
    valueToTrits(value, trits);
    let encoding = 0;
    let index = 0;
    for (let i = 0; i < length - TRITS_PER_TRYTE; i += TRITS_PER_TRYTE) {
        const tritValue = trits.slice(i, i + TRITS_PER_TRYTE);
        const tritsAsInt = trytesHelper_1.TrytesHelper.tritsValue(tritValue);
        if (tritsAsInt >= 0) {
            encoding |= 1 << index;
            for (let j = 0; j < tritValue.length; j++) {
                trits[i + j] = -tritValue[j];
            }
        }
        index++;
    }
    const v = trits.slice(length - TRITS_PER_TRYTE, length - TRITS_PER_TRYTE + length);
    if (trytesHelper_1.TrytesHelper.tritsValue(v) < 0) {
        encoding |= 1 << index;
        for (let k = 0; k < v.length; k++) {
            trits[k + length - TRITS_PER_TRYTE] = -trits[k + length - TRITS_PER_TRYTE];
        }
    }
    const checksumTrits = new Int8Array(trits.length - length);
    valueToTrits(encoding, checksumTrits);
    for (let i = 0; i < checksumTrits.length; i++) {
        trits[length + i] = checksumTrits[i];
    }
    return trits;
}
exports.pascalEncode = pascalEncode;
/**
 * Decode the pascal encoded trits.
 * @param value The value to decode.
 * @returns The decoded value.
 * @internal
 */
function pascalDecode(value) {
    if (value.length >= ZERO.length &&
        value[0] === ZERO[0] &&
        value[1] === ZERO[1] &&
        value[2] === ZERO[2] &&
        value[3] === ZERO[3]) {
        return { value: 0, end: 4 };
    }
    const encoderStart = end(value);
    const inputEnd = encoderStart + (encoderStart / TRITS_PER_TRYTE);
    const encoder = trytesHelper_1.TrytesHelper.tritsValue(value.slice(encoderStart, inputEnd));
    let result = 0;
    for (let i = 0; i < encoderStart / TRITS_PER_TRYTE; i++) {
        const tritsIntValue = ((encoder >> i) & 1) !== 0
            ? -trytesHelper_1.TrytesHelper.tritsValue(value.slice(i * TRITS_PER_TRYTE, (i + 1) * TRITS_PER_TRYTE))
            : trytesHelper_1.TrytesHelper.tritsValue(value.slice(i * TRITS_PER_TRYTE, (i + 1) * TRITS_PER_TRYTE));
        result += (Math.pow(27, i) * tritsIntValue);
    }
    return { value: result, end: inputEnd };
}
exports.pascalDecode = pascalDecode;
/**
 * Get the encoded length of the value.
 * @param value The value.
 * @returns The length.
 * @internal
 */
function encodedLength(value) {
    const length = roundThird(minTrits(Math.abs(value), 1));
    return length + (length / RADIX);
}
/**
 * Round the number to the third.
 * @param value The value to round.
 * @returns The rounded number.
 * @internal
 */
function roundThird(value) {
    const rem = value % RADIX;
    if (rem === 0) {
        return value;
    }
    return value + RADIX - rem;
}
exports.roundThird = roundThird;
/**
 * Calculate the minimum trits for the input.
 * @param input The input to calculate from.
 * @param basis The basis of the calculation.
 * @returns The number of trits.
 * @internal
 */
function minTrits(input, basis) {
    if (input <= basis) {
        return 1;
    }
    return 1 + minTrits(input, 1 + (basis * RADIX));
}
/**
 * Calculate the end for the input.
 * @param input The input to calculate for.
 * @returns The calculated end.
 * @internal
 */
function end(input) {
    if (trytesHelper_1.TrytesHelper.tritsValue(input.slice(0, TRITS_PER_TRYTE)) > 0) {
        return TRITS_PER_TRYTE;
    }
    return TRITS_PER_TRYTE + end(input.slice(TRITS_PER_TRYTE));
}
/**
 * Convert the value to trits.
 * @param input The input value to convert.
 * @param trits The trits.
 * @returns The end conversion.
 * @internal
 */
function valueToTrits(input, trits) {
    const endWrite = writeTrits(input, trits, 0);
    if (input >= 0) {
        return endWrite;
    }
    for (let i = 0; i < trits.length; i++) {
        trits[i] = -trits[i];
    }
    return endWrite;
}
/**
 * Write the trits for the value.
 * @param input The input value.
 * @param trits The trits to write to.
 * @param index The index to write at.
 * @returns The length.
 * @internal
 */
function writeTrits(input, trits, index) {
    switch (input) {
        case 0:
            return 0;
        default:
            // eslint-disable-next-line no-case-declarations
            let abs = Math.floor(input / RADIX);
            // eslint-disable-next-line no-case-declarations
            let r = input % RADIX;
            if (r > 1) {
                abs += 1;
                r = -1;
            }
            trits[index] = r;
            index++;
            return 1 + writeTrits(abs, trits, index);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzY2FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3Bhc2NhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLGlEQUE4QztBQUU5QywrQkFBK0I7QUFDL0IsWUFBWTtBQUNaLE1BQU0sSUFBSSxHQUFHLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFDLFlBQVk7QUFDWixNQUFNLEtBQUssR0FBVyxDQUFDLENBQUM7QUFDeEIsWUFBWTtBQUNaLE1BQU0sZUFBZSxHQUFXLENBQUMsQ0FBQztBQUVsQzs7Ozs7R0FLRztBQUNILFNBQWdCLFlBQVksQ0FBQyxLQUFhO0lBQ3RDLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtRQUNiLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RCxNQUFNLEtBQUssR0FBRyxJQUFJLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNsRCxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRTNCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztJQUNqQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7SUFFZCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxHQUFHLGVBQWUsRUFBRSxDQUFDLElBQUksZUFBZSxFQUFFO1FBQ2hFLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQztRQUN0RCxNQUFNLFVBQVUsR0FBRywyQkFB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