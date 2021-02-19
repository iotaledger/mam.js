/**
 * Helper functions for use with trytes.
 */
export declare class TrytesHelper {
    /**
     * All the characters that can be used in trytes.
     */
    static ALPHABET: string;
    /**
     * Is the string trytes length 81.
     * @param trytes The trytes to test.
     * @returns True if it is trytes 81 chars long.
     */
    static isHash(trytes: string): boolean;
    /**
     * Is the string trytes length 27.
     * @param trytes The trytes to test.
     * @returns True if it is trytes 27 chars long.
     */
    static isTag(trytes: string): boolean;
    /**
     * Is the string trytes of any length.
     * @param trytes The trytes to test.
     * @returns True if it is trytes.
     */
    static isTrytes(trytes: string): boolean;
    /**
     * Create a trits array from trytes.
     * @param value Trytes used to create trits.
     * @returns The trits array.
     */
    static toTrits(value: string): Int8Array;
    /**
     * Get trytes from trits array.
     * @param trits The trits to convert to trytes.
     * @returns Trytes.
     */
    static fromTrits(trits: Int8Array): string;
    /**
     * Convert trits to an integer.
     * @param trits The trits to convert.
     * @returns The trits converted to number.
     */
    static tritsValue(trits: Int8Array): number;
    /**
     * Convert a string value into trytes.
     * @param value value to convert into trytes.
     * @returns The trytes representation of the value.
     */
    static fromAscii(value: string): string;
    /**
     * Convert trytes into a string value.
     * @param trytes to convert into a string value.
     * @returns The string value converted from the trytes.
     */
    static toAscii(trytes: string): string;
    /**
     * Convert an object to Trytes.
     * @param obj The obj to encode.
     * @returns The encoded trytes value.
     */
    static objectToTrytes(obj: unknown): string;
    /**
     * Convert an object from Trytes.
     * @param trytes The trytes to decode.
     * @returns The decoded object.
     */
    static objectFromTrytes<T>(trytes: string): T | undefined;
    /**
     * Convert a string to Trytes.
     * @param str The string to encode.
     * @returns The encoded trytes value.
     */
    static stringToTrytes(str: string): string;
    /**
     * Convert a string from Trytes.
     * @param trytes The trytes to decode.
     * @returns The decoded string.
     */
    static stringFromTrytes(trytes: string): string | undefined;
    /**
     * Pack trytes into bytes
     * @param trytes The trytes to pack.
     * @returns The packed trytes.
     */
    static packTrytes(trytes: string): Uint8Array;
    /**
     * Unpack bytes into trytes
     * @param packed The packed trytes to unpack.
     * @returns The unpacked trytes.
     */
    static unpackTrytes(packed: Uint8Array): string;
}
