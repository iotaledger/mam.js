"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const curl_1 = __importDefault(require("@iota/curl"));
const big_integer_1 = __importDefault(require("big-integer"));
const curlHelper_1 = require("../utils/curlHelper");
const pascal_1 = require("../utils/pascal");
/**
 * Class to perform Hamming calculation for nonce.
 */
class HammingDiver {
    /**
     * Search for the nonce.
     * @param trits The trits to calculate the nonce.
     * @param mwm The security level to calculate at.
     * @param length The length of the data to search.
     * @param offset The offset to start the search.
     * @returns The trits of the nonce.
     */
    search(trits, mwm, length, offset) {
        const ulongTrits = this.prepareTrits(trits, offset);
        const curl = {
            low: ulongTrits.low,
            high: ulongTrits.high
        };
        let size = Math.min(length, curl_1.default.HASH_LENGTH) - offset;
        let index = 0;
        while (index === 0) {
            const incrementResult = this.increment(curl, offset + size * 2 / 3, offset + size);
            size = Math.min(pascal_1.roundThird(offset + size * 2 / 3 + incrementResult), curl_1.default.HASH_LENGTH) - offset;
            const curlCopy = {
                low: curl.low.slice(),
                high: curl.high.slice()
            };
            this.transform(curlCopy);
            index = this.check(mwm, curlCopy.low.slice(0, curl_1.default.HASH_LENGTH), curlCopy.high.slice(0, curl_1.default.HASH_LENGTH));
        }
        return this.trinaryGet(curl.low.slice(0, size), curl.high.slice(0, size), index);
    }
    /**
     * Prepare the trits for calculation.
     * @param trits The trits.
     * @param offset The offset to start.
     * @returns The prepared trits.
     */
    prepareTrits(trits, offset) {
        const ulongTrits = this.tritsToBigInt(trits, curlHelper_1.STATE_LENGTH);
        ulongTrits.low[offset] = HammingDiver.LOW_0;
        ulongTrits.low[offset + 1] = HammingDiver.LOW_1;
        ulongTrits.low[offset + 2] = HammingDiver.LOW_2;
        ulongTrits.low[offset + 3] = HammingDiver.LOW_3;
        ulongTrits.high[offset] = HammingDiver.HIGH_0;
        ulongTrits.high[offset + 1] = HammingDiver.HIGH_1;
        ulongTrits.high[offset + 2] = HammingDiver.HIGH_2;
        ulongTrits.high[offset + 3] = HammingDiver.HIGH_3;
        return ulongTrits;
    }
    /**
     * Convert the trits to bigint form.
     * @param input The input trits.
     * @param length The length of the input.
     * @returns The trits in big int form.
     */
    tritsToBigInt(input, length) {
        const result = {
            low: [],
            high: []
        };
        for (let i = 0; i < input.length; i++) {
            switch (input[i]) {
                case 0:
                    result.low[i] = HammingDiver.MAX_VALUE;
                    result.high[i] = HammingDiver.MAX_VALUE;
                    break;
                case 1:
                    result.low[i] = HammingDiver.MIN_VALUE;
                    result.high[i] = HammingDiver.MAX_VALUE;
                    break;
                default:
                    result.low[i] = HammingDiver.MAX_VALUE;
                    result.high[i] = HammingDiver.MIN_VALUE;
                    break;
            }
        }
        if (input.length >= length) {
            return result;
        }
        for (let i = input.length; i < length; i++) {
            result.low[i] = HammingDiver.MAX_VALUE;
            result.high[i] = HammingDiver.MAX_VALUE;
        }
        return result;
    }
    /**
     * Increment the state values.
     * @param states The state to increment.
     * @param fromIndex The index to start from.
     * @param toIndex The index to end at,
     * @returns The increment length.
     */
    increment(states, fromIndex, toIndex) {
        for (let i = fromIndex; i < toIndex; i++) {
            const low = states.low[i];
            const high = states.high[i];
            states.low[i] = high.xor(low);
            states.high[i] = low;
            if ((high.and(low.not())).toJSNumber() === 0) {
                return toIndex - fromIndex;
            }
        }
        return toIndex - fromIndex + 1;
    }
    /**
     * Transform the states.
     * @param searchStates The states to transform.
     */
    transform(searchStates) {
        let curlScratchpadIndex = 0;
        for (let round = 0; round < HammingDiver.ROUNDS; round++) {
            const curlScratchpad = {
                low: searchStates.low.slice(0, curlHelper_1.STATE_LENGTH),
                high: searchStates.high.slice(0, curlHelper_1.STATE_LENGTH)
            };
            for (let stateIndex = 0; stateIndex < curlHelper_1.STATE_LENGTH; stateIndex++) {
                const alpha = curlScratchpad.low[curlScratchpadIndex];
                const beta = curlScratchpad.high[curlScratchpadIndex];
                if (curlScratchpadIndex < 365) {
                    curlScratchpadIndex += 364;
                }
                else {
                    curlScratchpadIndex += -365;
                }
                const gamma = curlScratchpad.high[curlScratchpadIndex];
                const lowXorBeta = curlScratchpad.low[curlScratchpadIndex].xor(beta);
                const notGamma = this.bitWiseNot(gamma);
                const alphaOrNotGamma = alpha.or(notGamma);
                const delta = alphaOrNotGamma.and(lowXorBeta);
                searchStates.low[stateIndex] = this.bitWiseNot(delta);
                const alphaXorGamma = alpha.xor(gamma);
                searchStates.high[stateIndex] = alphaXorGamma.or(delta);
            }
        }
    }
    /**
     * Perform a bitwise not for 64 bit, not twos complement.
     * @param value The value to bitwise not.
     * @returns The bitwise not of the value.
     */
    bitWiseNot(value) {
        return big_integer_1.default(1).shiftLeft(64).subtract(big_integer_1.default(1)).subtract(value);
    }
    /**
     * Check if we have found the nonce.
     * @param mwm The mwm.
     * @param low The low bits.
     * @param high The high bits.
     * @returns The nonce if found.
     */
    check(mwm, low, high) {
        const trinaryLength = this.trinaryLength(low, high);
        for (let i = 0; i < trinaryLength; i++) {
            let sum = 0;
            for (let j = 0; j < mwm; j++) {
                const dmg = this.trinaryGet(low, high, i);
                sum += dmg.slice(j * curl_1.default.HASH_LENGTH / 3, (j + 1) * curl_1.default.HASH_LENGTH / 3).reduce((a, b) => a + b, 0);
                if (sum === 0 && j < mwm - 1) {
                    sum = 1;
                    break;
                }
            }
            if (sum === 0) {
                return i;
            }
        }
        return 0;
    }
    /**
     * Calculate the trinary length of the bit data.
     * @param low The low bits.
     * @param high The high bits.
     * @returns The length.
     */
    trinaryLength(low, high) {
        const l = low[0].toString(2).padStart(64, "0");
        const h = high[0].toString(2).padStart(64, "0");
        return 64 - Math.min(l.split("1")[0].length, h.split("1")[0].length);
    }
    /**
     * Get data from the tinary bits.
     * @param low The low bits.
     * @param high The high bits.
     * @param index The index to get the values.
     * @returns The values stored at the index.
     */
    trinaryGet(low, high, index) {
        const result = new Int8Array(low.length);
        for (let i = 0; i < low.length; i++) {
            const l = (low[i].shiftRight(big_integer_1.default(index))).and(1).toJSNumber();
            const h = (high[i].shiftRight(big_integer_1.default(index))).and(1).toJSNumber();
            if (l === 1 && h === 0) {
                result[i] = -1;
            }
            else if (l === 0 && h === 1) {
                result[i] = 1;
            }
            else {
                result[i] = 0;
            }
        }
        return result;
    }
}
exports.HammingDiver = HammingDiver;
/**
 * Max 64 bit value.
 */
