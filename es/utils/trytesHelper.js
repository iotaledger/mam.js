"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrytesHelper = void 0;
const iota_js_1 = require("@iota/iota.js");
const textHelper_1 = require("./textHelper");
/**
 * Helper functions for use with trytes.
 */
class TrytesHelper {
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
     * @param value value to convert into trytes.
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
     * @param trytes to convert into a string value.
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
        const encoded = textHelper_1.TextHelper.encodeNonASCII(json);
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
        const json = textHelper_1.TextHelper.decodeNonASCII(ascii);
        return json ? JSON.parse(json) : undefined;
    }
    /**
     * Convert a string to Trytes.
     * @param str The string to encode.
     * @returns The encoded trytes value.
     */
    static stringToTrytes(str) {
        const encoded = textHelper_1.TextHelper.encodeNonASCII(str);
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
        return textHelper_1.TextHelper.decodeNonASCII(ascii);
    }
    /**
     * Pack trytes into bytes
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
        return iota_js_1.Converter.binaryToBytes(trytesBits.join(""));
    }
    /**
     * Unpack bytes into trytes
     * @param packed The packed trytes to unpack.
     * @returns The unpacked trytes.
     */
    static unpackTrytes(packed) {
        const allBits = iota_js_1.Converter.bytesToBinary(packed);
        const trytes = [];
        for (let i = 0; i < allBits.length; i += 5) {
            trytes.push(TrytesHelper.ALPHABET[Number.parseInt(allBits.slice(i, i + 5), 2)]);
        }
        return trytes.join("");
    }
}
exports.TrytesHelper = TrytesHelper;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ5dGVzSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3RyeXRlc0hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBMEM7QUFDMUMsNkNBQTBDO0FBRTFDOztHQUVHO0FBQ0gsTUFBYSxZQUFZO0lBd0NyQjs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFjO1FBQy9CLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBYztRQUM5QixPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQWM7UUFDakMsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFhO1FBQy9CLE1BQU0sS0FBSyxHQUFjLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFekQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNELEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdB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RUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6QixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEIsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUIsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekIsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekIsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekIsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6QixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEIsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUIsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekIsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekIsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDNUIsQ0FBQyJ9