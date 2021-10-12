// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Curl } from "@iota/crypto.js";
import bigInt from "big-integer";
import { roundThird } from "../utils/pascal";
/**
 * Class to perform Hamming calculation for nonce.
 * @internal
 */
export class HammingDiver {
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
        let size = Math.min(length, Curl.HASH_LENGTH) - offset;
        let index = 0;
        while (index === 0) {
            const incrementResult = this.increment(state, offset + (size * 2 / 3), offset + size);
            size = Math.min(roundThird(offset + (size * 2 / 3) + incrementResult), Curl.HASH_LENGTH) - offset;
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
        const initialState = this.tritsToBigInt(trits, Curl.STATE_LENGTH);
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
     * @param toIndex The index to end at.
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
                low: searchStates.low.slice(0, Curl.STATE_LENGTH),
                high: searchStates.high.slice(0, Curl.STATE_LENGTH)
            };
            for (let stateIndex = 0; stateIndex < Curl.STATE_LENGTH; stateIndex++) {
                const alpha = curlScratchpad.low[curlScratchpadIndex];
                const beta = curlScratchpad.high[curlScratchpadIndex];
                curlScratchpadIndex += curlScratchpadIndex < 365 ? 364 : -365;
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
        return bigInt(1).shiftLeft(64)
            .subtract(bigInt(1))
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
                    const bIndex = bigInt(1).shiftLeft(i);
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
            const bIndex = bigInt(index);
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
HammingDiver.MAX_VALUE = bigInt("FFFFFFFFFFFFFFFF", 16);
/**
 * Min 64 bit value.
 */
HammingDiver.MIN_VALUE = bigInt("0000000000000000", 16);
/**
 * High 0.
 */
HammingDiver.HIGH_0 = bigInt("B6DB6DB6DB6DB6DB", 16);
/**
 * High 1.
 */
HammingDiver.HIGH_1 = bigInt("8FC7E3F1F8FC7E3F", 16);
/**
 * High 2.
 */
HammingDiver.HIGH_2 = bigInt("FFC01FFFF803FFFF", 16);
/**
 * High 3.
 */
HammingDiver.HIGH_3 = bigInt("003FFFFFFFFFFFFF", 16);
/**
 * Low 0.
 */
HammingDiver.LOW_0 = bigInt("DB6DB6DB6DB6DB6D", 16);
/**
 * Low 1.
 */
HammingDiver.LOW_1 = bigInt("F1F8FC7E3F1F8FC7", 16);
/**
 * Low 2.
 */
HammingDiver.LOW_2 = bigInt("7FFFE00FFFFC01FF", 16);
/**
 * Low 3.
 */
HammingDiver.LOW_3 = bigInt("FFC0000007FFFFFF", 16);
/**
 * Number of rounds.
 */
HammingDiver.ROUNDS = 27;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFtbWluZ0RpdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BlYXJsRGl2ZXIvaGFtbWluZ0RpdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUNqQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHN0M7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLFlBQVk7SUF3RHJCOzs7Ozs7O09BT0c7SUFDSSxNQUFNLENBQUMsS0FBZ0IsRUFBRSxhQUFxQixFQUFFLE1BQWMsRUFBRSxNQUFjO1FBQ2pGLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxNQUFNLENBQUM7UUFFdkQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBRWQsT0FBTyxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ2hCLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3RGLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxNQUFNLENBQUM7WUFFbEcsTUFBTSxRQUFRLEdBQTJCO2dCQUNyQyxHQUFHLEVBQUUsS0FB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