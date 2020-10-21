"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundThird = exports.pascalDecode = exports.pascalEncode = void 0;
const trytesHelper_1 = require("./trytesHelper");
/* eslint-disable no-bitwise */
/* @internal */
const ZERO = new Int8Array([1, 0, 0, -1]);
/* @internal */
const RADIX = 3;
/* @internal */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzY2FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3Bhc2NhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpREFBOEM7QUFFOUMsK0JBQStCO0FBQy9CLGVBQWU7QUFDZixNQUFNLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQyxlQUFlO0FBQ2YsTUFBTSxLQUFLLEdBQVcsQ0FBQyxDQUFDO0FBQ3hCLGVBQWU7QUFDZixNQUFNLGVBQWUsR0FBVyxDQUFDLENBQUM7QUFFbEM7Ozs7O0dBS0c7QUFDSCxTQUFnQixZQUFZLENBQUMsS0FBYTtJQUN0QyxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7UUFDYixPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEQsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUUzQixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDakIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBRWQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sR0FBRyxlQUFlLEVBQUUsQ0FBQyxJQUFJLGVBQWUsRUFBRTtRQUNoRSxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUM7UUFDdEQsTUFBTSxVQUFVLEdBQUcsMkJBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEQsSUFBSSxVQUFVLElBQUksQ0FBQyxFQUFFO1lBQ2pCLFFBQVEsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDO1lBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2QyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0o7UUFFRCxLQUFLLEVBQUUsQ0FBQztLQUNYO0lBRUQsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsZUFBZSxFQUFFLE1BQU0sR0FBRyxlQUFlLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDbkYsSUFBSSwyQkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDaEMsUUFBUSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUM7UUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0IsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxlQUFlLENBQUMsQ0FBQztTQUM5RTtLQUNKO0lBRUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQztJQUMzRCxZQUFZLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBRXRDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzNDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3hDO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQTFDRCxvQ0EwQ0M7QUFFRDs7Ozs7R0FLRztBQUNILFNBQWdCLFlBQVksQ0FBQyxLQUFnQjtJQVV6QyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU07UUFDM0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUN0QixPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FDL0I7SUFDRCxNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsTUFBTSxRQUFRLEdBQUcsWUFBWSxHQUFHLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sT0FBTyxHQUFHLDJCQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFFN0UsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksR0FBRyxlQUFlLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDckQsTUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQzVDLENBQUMsQ0FBQyxDQUFDLDJCQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLGVBQWUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQztZQUN2RixDQUFDLENBQUMsMkJBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsZUFBZSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFFM0YsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUM7S0FDL0M7SUFFRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUM7QUFDNUMsQ0FBQztBQS9CRCxvQ0ErQkM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQVMsYUFBYSxDQUFDLEtBQWE7SUFDaEMsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsT0FBTyxNQUFNLEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsU0FBZ0IsVUFBVSxDQUFDLEtBQWE7SUFDcEMsTUFBTSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUMxQixJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7UUFDWCxPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVELE9BQU8sS0FBSyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUM7QUFDL0IsQ0FBQztBQVBELGdDQU9DO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsU0FBUyxRQUFRLENBQUMsS0FBYSxFQUFFLEtBQWE7SUFDMUMsSUFBSSxLQUFLLElBQUksS0FBSyxFQUFFO1FBQ2hCLE9BQU8sQ0FBQyxDQUFDO0tBQ1o7SUFFRCxPQUFPLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQVMsR0FBRyxDQUFDLEtBQWdCO0lBQ3pCLElBQUksMkJBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDOUQsT0FBTyxlQUFlLENBQUM7S0FDMUI7SUFFRCxPQUFPLGVBQWUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQy9ELENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxTQUFTLFlBQVksQ0FBQyxLQUFhLEVBQUUsS0FBZ0I7SUFDakQsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFN0MsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1FBQ1osT0FBTyxRQUFRLENBQUM7S0FDbkI7SUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEI7SUFFRCxPQUFPLFFBQVEsQ0FBQztBQUNwQixDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILFNBQVMsVUFBVSxDQUFDLEtBQWEsRUFBRSxLQUFnQixFQUFFLEtBQWE7SUFDOUQsUUFBUSxLQUFLLEVBQUU7UUFDWCxLQUFLLENBQUM7WUFDRixPQUFPLENBQUMsQ0FBQztRQUNiO1lBQ0ksZ0RBQWdEO1lBQ2hELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ3BDLGdEQUFnRDtZQUNoRCxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDUCxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUNULENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNWO1lBRUQsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixLQUFLLEVBQUUsQ0FBQztZQUVSLE9BQU8sQ0FBQyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ2hEO0FBQ0wsQ0FBQyJ9