"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const big_integer_1 = __importDefault(require("big-integer"));
const curl_1 = require("../signing/curl");
const pascal_1 = require("../utils/pascal");
/**
 * Class to perform Hamming calculation for nonce.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFtbWluZ0RpdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BlYXJsRGl2ZXIvaGFtbWluZ0RpdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQWlDO0FBQ2pDLDBDQUF1QztBQUN2Qyw0Q0FBNkM7QUFHN0M7O0dBRUc7QUFDSCxNQUFhLFlBQVk7SUErQ3JCOzs7Ozs7O09BT0c7SUFDSSxNQUFNLENBQUMsS0FBZ0IsRUFBRSxhQUFxQixFQUFFLE1BQWMsRUFBRSxNQUFjO1FBQ2pGLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFdBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxNQUFNLENBQUM7UUFFdkQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBRWQsT0FBTyxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ2hCLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDcEYsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsZUFBZSxDQUFDLEVBQUUsV0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUVoRyxNQUFNLFFBQVEsR0FBMkI7Z0JBQ3JDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRTtnQkFDdEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2FBQzNCLENBQUM7WUFFRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFD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