HammingDiver.MAX_VALUE = big_integer_1.default("FFFFFFFFFFFFFFFF", 16);
/**
 * Min 64 bit value.
 */
HammingDiver.MIN_VALUE = big_integer_1.default("0000000000000000", 16);
/**
 * High 0
 */
HammingDiver.HIGH_0 = big_integer_1.default("B6DB6DB6DB6DB6DB", 16);
/**
 * High 1
 */
HammingDiver.HIGH_1 = big_integer_1.default("8FC7E3F1F8FC7E3F", 16);
/**
 * High 2
 */
HammingDiver.HIGH_2 = big_integer_1.default("FFC01FFFF803FFFF", 16);
/**
 * High 3
 */
HammingDiver.HIGH_3 = big_integer_1.default("003FFFFFFFFFFFFF", 16);
/**
 * Low 0
 */
HammingDiver.LOW_0 = big_integer_1.default("DB6DB6DB6DB6DB6D", 16);
/**
 * Low 1
 */
HammingDiver.LOW_1 = big_integer_1.default("F1F8FC7E3F1F8FC7", 16);
/**
 * Low 2
 */
HammingDiver.LOW_2 = big_integer_1.default("7FFFE00FFFFC01FF", 16);
/**
 * Low 3
 */
HammingDiver.LOW_3 = big_integer_1.default("FFC0000007FFFFFF", 16);
/**
 * Number of rounds
 */
HammingDiver.ROUNDS = 27;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFtbWluZ0RpdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BlYXJsRGl2ZXIvaGFtbWluZ0RpdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLDhEQUFpQztBQUNqQyxvREFBbUQ7QUFDbkQsNENBQTZDO0FBRzdDOztHQUVHO0FBQ0gsTUFBYSxZQUFZO0lBK0NyQjs7Ozs7OztPQU9HO0lBQ0ksTUFBTSxDQUFDLEtBQWdCLEVBQUUsR0FBVyxFQUFFLE1BQWMsRUFBRSxNQUFjO1FBQ3ZFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELE1BQU0sSUFBSSxHQUEyQjtZQUNqQyxHQUFHLEVBQUUsVUFBVSxDQUFDLEdBQUc7WUFDbkIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJO1NBQ3hCLENBQUM7UUFDRixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxjQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBRXZELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUVkLE9BQU8sS0FBSyxLQUFLLENBQUMsRUFBRTtZQUNoQixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ25GLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFVLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxFQUFFLGNBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxNQUFNLENBQUM7WUFFaEcsTUFBTSxRQUFRLEdBQTJCO2dCQUNyQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxL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