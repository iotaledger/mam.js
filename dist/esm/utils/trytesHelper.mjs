// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter } from "@iota/iota.js";
import { TextHelper } from "./textHelper.mjs";
/**
 * Helper functions for use with trytes.
 */
export class TrytesHelper {
    /**
     * Is the string trytes length 81.
     * @param trytes The trytes to test.
     * @returns True if it is trytes 81 chars long.
     */
    static isHash(trytes) {
        return /^[9A-Z]{81}$/.test(trytes);
    }
    /**
     * Is the string trytes length 27.
     * @param trytes The trytes to test.
     * @returns True if it is trytes 27 chars long.
     */
    static isTag(trytes) {
        return /^[9A-Z]{27}$/.test(trytes);
    }
    /**
     * Is the string trytes of any length.
     * @param trytes The trytes to test.
     * @returns True if it is trytes.
     */
    static isTrytes(trytes) {
        return /^[9A-Z]+$/.test(trytes);
    }
    /**
     * Create a trits array from trytes.
     * @param value Trytes used to create trits.
     * @returns The trits array.
     */
    static toTrits(value) {
        const trits = new Int8Array(value.length * 3);
        for (let i = 0; i < value.length; i++) {
            const idx = TrytesHelper.ALPHABET.indexOf(value.charAt(i));
            trits[i * 3] = TrytesHelper.TRYTES_TRITS[idx][0];
            trits[(i * 3) + 1] = TrytesHelper.TRYTES_TRITS[idx][1];
            trits[(i * 3) + 2] = TrytesHelper.TRYTES_TRITS[idx][2];
        }
        return trits;
    }
    /**
     * Get trytes from trits array.
     * @param trits The trits to convert to trytes.
     * @returns Trytes.
     */
    static fromTrits(trits) {
        let trytes = "";
        for (let i = 0; i < trits.length; i += 3) {
            // Iterate over all possible tryte values to find correct trit representation
            for (let j = 0; j < TrytesHelper.ALPHABET.length; j++) {
                if (TrytesHelper.TRYTES_TRITS[j][0] === trits[i] &&
                    TrytesHelper.TRYTES_TRITS[j][1] === trits[i + 1] &&
                    TrytesHelper.TRYTES_TRITS[j][2] === trits[i + 2]) {
                    trytes += TrytesHelper.ALPHABET.charAt(j);
                    break;
                }
            }
        }
        return trytes;
    }
    /**
     * Convert trits to an integer.
     * @param trits The trits to convert.
     * @returns The trits converted to number.
     */
    static tritsValue(trits) {
        let value = 0;
        for (let i = trits.length - 1; i >= 0; i--) {
            value = (value * 3) + trits[i];
        }
        return value;
    }
    /**
     * Convert a string value into trytes.
     * @param value The value to convert into trytes.
     * @returns The trytes representation of the value.
     */
    static fromAscii(value) {
        let trytes = "";
        for (let i = 0; i < value.length; i++) {
            const asciiValue = value.charCodeAt(i);
            const firstValue = asciiValue % 27;
            const secondValue = (asciiValue - firstValue) / 27;
            trytes += TrytesHelper.ALPHABET[firstValue] + TrytesHelper.ALPHABET[secondValue];
        }
        return trytes;
    }
    /**
     * Convert trytes into a string value.
     * @param trytes The trytes to convert into a string value.
     * @returns The string value converted from the trytes.
     */
    static toAscii(trytes) {
        const trytesString = trytes;
        if (trytesString.length % 2 === 1) {
            throw new Error("The trytes length must be an even number");
        }
        let ascii = "";
        for (let i = 0; i < trytesString.length; i += 2) {
            const firstValue = TrytesHelper.ALPHABET.indexOf(trytesString[i]);
            const secondValue = TrytesHelper.ALPHABET.indexOf(trytesString[i + 1]);
            const decimalValue = firstValue + (secondValue * 27);
            ascii += String.fromCharCode(decimalValue);
        }
        return ascii;
    }
    /**
     * Convert an object to Trytes.
     * @param obj The obj to encode.
     * @returns The encoded trytes value.
     */
    static objectToTrytes(obj) {
        const json = JSON.stringify(obj);
        const encoded = TextHelper.encodeNonASCII(json);
        return encoded ? TrytesHelper.fromAscii(encoded) : "";
    }
    /**
     * Convert an object from Trytes.
     * @param trytes The trytes to decode.
     * @returns The decoded object.
     */
    static objectFromTrytes(trytes) {
        if (typeof (trytes) !== "string") {
            throw new TypeError("fromTrytes can only convert strings");
        }
        // Trim trailing 9s
        const trimmed = trytes.replace(/\9+$/, "");
        if (trimmed.length === 0) {
            throw new Error("fromTrytes trytes does not contain any data");
        }
        const ascii = TrytesHelper.toAscii(trimmed);
        const json = TextHelper.decodeNonASCII(ascii);
        return json ? JSON.parse(json) : undefined;
    }
    /**
     * Convert a string to Trytes.
     * @param str The string to encode.
     * @returns The encoded trytes value.
     */
    static stringToTrytes(str) {
        const encoded = TextHelper.encodeNonASCII(str);
        return encoded ? TrytesHelper.fromAscii(encoded) : "";
    }
    /**
     * Convert a string from Trytes.
     * @param trytes The trytes to decode.
     * @returns The decoded string.
     */
    static stringFromTrytes(trytes) {
        // Trim trailing 9s
        let trimmed = trytes.replace(/\9+$/, "");
        // And make sure it is even length (2 trytes per ascii char)
        if (trimmed.length % 2 === 1) {
            trimmed += "9";
        }
        const ascii = TrytesHelper.toAscii(trimmed);
        return TextHelper.decodeNonASCII(ascii);
    }
    /**
     * Pack trytes into bytes.
     * @param trytes The trytes to pack.
     * @returns The packed trytes.
     */
    static packTrytes(trytes) {
        const trytesBits = [];
        for (const tryte of trytes) {
            trytesBits.push(TrytesHelper
                .ALPHABET
                .indexOf(tryte)
                .toString(2)
                .padStart(5, "0"));
        }
        let allBits = trytesBits.join("");
        const remainder = allBits.length % 8;
        if (remainder > 0) {
            allBits += "1".repeat(8 - remainder);
        }
        return Converter.binaryToBytes(allBits);
    }
    /**
     * Unpack bytes into trytes.
     * @param packed The packed trytes to unpack.
     * @returns The unpacked trytes.
     */
    static unpackTrytes(packed) {
        const allBits = Converter.bytesToBinary(packed);
        const trytes = [];
        for (let i = 0; i < allBits.length; i += 5) {
            const charBits = allBits.slice(i, i + 5);
            if (charBits.length < 5 || charBits === "111111") {
                break;
            }
            trytes.push(TrytesHelper.ALPHABET[Number.parseInt(charBits, 2)]);
        }
        return trytes.join("");
    }
}
/**
 * All the characters that can be used in trytes.
 */
