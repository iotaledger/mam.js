// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { TrytesHelper } from "./trytesHelper.mjs";
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
export function pascalEncode(value) {
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
        const tritsAsInt = TrytesHelper.tritsValue(tritValue);
        if (tritsAsInt >= 0) {
            encoding |= 1 << index;
            for (let j = 0; j < tritValue.length; j++) {
                trits[i + j] = -tritValue[j];
            }
        }
        index++;
    }
    const v = trits.slice(length - TRITS_PER_TRYTE, length - TRITS_PER_TRYTE + length);
    if (TrytesHelper.tritsValue(v) < 0) {
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
/**
 * Decode the pascal encoded trits.
 * @param value The value to decode.
 * @returns The decoded value.
 * @internal
 */
export function pascalDecode(value) {
    if (value.length >= ZERO.length &&
        value[0] === ZERO[0] &&
        value[1] === ZERO[1] &&
        value[2] === ZERO[2] &&
        value[3] === ZERO[3]) {
        return { value: 0, end: 4 };
    }
    const encoderStart = end(value);
    const inputEnd = encoderStart + (encoderStart / TRITS_PER_TRYTE);
    const encoder = TrytesHelper.tritsValue(value.slice(encoderStart, inputEnd));
    let result = 0;
    for (let i = 0; i < encoderStart / TRITS_PER_TRYTE; i++) {
        const tritsIntValue = ((encoder >> i) & 1) !== 0
            ? -TrytesHelper.tritsValue(value.slice(i * TRITS_PER_TRYTE, (i + 1) * TRITS_PER_TRYTE))
            : TrytesHelper.tritsValue(value.slice(i * TRITS_PER_TRYTE, (i + 1) * TRITS_PER_TRYTE));
        result += (Math.pow(27, i) * tritsIntValue);
    }
    return { value: result, end: inputEnd };
}
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
export function roundThird(value) {
    const rem = value % RADIX;
    if (rem === 0) {
        return value;
    }
    return value + RADIX - rem;
}
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
    if (TrytesHelper.tritsValue(input.slice(0, TRITS_PER_TRYTE)) > 0) {
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
