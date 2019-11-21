"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const converter_1 = require("@iota/converter");
const ZERO = new Int8Array([1, 0, 0, -1]);
const RADIX = 3;
const TRITS_PER_TRYTE = 3;
/**
 * Perform pascal encoding of the value.
 * @param value The value to encode.
 * @returns The trits for the encoded value.
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
 */
function encodedLength(value) {
    const length = roundThird(minTrits(Math.abs(value), 1));
    return length + (length / RADIX);
}
/**
 * Round the number to the third.
 * @param value The value to round.
 * @returns The rounded number.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzY2FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3Bhc2NhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUFzRDtBQUV0RCxNQUFNLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQyxNQUFNLEtBQUssR0FBVyxDQUFDLENBQUM7QUFDeEIsTUFBTSxlQUFlLEdBQVcsQ0FBQyxDQUFDO0FBRWxDOzs7O0dBSUc7QUFDSCxTQUFnQixZQUFZLENBQUMsS0FBYTtJQUN0QyxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7UUFDYixPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEQsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUUzQixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDakIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBRWQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sR0FBRyxlQUFlLEVBQUUsQ0FBQyxJQUFJLGVBQWUsRUFBRTtRQUNoRSxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUM7UUFDdEQsTUFBTSxVQUFVLEdBQUcsaUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV6QyxJQUFJLFVBQVUsSUFBSSxDQUFDLEVBQUU7WUFDakIsUUFBUSxJQUFJLENB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