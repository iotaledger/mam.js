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
let HammingDiver = /** @class */ (() => {
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
    return HammingDiver;
})();
exports.HammingDiver = HammingDiver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFtbWluZ0RpdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BlYXJsRGl2ZXIvaGFtbWluZ0RpdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhEQUFpQztBQUNqQywwQ0FBdUM7QUFDdkMsNENBQTZDO0FBRzdDOzs7R0FHRztBQUNIO0lBQUEsTUFBYSxZQUFZO1FBK0NyQjs7Ozs7OztXQU9HO1FBQ0ksTUFBTSxDQUFDLEtBQWdCLEVBQUUsYUFBcUIsRUFBRSxNQUFjLEVBQUUsTUFBYztZQUNqRixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMvQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxXQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsTUFBTSxDQUFDO1lBRXZELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUVkLE9BQU8sS0FBSyxLQUFLLENBQUMsRUFBRTtnQkFDaEIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDcEYsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsZUFBZSxDQUFDLEVBQUUsV0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztnQkFFaEcsTUFBTSxRQUFRLEdBQTJCO29CQUNyQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUU7b0JBQ3RCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtpQkFDM0IsQ0FBQztnQkFFRixJQUFJLENBQUMsU0FBUyxDQUFDLFFB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