/**
 * Helper functions for use with text.
 */
export declare class TextHelper {
    /**
     * Encode Non ASCII characters to escaped characters.
     * @param value The value to encode.
     * @returns The encoded value.
     */
    static encodeNonASCII(value: string | undefined): string | undefined;
    /**
     * Decode escaped Non ASCII characters.
     * @param value The value to decode.
     * @returns The decoded value.
     */
    static decodeNonASCII(value: string | undefined): string | undefined;
}
