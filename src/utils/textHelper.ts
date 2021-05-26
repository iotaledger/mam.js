// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * Helper functions for use with text.
 */
export class TextHelper {
    /**
     * Encode Non ASCII characters to escaped characters.
     * @param value The value to encode.
     * @returns The encoded value.
     */
    public static encodeNonASCII(value: string | undefined): string | undefined {
        return typeof value === "string"
            ? value.replace(/[\u007F-\uFFFF]/g, chr => `\\u${(`0000${chr.charCodeAt(0).toString(16)}`).slice(-4)}`)
            : undefined;
    }

    /**
     * Decode escaped Non ASCII characters.
     * @param value The value to decode.
     * @returns The decoded value.
     */
    public static decodeNonASCII(value: string | undefined): string | undefined {
        return typeof value === "string"
            ? value.replace(/\\u(\w{4})/gi, (match, grp) => String.fromCharCode(Number.parseInt(grp, 16)))
            : undefined;
    }
}
