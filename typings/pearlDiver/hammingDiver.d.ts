/**
 * Class to perform Hamming calculation for nonce.
 * @private
 */
export declare class HammingDiver {
    /**
     * Max 64 bit value.
     */
    private static readonly MAX_VALUE;
    /**
     * Min 64 bit value.
     */
    private static readonly MIN_VALUE;
    /**
     * High 0
     */
    private static readonly HIGH_0;
    /**
     * High 1
     */
    private static readonly HIGH_1;
    /**
     * High 2
     */
    private static readonly HIGH_2;
    /**
     * High 3
     */
    private static readonly HIGH_3;
    /**
     * Low 0
     */
    private static readonly LOW_0;
    /**
     * Low 1
     */
    private static readonly LOW_1;
    /**
     * Low 2
     */
    private static readonly LOW_2;
    /**
     * Low 3
     */
    private static readonly LOW_3;
    /**
     * Number of rounds
     */
    private static readonly ROUNDS;
    /**
     * Search for the nonce.
     * @param trits The trits to calculate the nonce.
     * @param securityLevel The security level to calculate at.
     * @param length The length of the data to search.
     * @param offset The offset to start the search.
     * @returns The trits of the nonce.
     */
    search(trits: Int8Array, securityLevel: number, length: number, offset: number): Int8Array;
    /**
     * Prepare the trits for calculation.
     * @param trits The trits.
     * @param offset The offset to start.
     * @returns The prepared trits.
     */
    private prepareTrits;
    /**
     * Convert the trits to bigint form.
     * @param input The input trits.
     * @param length The length of the input.
     * @returns The trits in big int form.
     */
    private tritsToBigInt;
    /**
     * Increment the state values.
     * @param states The state to increment.
     * @param fromIndex The index to start from.
     * @param toIndex The index to end at,
     * @returns The increment length.
     */
    private increment;
    /**
     * Transform the states.
     * @param searchStates The states to transform.
     */
    private transform;
    /**
     * Perform a bitwise not for 64 bit, not twos complement.
     * @param value The value to bitwise not.
     * @returns The bitwise not of the value.
     */
    private bitWiseNot;
    /**
     * Check if we have found the nonce.
     * @param securityLevel The security level to check.
     * @param low The low bits.
     * @param high The high bits.
     * @returns The nonce if found.
     */
    private check;
    /**
     * Get data from the tinary bits.
     * @param low The low bits.
     * @param high The high bits.
     * @param arrLength The array length to get from.
     * @param index The index to get the values.
     * @returns The values stored at the index.
     */
    private trinaryGet;
}