TrytesHelper.ALPHABET = "9ABCDEFGHIJKLMNOPQRSTUVWXYZ";
/**
 * Trytes to trits lookup table.
 * @internal
 */
TrytesHelper.TRYTES_TRITS = [
    new Int8Array([0, 0, 0]),
    new Int8Array([1, 0, 0]),
    new Int8Array([-1, 1, 0]),
    new Int8Array([0, 1, 0]),
    new Int8Array([1, 1, 0]),
    new Int8Array([-1, -1, 1]),
    new Int8Array([0, -1, 1]),
    new Int8Array([1, -1, 1]),
    new Int8Array([-1, 0, 1]),
    new Int8Array([0, 0, 1]),
    new Int8Array([1, 0, 1]),
    new Int8Array([-1, 1, 1]),
    new Int8Array([0, 1, 1]),
    new Int8Array([1, 1, 1]),
    new Int8Array([-1, -1, -1]),
    new Int8Array([0, -1, -1]),
    new Int8Array([1, -1, -1]),
    new Int8Array([-1, 0, -1]),
    new Int8Array([0, 0, -1]),
    new Int8Array([1, 0, -1]),
    new Int8Array([-1, 1, -1]),
    new Int8Array([0, 1, -1]),
    new Int8Array([1, 1, -1]),
    new Int8Array([-1, -1, 0]),
    new Int8Array([0, -1, 0]),
    new Int8Array([1, -1, 0]),
    new Int8Array([-1, 0, 0])
];
