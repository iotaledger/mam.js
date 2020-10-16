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
            const incrementResult = this.increment(state, offset + (size * 2 / 3), offset + size);
            size = Math.min(pascal_1.roundThird(offset + (size * 2 / 3) + incrementResult), curl_1.Curl.HASH_LENGTH) - offset;
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return big_integer_1.default(1).shiftLeft(64)
            .subtract(big_integer_1.default(1))
            .subtract(value);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFtbWluZ0RpdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BlYXJsRGl2ZXIvaGFtbWluZ0RpdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhEQUFpQztBQUNqQywwQ0FBdUM7QUFDdkMsNENBQTZDO0FBRzdDOzs7R0FHRztBQUNILE1BQWEsWUFBWTtJQXdEckI7Ozs7Ozs7T0FPRztJQUNJLE1BQU0sQ0FBQyxLQUFnQixFQUFFLGFBQXFCLEVBQUUsTUFBYyxFQUFFLE1BQWM7UUFDakYsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsV0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUV2RCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFFZCxPQUFPLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDaEIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDdEYsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxFQUFFLFdBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxNQUFNLENBQUM7WUFFbEcsTUFBTSxRQUFRLEdBQTJCO2dCQUNyQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3RCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTthQUMzQixDQUFDO1lBRUYsSUFBSSxDQUFDLFNB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