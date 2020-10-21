import { TextHelper } from "./textHelper";

/**
 * Helper functions for use with trytes.
 */
export class TrytesHelper {
    /**
     * All the characters that can be used in trytes.
     */
    public static ALPHABET: string = "9ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    /**
     * Trytes to trits lookup table.
     * @internal
     */
    private static readonly TRYTES_TRITS: Int8Array[] = [
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

    /**
     * Is the string trytes length 81.
     * @param trytes The trytes to test.
     * @returns True if it is trytes 81 chars long.
     */
    public static isHash(trytes: string): boolean {
        return /^[9A-Z]{81}$/.test(trytes);
    }

    /**
     * Is the string trytes length 27.
     * @param trytes The trytes to test.
     * @returns True if it is trytes 27 chars long.
     */
    public static isTag(trytes: string): boolean {
        return /^[9A-Z]{27}$/.test(trytes);
    }

    /**
     * Is the string trytes of any length.
     * @param trytes The trytes to test.
     * @returns True if it is trytes.
     */
    public static isTrytes(trytes: string): boolean {
        return /^[9A-Z]+$/.test(trytes);
    }

    /**
     * Create a trits array from trytes.
     * @param value Trytes used to create trits.
     * @returns The trits array.
     */
    public static toTrits(value: string): Int8Array {
        const trits: Int8Array = new Int8Array(value.length * 3);

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
    public static fromTrits(trits: Int8Array): string {
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
    public static tritsValue(trits: Int8Array): number {
        let value = 0;

        for (let i = trits.length - 1; i >= 0; i--) {
            value = (value * 3) + trits[i];
        }

        return value;
    }

    /**
     * Convert a string value into trytes.
     * @param value value to convert into trytes.
     * @returns The trytes representation of the value.
     */
    public static fromAscii(value: string): string {
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
     * @param trytes to convert into a string value.
     * @returns The string value converted from the trytes.
     */
    public static toAscii(trytes: string): string {
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
    public static objectToTrytes(obj: unknown): string {
        const json = JSON.stringify(obj);
        const encoded = TextHelper.encodeNonASCII(json);
        return encoded ? TrytesHelper.fromAscii(encoded) : "";
    }

    /**
     * Convert an object from Trytes.
     * @param trytes The trytes to decode.
     * @returns The decoded object.
     */
    public static objectFromTrytes<T>(trytes: string): T | undefined {
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
        return json ? JSON.parse(json) as T : undefined;
    }

    /**
     * Convert a string to Trytes.
     * @param str The string to encode.
     * @returns The encoded trytes value.
     */
    public static stringToTrytes(str: string): string {
        const encoded = TextHelper.encodeNonASCII(str);
        return encoded ? TrytesHelper.fromAscii(encoded) : "";
    }

    /**
     * Convert a string from Trytes.
     * @param trytes The trytes to decode.
     * @returns The decoded string.
     */
    public static stringFromTrytes(trytes: string): string | undefined {
        // Trim trailing 9s
        let trimmed = trytes.replace(/\9+$/, "");

        // And make sure it is even length (2 trytes per ascii char)
        if (trimmed.length % 2 === 1) {
            trimmed += "9";
        }

        const ascii = TrytesHelper.toAscii(trimmed);

        return TextHelper.decodeNonASCII(ascii);
    }
}
