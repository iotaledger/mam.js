"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundThird = exports.pascalDecode = exports.pascalEncode = void 0;
const converter_1 = require("@iota/converter");
const ZERO = new Int8Array([1, 0, 0, -1]);
const RADIX = 3;
const TRITS_PER_TRYTE = 3;
/**
 * Perform pascal encoding of the value.
 * @param value The value to encode.
 * @returns The trits for the encoded value.
 * @private
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
        const tritsAsInt = converter_1.value(tritValue);
        if (tritsAsInt >= 0) {
            encoding |= 1 << index;
            for (let j = 0; j < tritValue.length; j++) {
                trits[i + j] = -tritValue[j];
            }
        }
        index++;
    }
    const v = trits.slice(length - TRITS_PER_TRYTE, length - TRITS_PER_TRYTE + length);
    if (converter_1.value(v) < 0) {
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
 * @private
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
    const encoder = converter_1.value(value.slice(encoderStart, inputEnd));
    let result = 0;
    for (let i = 0; i < encoderStart / TRITS_PER_TRYTE; i++) {
        const tritsIntValue = ((encoder >> i) & 1) !== 0
            ? -converter_1.value(value.slice(i * TRITS_PER_TRYTE, (i + 1) * TRITS_PER_TRYTE))
            : converter_1.value(value.slice(i * TRITS_PER_TRYTE, (i + 1) * TRITS_PER_TRYTE));
        result = result + (Math.pow(27, i) * tritsIntValue);
    }
    return { value: result, end: inputEnd };
}
exports.pascalDecode = pascalDecode;
/**
 * Get the encoded length of the value.
 * @param value The value.
 * @returns The length.
 * @private
 */
function encodedLength(value) {
    const length = roundThird(minTrits(Math.abs(value), 1));
    return length + (length / RADIX);
}
/**
 * Round the number to the third.
 * @param value The value to round.
 * @returns The rounded number.
 * @private
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
 * @private
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
 * @private
 */
function end(input) {
    if (converter_1.value(input.slice(0, TRITS_PER_TRYTE)) > 0) {
        return TRITS_PER_TRYTE;
    }
    return TRITS_PER_TRYTE + end(input.slice(TRITS_PER_TRYTE));
}
/**
 * Convert the value to trits.
 * @param input The input value to convert.
 * @param trits The trits.
 * @returns The end conversion.
 * @private
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
 * @private
 */
function writeTrits(input, trits, index) {
    switch (input) {
        case 0:
            return 0;
        default:
            let abs = Math.floor(input / RADIX);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzY2FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3Bhc2NhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQ0FBc0Q7QUFFdEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUMsTUFBTSxLQUFLLEdBQVcsQ0FBQyxDQUFDO0FBQ3hCLE1BQU0sZUFBZSxHQUFXLENBQUMsQ0FBQztBQUVsQzs7Ozs7R0FLRztBQUNILFNBQWdCLFlBQVksQ0FBQyxLQUFhO0lBQ3RDLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtRQUNiLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RCxNQUFNLEtBQUssR0FBRyxJQUFJLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNsRCxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRTNCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztJQUNqQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7SUFFZCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxHQUFHLGVBQWUsRUFBRSxDQUFDLElBQUksZUFBZSxFQUFFO1FBQ2hFLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQztRQUN0RCxNQUFNLFVBQVUsR0FBRyxpQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXpDLElBQUksVUFBVSxJQUFJLENBQUMsRUFBRTtZQUNqQixRQUFRLElBQUks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