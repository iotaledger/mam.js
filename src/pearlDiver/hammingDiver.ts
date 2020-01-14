import bigInt from "big-integer";
import { Curl } from "../signing/curl";
import { roundThird } from "../utils/pascal";
import { PearlDiverSearchStates } from "./pearlDiverSearchStates";

/**
 * Class to perform Hamming calculation for nonce.
 * @private
 */
export class HammingDiver {
    /**
     * Max 64 bit value.
     */
    private static readonly MAX_VALUE: bigInt.BigInteger = bigInt("FFFFFFFFFFFFFFFF", 16);
    /**
     * Min 64 bit value.
     */
    private static readonly MIN_VALUE: bigInt.BigInteger = bigInt("0000000000000000", 16);

    /**
     * High 0
     */
    private static readonly HIGH_0: bigInt.BigInteger = bigInt("B6DB6DB6DB6DB6DB", 16);
    /**
     * High 1
     */
    private static readonly HIGH_1: bigInt.BigInteger = bigInt("8FC7E3F1F8FC7E3F", 16);
    /**
     * High 2
     */
    private static readonly HIGH_2: bigInt.BigInteger = bigInt("FFC01FFFF803FFFF", 16);
    /**
     * High 3
     */
    private static readonly HIGH_3: bigInt.BigInteger = bigInt("003FFFFFFFFFFFFF", 16);
    /**
     * Low 0
     */
    private static readonly LOW_0: bigInt.BigInteger = bigInt("DB6DB6DB6DB6DB6D", 16);
    /**
     * Low 1
     */
    private static readonly LOW_1: bigInt.BigInteger = bigInt("F1F8FC7E3F1F8FC7", 16);
    /**
     * Low 2
     */
    private static readonly LOW_2: bigInt.BigInteger = bigInt("7FFFE00FFFFC01FF", 16);
    /**
     * Low 3
     */
    private static readonly LOW_3: bigInt.BigInteger = bigInt("FFC0000007FFFFFF", 16);
    /**
     * Number of rounds
     */
    private static readonly ROUNDS: number = 27;

    /**
     * Search for the nonce.
     * @param trits The trits to calculate the nonce.
     * @param securityLevel The security level to calculate at.
     * @param length The length of the data to search.
     * @param offset The offset to start the search.
     * @returns The trits of the nonce.
     */
    public search(trits: Int8Array, securityLevel: number, length: number, offset: number): Int8Array {
        const state = this.prepareTrits(trits, offset);
        let size = Math.min(length, Curl.HASH_LENGTH) - offset;

        let index = 0;

        while (index === 0) {
            const incrementResult = this.increment(state, offset + size * 2 / 3, offset + size);
            size = Math.min(roundThird(offset + size * 2 / 3 + incrementResult), Curl.HASH_LENGTH) - offset;

            const curlCopy: PearlDiverSearchStates = {
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
    private prepareTrits(trits: Int8Array, offset: number): PearlDiverSearchStates {
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
    private tritsToBigInt(input: Int8Array, length: number): PearlDiverSearchStates {
        const result: PearlDiverSearchStates = {
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
    private increment(states: PearlDiverSearchStates, fromIndex: number, toIndex: number): number {
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
    private transform(searchStates: PearlDiverSearchStates): void {
        let curlScratchpadIndex = 0;
        for (let round = 0; round < HammingDiver.ROUNDS; round++) {
            const curlScratchpad: PearlDiverSearchStates = {
                low: searchStates.low.slice(0, Curl.STATE_LENGTH),
                high: searchStates.high.slice(0, Curl.STATE_LENGTH)
            };

            for (let stateIndex = 0; stateIndex < Curl.STATE_LENGTH; stateIndex++) {
                const alpha = curlScratchpad.low[curlScratchpadIndex];
                const beta = curlScratchpad.high[curlScratchpadIndex];
                if (curlScratchpadIndex < 365) {
                    curlScratchpadIndex += 364;
                } else {
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
    private bitWiseNot(value: bigInt.BigInteger): bigInt.BigInteger {
        return bigInt(1).shiftLeft(64).subtract(bigInt(1)).subtract(value);
    }

    /**
     * Check if we have found the nonce.
     * @param securityLevel The security level to check.
     * @param low The low bits.
     * @param high The high bits.
     * @returns The nonce if found.
     */
    private check(
        securityLevel: number, low: bigInt.BigInteger[], high: bigInt.BigInteger[]): number {

        for (let i = 0; i < 64; i++) {
            let sum = 0;

            for (let j = 0; j < securityLevel; j++) {
                for (let k = j * 243 / 3; k < (j + 1) * 243 / 3; k++) {
                    const bIndex = bigInt(1).shiftLeft(i);

                    if (low[k].and(bIndex).equals(0)) {
                        sum--;
                    } else if (high[k].and(bIndex).equals(0)) {
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
    private trinaryGet(
        low: bigInt.BigInteger[], high: bigInt.BigInteger[], arrLength: number, index: number): Int8Array {
        const result: Int8Array = new Int8Array(arrLength);

        for (let i = 0; i < arrLength; i++) {
            const bIndex = bigInt(index);
            const l = low[i].shiftRight(bIndex).and(1);
            const h = high[i].shiftRight(bIndex).and(1);

            if (l.equals(1) && h.equals(0)) {
                result[i] = -1;
            } else if (l.equals(0) && h.equals(1)) {
                result[i] = 1;
            } else {
                result[i] = 0;
            }
        }

        return result;
    }
}
