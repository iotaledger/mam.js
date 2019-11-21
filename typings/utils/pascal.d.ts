/**
 * Perform pascal encoding of the value.
 * @param value The value to encode.
 * @returns The trits for the encoded value.
 */
export declare function pascalEncode(value: number): Int8Array;
/**
 * Decode the pascal encoded trits.
 * @param value The value to decode.
 * @returns The decoded value.
 */
export declare function pascalDecode(value: Int8Array): {
    /**
     * The value from the decode.
     */
    value: number;
    /**
     * The end of the input.
     */
    end: number;
};
/**
 * Round the number to the third.
 * @param value The value to round.
 * @returns The rounded number.
 */
export declare function roundThird(value: number): number;
