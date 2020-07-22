"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HammingDiver = void 0;
const big_integer_1 = __importDefault(require("big-integer"));
const curl_1 = require("../signing/curl");
const pascal_1 = require("../utils/pascal");
/**
 * Class to perform Hamming calculation for nonce.
 * @private
 */
class HammingDiver {
    /**
     * Search for the nonce.
     * @param trits The trits to calculate the nonce.
     * @param securityLevel The security level to calculate at.
     * @param length The length of the data to search.
     * @param offset The offset to start the search.
     * @returns The trits of the nonce.
     */
    search(trits, securityLevel, length, offset) {
        const state = this.prepareTrits(trits, offset);
        let size = Math.min(length, curl_1.Curl.HASH_LENGTH) - offset;
        let index = 0;
        while (index === 0) {
            const incrementResult = this.increment(state, offset + size * 2 / 3, offset + size);
            size = Math.min(pascal_1.roundThird(offset + size * 2 / 3 + incrementResult), curl_1.Curl.HASH_LENGTH) - offset;
            const curlCopy = {
                low: state.low.slice(),
                high: state.high.slice()
            };
            this.transform(curlCopy);
            index = this.check(securityLevel, curlCopy.low, curlCopy.high);
        }
        return this.trinaryGet(state.low, state.high, size, index);
    }
    /**
     * Prepare the trits for calculation.
     * @param trits The trits.
     * @param offset The offset to start.
     * @returns The prepared trits.
     */
    prepareTrits(trits, offset) {
        const initialState = this.tritsToBigInt(trits, curl_1.Curl.STATE_LENGTH);
        initialState.low[offset] = HammingDiver.LOW_0;
        initialState.low[offset + 1] = HammingDiver.LOW_1;
        initialState.low[offset + 2] = HammingDiver.LOW_2;
        initialState.low[offset + 3] = HammingDiver.LOW_3;
        initialState.high[offset] = HammingDiver.HIGH_0;
        initialState.high[offset + 1] = HammingDiver.HIGH_1;
        initialState.high[offset + 2] = HammingDiver.HIGH_2;
        initialState.high[offset + 3] = HammingDiver.HIGH_3;
        return initialState;
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
            if ((high.and(low.not())).equals(0)) {
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
                low: searchStates.low.slice(0, curl_1.Curl.STATE_LENGTH),
                high: searchStates.high.slice(0, curl_1.Curl.STATE_LENGTH)
            };
            for (let stateIndex = 0; stateIndex < curl_1.Curl.STATE_LENGTH; stateIndex++) {
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
     * @param securityLevel The security level to check.
     * @param low The low bits.
     * @param high The high bits.
     * @returns The nonce if found.
     */
    check(securityLevel, low, high) {
        for (let i = 0; i < 64; i++) {
            let sum = 0;
            for (let j = 0; j < securityLevel; j++) {
                for (let k = j * 243 / 3; k < (j + 1) * 243 / 3; k++) {
                    const bIndex = big_integer_1.default(1).shiftLeft(i);
                    if (low[k].and(bIndex).equals(0)) {
                        sum--;
                    }
                    else if (high[k].and(bIndex).equals(0)) {
                        sum++;
                    }
                }
                if (sum === 0 && j < securityLevel - 1) {
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
     * Get data from the tinary bits.
     * @param low The low bits.
     * @param high The high bits.
     * @param arrLength The array length to get from.
     * @param index The index to get the values.
     * @returns The values stored at the index.
     */
    trinaryGet(low, high, arrLength, index) {
        const result = new Int8Array(arrLength);
        for (let i = 0; i < arrLength; i++) {
            const bIndex = big_integer_1.default(index);
            const l = low[i].shiftRight(bIndex).and(1);
            const h = high[i].shiftRight(bIndex).and(1);
            if (l.equals(1) && h.equals(0)) {
                result[i] = -1;
            }
            else if (l.equals(0) && h.equals(1)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFtbWluZ0RpdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BlYXJsRGl2ZXIvaGFtbWluZ0RpdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhEQUFpQztBQUNqQywwQ0FBdUM7QUFDdkMsNENBQTZDO0FBRzdDOzs7R0FHRztBQUNILE1BQWEsWUFBWTtJQStDckI7Ozs7Ozs7T0FPRztJQUNJLE1BQU0sQ0FBQyxLQUFnQixFQUFFLGFBQXFCLEVBQUUsTUFBYyxFQUFFLE1BQWM7UUFDakYsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsV0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUV2RCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFFZCxPQUFPLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDaEIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNwRixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxlQUFlLENBQUMsRUFBRSxXQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsTUFBTSxDQUFDO1lBRWhHLE1BQU0sUUFBUSxHQUEyQjtnQkFDckMsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFO2dCQUN0QixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7YUFDM0IsQ0FBQztZQUVGLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENB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