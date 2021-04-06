(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@iota/iota.js'), require('big-integer')) :
	typeof define === 'function' && define.amd ? define(['@iota/iota.js', 'big-integer'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.mam = factory(global.Iota, global.bigInt));
}(this, (function (iota_js_1, require$$0) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var iota_js_1__default = /*#__PURE__*/_interopDefaultLegacy(iota_js_1);
	var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn) {
	  var module = { exports: {} };
		return fn(module, module.exports), module.exports;
	}

	var textHelper = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TextHelper = void 0;
	/**
	 * Helper functions for use with text.
	 */
	class TextHelper {
	    /**
	     * Encode Non ASCII characters to escaped characters.
	     * @param value The value to encode.
	     * @returns The encoded value.
	     */
	    static encodeNonASCII(value) {
	        return typeof value === "string"
	            ? value.replace(/[\u007F-\uFFFF]/g, chr => `\\u${(`0000${chr.charCodeAt(0).toString(16)}`).slice(-4)}`)
	            : undefined;
	    }
	    /**
	     * Decode escaped Non ASCII characters.
	     * @param value The value to decode.
	     * @returns The decoded value.
	     */
	    static decodeNonASCII(value) {
	        return typeof value === "string"
	            ? value.replace(/\\u(\w{4})/gi, (match, grp) => String.fromCharCode(Number.parseInt(grp, 16)))
	            : undefined;
	    }
	}
	exports.TextHelper = TextHelper;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy90ZXh0SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOztHQUVHO0FBQ0gsTUFBYSxVQUFVO0lBQ25COzs7O09BSUc7SUFDSSxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQXlCO1FBQ2xELE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUTtZQUM1QixDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3ZHLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQXlCO1FBQ2xELE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUTtZQUM1QixDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDOUYsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNwQixDQUFDO0NBQ0o7QUF0QkQsZ0NBc0JDIn0=
	});

	var trytesHelper = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TrytesHelper = void 0;


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
	        const encoded = textHelper.TextHelper.encodeNonASCII(json);
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
	        const json = textHelper.TextHelper.decodeNonASCII(ascii);
	        return json ? JSON.parse(json) : undefined;
	    }
	    /**
	     * Convert a string to Trytes.
	     * @param str The string to encode.
	     * @returns The encoded trytes value.
	     */
	    static stringToTrytes(str) {
	        const encoded = textHelper.TextHelper.encodeNonASCII(str);
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
	        return textHelper.TextHelper.decodeNonASCII(ascii);
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
	        let allBits = trytesBits.join("");
	        const remainder = allBits.length % 8;
	        if (remainder > 0) {
	            allBits += "1".repeat(8 - remainder);
	        }
	        return iota_js_1__default['default'].Converter.binaryToBytes(allBits);
	    }
	    /**
	     * Unpack bytes into trytes
	     * @param packed The packed trytes to unpack.
	     * @returns The unpacked trytes.
	     */
	    static unpackTrytes(packed) {
	        const allBits = iota_js_1__default['default'].Converter.bytesToBinary(packed);
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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ5dGVzSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3RyeXRlc0hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBMEM7QUFDMUMsNkNBQTBDO0FBRTFDOztHQUVHO0FBQ0gsTUFBYSxZQUFZO0lBd0NyQjs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFjO1FBQy9CLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBYztRQUM5QixPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQWM7UUFDakMsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFhO1FBQy9CLE1BQU0sS0FBSyxHQUFjLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFekQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNELEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxRDtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFnQjtRQUNwQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0Qyw2RUFBNkU7WUFDN0UsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuRCxJQUFJLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDNUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEQsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUNsRCxNQUFNLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFDLE1BQU07aUJBQ1Q7YUFDSjtTQUNKO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQWdCO1FBQ3JDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUVkLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xDO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQWE7UUFDakMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25DLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdkMsTUFBTSxVQUFVLEdBQUcsVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUNuQyxNQUFNLFdBQVcsR0FBRyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7WUFFbkQsTUFBTSxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNwRjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFjO1FBQ2hDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUU1QixJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7U0FDL0Q7UUFFRCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzdDLE1BQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV2RSxNQUFNLFlBQVksR0FBRyxVQUFVLEdBQUcsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFFckQsS0FBSyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDOUM7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBWTtRQUNyQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sT0FBTyxHQUFHLHVCQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsZ0JBQWdCLENBQUksTUFBYztRQUM1QyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDOUIsTUFBTSxJQUFJLFNBQVMsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1NBQzlEO1FBRUQsbUJBQW1CO1FBQ25CLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1NBQ2xFO1FBRUQsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxNQUFNLElBQUksR0FBRyx1QkFBVSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFXO1FBQ3BDLE1BQU0sT0FBTyxHQUFHLHVCQUFVLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBYztRQUN6QyxtQkFBbUI7UUFDbkIsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFekMsNERBQTREO1FBQzVELElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzFCLE9BQU8sSUFBSSxHQUFHLENBQUM7U0FDbEI7UUFFRCxNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLE9BQU8sdUJBQVUsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQWM7UUFDbkMsTUFBTSxVQUFVLEdBQWEsRUFBRSxDQUFDO1FBRWhDLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQ3hCLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWTtpQkFDdkIsUUFBUTtpQkFDUixPQUFPLENBQUMsS0FBSyxDQUFDO2lCQUNkLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ1gsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FDcEIsQ0FBQztTQUNMO1FBRUQsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUVyQyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7WUFDZixPQUFPLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7U0FDeEM7UUFFRCxPQUFPLG1CQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFrQjtRQUN6QyxNQUFNLE9BQU8sR0FBRyxtQkFBUyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVoRCxNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7UUFDNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN4QyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxRQUFRLEtBQUssUUFBUSxFQUFFO2dCQUM5QyxNQUFNO2FBQ1Q7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BFO1FBRUQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLENBQUM7O0FBcFJMLG9DQXFSQztBQXBSRzs7R0FFRztBQUNXLHFCQUFRLEdBQVcsNkJBQTZCLENBQUM7QUFFL0Q7OztHQUdHO0FBQ3FCLHlCQUFZLEdBQWdCO0lBQ2hELElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEIsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekIsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEIsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekIsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0IsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekIsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekIsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQzVCLENBQUMifQ==
	});

	var issP27 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.digestFromSignature = exports.checksumSecurity = exports.signature = exports.privateKeyFromSubseed = exports.address = exports.digestFromSubseed = exports.subseed = exports.PRIVATE_KEY_FRAGMENT_LENGTH = void 0;

	const PRIVATE_KEY_NUM_FRAGMENTS = 27;
	/* @internal */
	exports.PRIVATE_KEY_FRAGMENT_LENGTH = PRIVATE_KEY_NUM_FRAGMENTS * iota_js_1__default['default'].Curl.HASH_LENGTH;
	const MIN_TRYTE_VALUE = -13;
	const MAX_TRYTE_VALUE = 13;
	const MIN_TRIT_VALUE = -1;
	const MAX_TRIT_VALUE = 1;
	/**
	 * Calculate the subseed for the seed.
	 * @param seed The seed trits.
	 * @param index The index for the subseed.
	 * @returns The subseed trits.
	 * @internal
	 */
	function subseed(seed, index) {
	    const sponge = new iota_js_1__default['default'].Curl(27);
	    const subseedPreimage = seed.slice();
	    let localIndex = index;
	    while (localIndex-- > 0) {
	        for (let i = 0; i < subseedPreimage.length; i++) {
	            if (subseedPreimage[i]++ >= MAX_TRIT_VALUE) {
	                subseedPreimage[i] = MIN_TRIT_VALUE;
	            }
	            else {
	                break;
	            }
	        }
	    }
	    sponge.absorb(subseedPreimage, 0, subseedPreimage.length);
	    const ss = new Int8Array(iota_js_1__default['default'].Curl.HASH_LENGTH);
	    sponge.squeeze(ss, 0, ss.length);
	    return ss;
	}
	exports.subseed = subseed;
	/**
	 * Get the digest from the subseed.
	 * @param subSeed The subseed to get the digest for.
	 * @param securityLevel The security level to get the digest.
	 * @returns The digest trits.
	 * @internal
	 */
	function digestFromSubseed(subSeed, securityLevel) {
	    const curl1 = new iota_js_1__default['default'].Curl(27);
	    const curl2 = new iota_js_1__default['default'].Curl(27);
	    const curl3 = new iota_js_1__default['default'].Curl(27);
	    const length = securityLevel * exports.PRIVATE_KEY_FRAGMENT_LENGTH / iota_js_1__default['default'].Curl.HASH_LENGTH;
	    const digest = new Int8Array(iota_js_1__default['default'].Curl.HASH_LENGTH);
	    curl1.absorb(subSeed, 0, subSeed.length);
	    for (let i = 0; i < length; i++) {
	        curl1.squeeze(digest, 0, digest.length);
	        for (let k = 0; k < MAX_TRYTE_VALUE - MIN_TRYTE_VALUE + 1; k++) {
	            curl2.reset();
	            curl2.absorb(digest, 0, digest.length);
	            curl2.squeeze(digest, 0, digest.length);
	        }
	        curl3.absorb(digest, 0, digest.length);
	    }
	    curl3.squeeze(digest, 0, digest.length);
	    return digest;
	}
	exports.digestFromSubseed = digestFromSubseed;
	/**
	 * Get the address from the digests.
	 * @param digests The digests to get the address for.
	 * @returns The address trits.
	 * @internal
	 */
	function address(digests) {
	    const sponge = new iota_js_1__default['default'].Curl(27);
	    sponge.absorb(digests, 0, digests.length);
	    const addressTrits = new Int8Array(iota_js_1__default['default'].Curl.HASH_LENGTH);
	    sponge.squeeze(addressTrits, 0, addressTrits.length);
	    return addressTrits;
	}
	exports.address = address;
	/**
	 * Get the private key from the subseed.
	 * @param subSeed The subseed to get the private key for.
	 * @param securityLevel The security level for the private key.
	 * @returns The private key trits.
	 * @internal
	 */
	function privateKeyFromSubseed(subSeed, securityLevel) {
	    const keyLength = securityLevel * exports.PRIVATE_KEY_FRAGMENT_LENGTH;
	    const keyTrits = new Int8Array(keyLength);
	    const actualKeyTrits = new Int8Array(keyLength);
	    const sponge = new iota_js_1__default['default'].Curl(27);
	    sponge.absorb(subSeed, 0, subSeed.length);
	    sponge.squeeze(keyTrits, 0, keyTrits.length);
	    for (let i = 0; i < keyLength / iota_js_1__default['default'].Curl.HASH_LENGTH; i++) {
	        const offset = i * iota_js_1__default['default'].Curl.HASH_LENGTH;
	        sponge.reset();
	        sponge.absorb(keyTrits, offset, iota_js_1__default['default'].Curl.HASH_LENGTH);
	        actualKeyTrits.set(sponge.rate(), offset);
	    }
	    return actualKeyTrits;
	}
	exports.privateKeyFromSubseed = privateKeyFromSubseed;
	/**
	 * Create a signature for the trits.
	 * @param hashTrits The trits to create the signature for.
	 * @param key The key to use for signing.
	 * @returns The signature trits.
	 * @internal
	 */
	function signature(hashTrits, key) {
	    const signatures = new Int8Array(key.length);
	    const sponge = new iota_js_1__default['default'].Curl(27);
	    for (let i = 0; i < key.length / iota_js_1__default['default'].Curl.HASH_LENGTH; i++) {
	        let buffer = key.subarray(i * iota_js_1__default['default'].Curl.HASH_LENGTH, (i + 1) * iota_js_1__default['default'].Curl.HASH_LENGTH);
	        for (let k = 0; k < MAX_TRYTE_VALUE - (hashTrits[i * 3] + (hashTrits[(i * 3) + 1] * 3) + (hashTrits[(i * 3) + 2] * 9)); k++) {
	            sponge.reset();
	            sponge.absorb(buffer, 0, buffer.length);
	            buffer = sponge.rate();
	        }
	        signatures.set(buffer, i * iota_js_1__default['default'].Curl.HASH_LENGTH);
	    }
	    return signatures;
	}
	exports.signature = signature;
	/**
	 * Check the security level.
	 * @param hash The hash to check.
	 * @returns The security level
	 * @internal
	 */
	function checksumSecurity(hash) {
	    const dataSum1 = hash.slice(0, iota_js_1__default['default'].Curl.HASH_LENGTH / 3);
	    let sum1 = 0;
	    for (let i = 0; i < dataSum1.length; i++) {
	        sum1 += dataSum1[i];
	    }
	    if (sum1 === 0) {
	        return 1;
	    }
	    const dataSum2 = hash.slice(0, 2 * iota_js_1__default['default'].Curl.HASH_LENGTH / 3);
	    let sum2 = 0;
	    for (let i = 0; i < dataSum2.length; i++) {
	        sum2 += dataSum2[i];
	    }
	    if (sum2 === 0) {
	        return 2;
	    }
	    let sum3 = 0;
	    for (let i = 0; i < hash.length; i++) {
	        sum3 += hash[i];
	    }
	    return sum3 === 0 ? 3 : 0;
	}
	exports.checksumSecurity = checksumSecurity;
	/**
	 * Get the digest from the signature
	 * @param hash The hash to get the digest.
	 * @param sig The signature.
	 * @returns The digest.
	 * @internal
	 */
	function digestFromSignature(hash, sig) {
	    const sponge = new iota_js_1__default['default'].Curl(27);
	    const bytes = new Int8Array(sig.length);
	    for (let i = 0; i < (sig.length / iota_js_1__default['default'].Curl.HASH_LENGTH); i++) {
	        let innerBytes = sig.slice(i * iota_js_1__default['default'].Curl.HASH_LENGTH, (i + 1) * iota_js_1__default['default'].Curl.HASH_LENGTH);
	        for (let j = 0; j < (hash[i * 3] + (hash[(i * 3) + 1] * 3) + (hash[(i * 3) + 2] * 9)) - MIN_TRYTE_VALUE; j++) {
	            sponge.reset();
	            sponge.absorb(innerBytes, 0, innerBytes.length);
	            innerBytes = sponge.rate();
	        }
	        bytes.set(innerBytes, i * iota_js_1__default['default'].Curl.HASH_LENGTH);
	    }
	    sponge.reset();
	    sponge.absorb(bytes, 0, bytes.length);
	    return sponge.rate();
	}
	exports.digestFromSignature = digestFromSignature;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNzLXAyNy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zaWduaW5nL2lzcy1wMjcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXFDO0FBRXJDLE1BQU0seUJBQXlCLEdBQVcsRUFBRSxDQUFDO0FBQzdDLGVBQWU7QUFDRixRQUFBLDJCQUEyQixHQUFXLHlCQUF5QixHQUFHLGNBQUksQ0FBQyxXQUFXLENBQUM7QUFDaEcsTUFBTSxlQUFlLEdBQVcsQ0FBQyxFQUFFLENBQUM7QUFDcEMsTUFBTSxlQUFlLEdBQVcsRUFBRSxDQUFDO0FBQ25DLE1BQU0sY0FBYyxHQUFXLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLE1BQU0sY0FBYyxHQUFXLENBQUMsQ0FBQztBQUVqQzs7Ozs7O0dBTUc7QUFDSCxTQUFnQixPQUFPLENBQUMsSUFBZSxFQUFFLEtBQWE7SUFDbEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFNUIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JDLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztJQUV2QixPQUFPLFVBQVUsRUFBRSxHQUFHLENBQUMsRUFBRTtRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QyxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLGNBQWMsRUFBRTtnQkFDeEMsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQzthQUN2QztpQkFBTTtnQkFDSCxNQUFNO2FBQ1Q7U0FDSjtLQUNKO0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRCxNQUFNLEVBQUUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxjQUFJ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
	});

	var merkleHashGenerator = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.generateAddress = void 0;

	/**
	 * Generate an address for the merklr tree.
	 * @param seedTrits The trits for the seed.
	 * @param index The index of the address to generate.
	 * @param security The security level of the address to generate.
	 * @returns The address and the private key.
	 * @internal
	 */
	function generateAddress(seedTrits, index, security) {
	    const ss = issP27.subseed(seedTrits, index);
	    const dg = issP27.digestFromSubseed(ss, security);
	    return {
	        address: issP27.address(dg),
	        privateKey: issP27.privateKeyFromSubseed(ss, security)
	    };
	}
	exports.generateAddress = generateAddress;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVya2xlSGFzaEdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXJrbGUvbWVya2xlSGFzaEdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnREFBZ0c7QUFFaEc7Ozs7Ozs7R0FPRztBQUNILFNBQWdCLGVBQWUsQ0FBQyxTQUFvQixFQUFFLEtBQWEsRUFBRSxRQUFnQjtJQVVqRixNQUFNLEVBQUUsR0FBRyxpQkFBTyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxNQUFNLEVBQUUsR0FBRywyQkFBaUIsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFM0MsT0FBTztRQUNILE9BQU8sRUFBRSxpQkFBTyxDQUFDLEVBQUUsQ0FBQztRQUNwQixVQUFVLEVBQUUsK0JBQXFCLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQztLQUNsRCxDQUFDO0FBQ04sQ0FBQztBQWpCRCwwQ0FpQkMifQ==
	});

	var merkleNode = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MerkleNode = void 0;
	/**
	 * Class to represent a node in a merkle tree.
	 * @internal
	 */
	class MerkleNode {
	    /**
	     * Create a new instance of MerkleNode.
	     * @param left The left node.
	     * @param right The right node.
	     * @param addressTrits The trits representing the address.
	     * @param privateKeyTrits The trits for the private key.
	     */
	    constructor(left, right, addressTrits, privateKeyTrits) {
	        this.left = left;
	        this.right = right;
	        this.size = (left ? left.size : 0) + (right ? right.size : 0);
	        this.addressTrits = addressTrits;
	        this.privateKeyTrits = privateKeyTrits;
	    }
	}
	exports.MerkleNode = MerkleNode;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVya2xlTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXJrbGUvbWVya2xlTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7O0dBR0c7QUFDSCxNQUFhLFVBQVU7SUEwQm5COzs7Ozs7T0FNRztJQUNILFlBQ0ksSUFBNEIsRUFDNUIsS0FBNkIsRUFDN0IsWUFBdUIsRUFDdkIsZUFBc0M7UUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0lBQzNDLENBQUM7Q0FDSjtBQTVDRCxnQ0E0Q0MifQ==
	});

	var merkleTree = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MerkleTree = void 0;




	/**
	 * Class to represent a merkle tree.
	 * @internal
	 */
	class MerkleTree {
	    /**
	     * Create a new instance of the merkle tree.
	     * @param seed The seed to use for the tree.
	     * @param index The start index for the creation.
	     * @param count The count for the creation.
	     * @param security The security level to create the hashes.
	     */
	    constructor(seed, index, count, security) {
	        const seedTrits = trytesHelper.TrytesHelper.toTrits(seed);
	        const leaves = [];
	        for (let i = 0; i < count; i++) {
	            const addressPrivateKey = merkleHashGenerator.generateAddress(seedTrits, index + i, security);
	            leaves.push(new merkleNode.MerkleNode(undefined, undefined, addressPrivateKey.address, addressPrivateKey.privateKey));
	            leaves[i].size = 1;
	        }
	        this.root = this.buildTree(leaves);
	    }
	    /**
	     * Recalculate the root for the siblings.
	     * @param rate The current address.
	     * @param siblings The siblings data.
	     * @param index The index in the tree.
	     * @returns The new sibling root.
	     */
	    static root(rate, siblings, index) {
	        const sponge = new iota_js_1__default['default'].Curl(27);
	        let i = 1;
	        const numChunks = Math.ceil(siblings.length / iota_js_1__default['default'].Curl.HASH_LENGTH);
	        for (let c = 0; c < numChunks; c++) {
	            const chunk = siblings.slice(c * iota_js_1__default['default'].Curl.HASH_LENGTH, (c + 1) * iota_js_1__default['default'].Curl.HASH_LENGTH);
	            sponge.reset();
	            // eslint-disable-next-line no-bitwise
	            if ((i & index) === 0) {
	                sponge.absorb(rate, 0, rate.length);
	                sponge.absorb(chunk, 0, chunk.length);
	            }
	            else {
	                sponge.absorb(chunk, 0, chunk.length);
	                sponge.absorb(rate, 0, rate.length);
	            }
	            // eslint-disable-next-line no-bitwise
	            i <<= 1;
	            rate = sponge.rate();
	        }
	        return sponge.rate();
	    }
	    /**
	     * Get a sub tree.
	     * @param index The index of the subtree.
	     * @returns The key and leaves for the sub tree.
	     */
	    getSubtree(index) {
	        var _a;
	        if (this.root.size === 1) {
	            return {
	                key: ((_a = this.root.left) === null || _a === void 0 ? void 0 : _a.privateKeyTrits)
	                    ? this.root.left.privateKeyTrits : new Int8Array(),
	                leaves: []
	            };
	        }
	        const leaves = [];
	        let node = this.root;
	        let size = this.root.size;
	        let privateKey;
	        if (index < size) {
	            while (node) {
	                if (!node.left) {
	                    privateKey = node.privateKeyTrits;
	                    break;
	                }
	                size = node.left.size;
	                if (index < size) {
	                    leaves.push(node.right ? node.right : node.left);
	                    node = node.left;
	                }
	                else {
	                    leaves.push(node.left);
	                    node = node.right;
	                    index -= size;
	                }
	            }
	        }
	        leaves.reverse();
	        return {
	            key: privateKey !== null && privateKey !== void 0 ? privateKey : new Int8Array(),
	            leaves
	        };
	    }
	    /**
	     * Build tree from the leaf hashes.
	     * @param leaves The leaves to build the tree from.
	     * @returns The root node.
	     */
	    buildTree(leaves) {
	        const subnodes = [];
	        for (let i = 0; i < leaves.length; i += 2) {
	            const left = leaves[i];
	            const right = (i + 1 < leaves.length) ? leaves[i + 1] : undefined;
	            let addressTrits;
	            if (right) {
	                const sponge = new iota_js_1__default['default'].Curl(27);
	                sponge.absorb(left.addressTrits, 0, left.addressTrits.length);
	                sponge.absorb(right.addressTrits, 0, right.addressTrits.length);
	                addressTrits = new Int8Array(iota_js_1__default['default'].Curl.HASH_LENGTH);
	                sponge.squeeze(addressTrits, 0, addressTrits.length);
	            }
	            else {
	                addressTrits = left.addressTrits;
	            }
	            subnodes.push(new merkleNode.MerkleNode(left, right, addressTrits, undefined));
	        }
	        if (subnodes.length === 1) {
	            return subnodes[0];
	        }
	        return this.buildTree(subnodes);
	    }
	}
	exports.MerkleTree = MerkleTree;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVya2xlVHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXJrbGUvbWVya2xlVHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBcUM7QUFDckMsd0RBQXFEO0FBQ3JELCtEQUF3RDtBQUN4RCw2Q0FBMEM7QUFFMUM7OztHQUdHO0FBQ0gsTUFBYSxVQUFVO0lBTW5COzs7Ozs7T0FNRztJQUNILFlBQVksSUFBWSxFQUFFLEtBQWEsRUFBRSxLQUFhLEVBQUUsUUFBZ0I7UUFDcEUsTUFBTSxTQUFTLEdBQUcsMkJBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWxCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUIsTUFBTSxpQkFBaUIsR0FBRyxxQ0FBZSxDQUFDLFNBQVMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSx1QkFBVSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDM0csTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7U0FDdEI7UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBZSxFQUFFLFFBQW1CLEVBQUUsS0FBYTtRQUNsRSxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixN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
	});

	var pascal = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.roundThird = exports.pascalDecode = exports.pascalEncode = void 0;

	/* eslint-disable no-bitwise */
	/* @internal */
	const ZERO = new Int8Array([1, 0, 0, -1]);
	/* @internal */
	const RADIX = 3;
	/* @internal */
	const TRITS_PER_TRYTE = 3;
	/**
	 * Perform pascal encoding of the value.
	 * @param value The value to encode.
	 * @returns The trits for the encoded value.
	 * @internal
	 */
	function pascalEncode(value) {
	    if (value === 0) {
	        return ZERO;
	    }
	    const length = roundThird(minTrits(Math.abs(value), 1));
	    const trits = new Int8Array(encodedLength(value));
	    valueToTrits(value, trits);
	    let encoding = 0;
	    let index = 0;
	    for (let i = 0; i < length - TRITS_PER_TRYTE; i += TRITS_PER_TRYTE) {
	        const tritValue = trits.slice(i, i + TRITS_PER_TRYTE);
	        const tritsAsInt = trytesHelper.TrytesHelper.tritsValue(tritValue);
	        if (tritsAsInt >= 0) {
	            encoding |= 1 << index;
	            for (let j = 0; j < tritValue.length; j++) {
	                trits[i + j] = -tritValue[j];
	            }
	        }
	        index++;
	    }
	    const v = trits.slice(length - TRITS_PER_TRYTE, length - TRITS_PER_TRYTE + length);
	    if (trytesHelper.TrytesHelper.tritsValue(v) < 0) {
	        encoding |= 1 << index;
	        for (let k = 0; k < v.length; k++) {
	            trits[k + length - TRITS_PER_TRYTE] = -trits[k + length - TRITS_PER_TRYTE];
	        }
	    }
	    const checksumTrits = new Int8Array(trits.length - length);
	    valueToTrits(encoding, checksumTrits);
	    for (let i = 0; i < checksumTrits.length; i++) {
	        trits[length + i] = checksumTrits[i];
	    }
	    return trits;
	}
	exports.pascalEncode = pascalEncode;
	/**
	 * Decode the pascal encoded trits.
	 * @param value The value to decode.
	 * @returns The decoded value.
	 * @internal
	 */
	function pascalDecode(value) {
	    if (value.length >= ZERO.length &&
	        value[0] === ZERO[0] &&
	        value[1] === ZERO[1] &&
	        value[2] === ZERO[2] &&
	        value[3] === ZERO[3]) {
	        return { value: 0, end: 4 };
	    }
	    const encoderStart = end(value);
	    const inputEnd = encoderStart + (encoderStart / TRITS_PER_TRYTE);
	    const encoder = trytesHelper.TrytesHelper.tritsValue(value.slice(encoderStart, inputEnd));
	    let result = 0;
	    for (let i = 0; i < encoderStart / TRITS_PER_TRYTE; i++) {
	        const tritsIntValue = ((encoder >> i) & 1) !== 0
	            ? -trytesHelper.TrytesHelper.tritsValue(value.slice(i * TRITS_PER_TRYTE, (i + 1) * TRITS_PER_TRYTE))
	            : trytesHelper.TrytesHelper.tritsValue(value.slice(i * TRITS_PER_TRYTE, (i + 1) * TRITS_PER_TRYTE));
	        result += (Math.pow(27, i) * tritsIntValue);
	    }
	    return { value: result, end: inputEnd };
	}
	exports.pascalDecode = pascalDecode;
	/**
	 * Get the encoded length of the value.
	 * @param value The value.
	 * @returns The length.
	 * @internal
	 */
	function encodedLength(value) {
	    const length = roundThird(minTrits(Math.abs(value), 1));
	    return length + (length / RADIX);
	}
	/**
	 * Round the number to the third.
	 * @param value The value to round.
	 * @returns The rounded number.
	 * @internal
	 */
	function roundThird(value) {
	    const rem = value % RADIX;
	    if (rem === 0) {
	        return value;
	    }
	    return value + RADIX - rem;
	}
	exports.roundThird = roundThird;
	/**
	 * Calculate the minimum trits for the input.
	 * @param input The input to calculate from.
	 * @param basis The basis of the calculation.
	 * @returns The number of trits.
	 * @internal
	 */
	function minTrits(input, basis) {
	    if (input <= basis) {
	        return 1;
	    }
	    return 1 + minTrits(input, 1 + (basis * RADIX));
	}
	/**
	 * Calculate the end for the input.
	 * @param input The input to calculate for.
	 * @returns The calculated end.
	 * @internal
	 */
	function end(input) {
	    if (trytesHelper.TrytesHelper.tritsValue(input.slice(0, TRITS_PER_TRYTE)) > 0) {
	        return TRITS_PER_TRYTE;
	    }
	    return TRITS_PER_TRYTE + end(input.slice(TRITS_PER_TRYTE));
	}
	/**
	 * Convert the value to trits.
	 * @param input The input value to convert.
	 * @param trits The trits.
	 * @returns The end conversion.
	 * @internal
	 */
	function valueToTrits(input, trits) {
	    const endWrite = writeTrits(input, trits, 0);
	    if (input >= 0) {
	        return endWrite;
	    }
	    for (let i = 0; i < trits.length; i++) {
	        trits[i] = -trits[i];
	    }
	    return endWrite;
	}
	/**
	 * Write the trits for the value.
	 * @param input The input value.
	 * @param trits The trits to write to.
	 * @param index The index to write at.
	 * @returns The length.
	 * @internal
	 */
	function writeTrits(input, trits, index) {
	    switch (input) {
	        case 0:
	            return 0;
	        default:
	            // eslint-disable-next-line no-case-declarations
	            let abs = Math.floor(input / RADIX);
	            // eslint-disable-next-line no-case-declarations
	            let r = input % RADIX;
	            if (r > 1) {
	                abs += 1;
	                r = -1;
	            }
	            trits[index] = r;
	            index++;
	            return 1 + writeTrits(abs, trits, index);
	    }
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzY2FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3Bhc2NhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpREFBOEM7QUFFOUMsK0JBQStCO0FBQy9CLGVBQWU7QUFDZixNQUFNLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQyxlQUFlO0FBQ2YsTUFBTSxLQUFLLEdBQVcsQ0FBQyxDQUFDO0FBQ3hCLGVBQWU7QUFDZixNQUFNLGVBQWUsR0FBVyxDQUFDLENBQUM7QUFFbEM7Ozs7O0dBS0c7QUFDSCxTQUFnQixZQUFZLENBQUMsS0FBYTtJQUN0QyxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7UUFDYixPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEQsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUUzQixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDakIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBRWQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sR0FBRyxlQUFlLEVBQUUsQ0FBQyxJQUFJLGVBQWUsRUFBRTtRQUNoRSxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUM7UUFDdEQsTUFBTSxVQUFVLEdBQUcsMkJBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFD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
	});

	var hammingDiver = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HammingDiver = void 0;

	const big_integer_1 = __importDefault(require$$0__default['default']);

	/**
	 * Class to perform Hamming calculation for nonce.
	 * @internal
	 */
	class HammingDiver {
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
	        let size = Math.min(length, iota_js_1__default['default'].Curl.HASH_LENGTH) - offset;
	        let index = 0;
	        while (index === 0) {
	            const incrementResult = this.increment(state, offset + (size * 2 / 3), offset + size);
	            size = Math.min(pascal.roundThird(offset + (size * 2 / 3) + incrementResult), iota_js_1__default['default'].Curl.HASH_LENGTH) - offset;
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
	        const initialState = this.tritsToBigInt(trits, iota_js_1__default['default'].Curl.STATE_LENGTH);
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
	     * @param toIndex The index to end at,
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
	                low: searchStates.low.slice(0, iota_js_1__default['default'].Curl.STATE_LENGTH),
	                high: searchStates.high.slice(0, iota_js_1__default['default'].Curl.STATE_LENGTH)
	            };
	            for (let stateIndex = 0; stateIndex < iota_js_1__default['default'].Curl.STATE_LENGTH; stateIndex++) {
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
	        return big_integer_1.default(1).shiftLeft(64)
	            .subtract(big_integer_1.default(1))
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
	                    const bIndex = big_integer_1.default(1).shiftLeft(i);
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
	            const bIndex = big_integer_1.default(index);
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
	exports.HammingDiver = HammingDiver;
	/**
	 * Max 64 bit value.
	 */
	HammingDiver.MAX_VALUE = big_integer_1.default("FFFFFFFFFFFFFFFF", 16);
	/**
	 * Min 64 bit value.
	 */
	HammingDiver.MIN_VALUE = big_integer_1.default("0000000000000000", 16);
	/**
	 * High 0
	 */
	HammingDiver.HIGH_0 = big_integer_1.default("B6DB6DB6DB6DB6DB", 16);
	/**
	 * High 1
	 */
	HammingDiver.HIGH_1 = big_integer_1.default("8FC7E3F1F8FC7E3F", 16);
	/**
	 * High 2
	 */
	HammingDiver.HIGH_2 = big_integer_1.default("FFC01FFFF803FFFF", 16);
	/**
	 * High 3
	 */
	HammingDiver.HIGH_3 = big_integer_1.default("003FFFFFFFFFFFFF", 16);
	/**
	 * Low 0
	 */
	HammingDiver.LOW_0 = big_integer_1.default("DB6DB6DB6DB6DB6D", 16);
	/**
	 * Low 1
	 */
	HammingDiver.LOW_1 = big_integer_1.default("F1F8FC7E3F1F8FC7", 16);
	/**
	 * Low 2
	 */
	HammingDiver.LOW_2 = big_integer_1.default("7FFFE00FFFFC01FF", 16);
	/**
	 * Low 3
	 */
	HammingDiver.LOW_3 = big_integer_1.default("FFC0000007FFFFFF", 16);
	/**
	 * Number of rounds
	 */
	HammingDiver.ROUNDS = 27;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFtbWluZ0RpdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BlYXJsRGl2ZXIvaGFtbWluZ0RpdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJDQUFxQztBQUNyQyw4REFBaUM7QUFDakMsNENBQTZDO0FBRzdDOzs7R0FHRztBQUNILE1BQWEsWUFBWTtJQXdEckI7Ozs7Ozs7T0FPRztJQUNJLE1BQU0sQ0FBQyxLQUFnQixFQUFFLGFBQXFCLEVBQUUsTUFBYyxFQUFFLE1BQWM7UUFDakYsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsY0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUV2RCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFFZCxPQUFPLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDaEIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDdEYsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxFQUFFLGNBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxNQUFNLENBQUM7WUFFbEcsTUFBTSxRQUFRLEdBQTJCO2dCQUNyQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3RCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTthQUMzQixDQUFDO1lBRUYsSUFBSSxDQUFDLFNB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
	});

	var arrayHelper = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.concatenate = void 0;
	/**
	 * Concatentate a list of arrays.
	 * @param arrays The arrays to concatenate.
	 * @returns The concatenated arrays.
	 * @internal
	 */
	function concatenate(arrays) {
	    let totalLength = 0;
	    for (const arr of arrays) {
	        totalLength += arr.length;
	    }
	    const result = new Int8Array(totalLength);
	    let offset = 0;
	    for (const arr of arrays) {
	        result.set(arr, offset);
	        offset += arr.length;
	    }
	    return result;
	}
	exports.concatenate = concatenate;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvYXJyYXlIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7O0dBS0c7QUFDSCxTQUFnQixXQUFXLENBQUMsTUFBbUI7SUFDM0MsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFO1FBQ3RCLFdBQVcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDO0tBQzdCO0lBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDMUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUU7UUFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUM7S0FDeEI7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBWkQsa0NBWUMifQ==
	});

	var guards = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.validateModeKey = void 0;

	/**
	 * Validate the mode and key.
	 * @param mode The mamMode to validate.
	 * @param sideKey The sideKey to validate.
	 * @internal
	 */
	function validateModeKey(mode, sideKey) {
	    if (mode !== "public" && mode !== "private" && mode !== "restricted") {
	        throw new Error(`The mode must be public, private or restricted, it is '${mode}'`);
	    }
	    if (mode === "restricted") {
	        if (!sideKey) {
	            throw new Error("You must provide a sideKey for restricted mode");
	        }
	        if (!trytesHelper.TrytesHelper.isTrytes(sideKey)) {
	            throw new Error("The sideKey must be in trytes");
	        }
	        if (sideKey.length > 81) {
	            throw new Error("The sideKey must be maximum length 81 trytes");
	        }
	    }
	    if (mode !== "restricted" && sideKey) {
	        throw new Error("sideKey is only used in restricted mode");
	    }
	}
	exports.validateModeKey = validateModeKey;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VhcmRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2d1YXJkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxpREFBOEM7QUFFOUM7Ozs7O0dBS0c7QUFDSCxTQUFnQixlQUFlLENBQUMsSUFBYSxFQUFFLE9BQWdCO0lBQzNELElBQUksSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksS0FBSyxZQUFZLEVBQUU7UUFDbEUsTUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsSUFBSSxHQUFHLENBQUMsQ0FBQztLQUN0RjtJQUNELElBQUksSUFBSSxLQUFLLFlBQVksRUFBRTtRQUN2QixJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QsSUFBSSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1NBQ25FO0tBQ0o7SUFDRCxJQUFJLElBQUksS0FBSyxZQUFZLElBQUksT0FBTyxFQUFFO1FBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQztLQUM5RDtBQUNMLENBQUM7QUFsQkQsMENBa0JDIn0=
	});

	var mask_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.unmask = exports.mask = exports.maskHash = void 0;

	/**
	 * Create the mask hash for the key.
	 * @param keyTrits The key to create the mask hash for.
	 * @returns The masked hash.
	 * @internal
	 */
	function maskHash(keyTrits) {
	    const sponge = new iota_js_1__default['default'].Curl(81);
	    sponge.absorb(keyTrits, 0, keyTrits.length);
	    const finalKeyTrits = new Int8Array(iota_js_1__default['default'].Curl.HASH_LENGTH);
	    sponge.squeeze(finalKeyTrits, 0, finalKeyTrits.length);
	    return finalKeyTrits;
	}
	exports.maskHash = maskHash;
	/**
	 * Apply mask to the payload.
	 * @param payload The payload to apply the mask to.
	 * @param sponge The sponge to use.
	 * @returns The masked payload.
	 * @internal
	 */
	function mask(payload, sponge) {
	    const keyChunk = sponge.rate();
	    const numChunks = Math.ceil(payload.length / iota_js_1__default['default'].Curl.HASH_LENGTH);
	    for (let c = 0; c < numChunks; c++) {
	        const chunk = payload.slice(c * iota_js_1__default['default'].Curl.HASH_LENGTH, (c + 1) * iota_js_1__default['default'].Curl.HASH_LENGTH);
	        sponge.absorb(chunk, 0, chunk.length);
	        const state = sponge.rate();
	        for (let i = 0; i < chunk.length; i++) {
	            payload[(c * iota_js_1__default['default'].Curl.HASH_LENGTH) + i] = tritSum(chunk[i], keyChunk[i]);
	            keyChunk[i] = state[i];
	        }
	    }
	    return payload;
	}
	exports.mask = mask;
	/**
	 * Unmask a payload.
	 * @param payload The payload to unmask.
	 * @param sponge The sponge to use.
	 * @returns The unmasked payload.
	 * @internal
	 */
	function unmask(payload, sponge) {
	    const unmasked = new Int8Array(payload);
	    const limit = Math.ceil(unmasked.length / iota_js_1__default['default'].Curl.HASH_LENGTH) * iota_js_1__default['default'].Curl.HASH_LENGTH;
	    let state;
	    for (let c = 0; c < limit; c++) {
	        const indexInChunk = c % iota_js_1__default['default'].Curl.HASH_LENGTH;
	        if (indexInChunk === 0) {
	            state = sponge.rate();
	        }
	        if (state) {
	            unmasked[c] = tritSum(unmasked[c], -state[indexInChunk]);
	        }
	        if (indexInChunk === iota_js_1__default['default'].Curl.HASH_LENGTH - 1) {
	            sponge.absorb(unmasked, Math.floor(c / iota_js_1__default['default'].Curl.HASH_LENGTH) * iota_js_1__default['default'].Curl.HASH_LENGTH, iota_js_1__default['default'].Curl.HASH_LENGTH);
	        }
	    }
	    return unmasked;
	}
	exports.unmask = unmask;
	/**
	 * Sum the parts of a trit.
	 * @param left The left part.
	 * @param right The right part.
	 * @returns The sum.
	 * @internal
	 */
	function tritSum(left, right) {
	    const sum = left + right;
	    switch (sum) {
	        case 2:
	            return -1;
	        case -2:
	            return 1;
	        default:
	            return sum;
	    }
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9tYXNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUFxQztBQUVyQzs7Ozs7R0FLRztBQUNILFNBQWdCLFFBQVEsQ0FBQyxRQUFtQjtJQUN4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUU1QixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTVDLE1BQU0sYUFBYSxHQUFHLElBQUksU0FBUyxDQUFDLGNBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0RCxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXZELE9BQU8sYUFBYSxDQUFDO0FBQ3pCLENBQUM7QUFURCw0QkFTQztBQUVEOzs7Ozs7R0FNRztBQUNILFNBQWdCLElBQUksQ0FBQyxPQUFrQixFQUFFLE1BQVk7SUFDakQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRS9CLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxjQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNoQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxjQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLGNBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU5RSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsY0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckUsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQjtLQUNKO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQWpCRCxvQkFpQkM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxTQUFnQixNQUFNLENBQUMsT0FBa0IsRUFBRSxNQUFZO0lBQ25ELE1BQU0sUUFBUSxHQUFjLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRW5ELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxjQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsY0FBSSxDQUFDLFdBQVcsQ0FBQztJQUMvRSxJQUFJLEtBQUssQ0FBQztJQUNWLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDNUIsTUFBTSxZQUFZLEdBQUcsQ0FBQyxHQUFHLGNBQUksQ0FBQyxXQUFXLENBQUM7UUFFMUMsSUFBSSxZQUFZLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFFRCxJQUFJLEtBQUssRUFBRTtZQUNQLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7U0FDNUQ7UUFFRCxJQUFJLFlBQVksS0FBSyxjQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBRTtZQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxjQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsY0FBSSxDQUFDLFdBQVcsRUFBRSxjQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbEc7S0FDSjtJQUVELE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUF0QkQsd0JBc0JDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsU0FBUyxPQUFPLENBQUMsSUFBWSxFQUFFLEtBQWE7SUFDeEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUV6QixRQUFRLEdBQUcsRUFBRTtRQUNULEtBQUssQ0FBQztZQUNGLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDZCxLQUFLLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxDQUFDO1FBQ2I7WUFDSSxPQUFPLEdBQUcsQ0FBQztLQUNsQjtBQUNMLENBQUMifQ==
	});

	var channel = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createMessage = exports.channelRoot = exports.createChannel = void 0;









	/**
	 * Create a new channel object.
	 * @param seed The seed for the channel.
	 * @param security The security level for the channel.
	 * @param mode The mode for the channel.
	 * @param sideKey The side key to use for restricted mode.
	 * @returns The new channel state.
	 */
	function createChannel(seed, security, mode, sideKey) {
	    if (!trytesHelper.TrytesHelper.isHash(seed)) {
	        throw new Error("The seed must be 81 trytes long");
	    }
	    if (security < 1 || security > 3) {
	        throw new Error(`Security must be between 1 and 3, it is ${security}`);
	    }
	    guards.validateModeKey(mode, sideKey);
	    return {
	        seed,
	        mode,
	        sideKey: mode === "restricted" ? (sideKey !== null && sideKey !== void 0 ? sideKey : "").padEnd(81, "9") : undefined,
	        security,
	        start: 0,
	        count: 1,
	        nextCount: 1,
	        index: 0
	    };
	}
	exports.createChannel = createChannel;
	/**
	 * Get the root of the channel.
	 * @param channelState The channel state to get the root.
	 * @returns The root.
	 */
	function channelRoot(channelState) {
	    if (!channelState) {
	        throw new Error("channelState must be provided");
	    }
	    if (channelState.start < 0) {
	        throw new Error("channelState.start must be >= 0");
	    }
	    if (channelState.count <= 0) {
	        throw new Error("channelState.count must be > 0");
	    }
	    if (channelState.security < 1 || channelState.security > 3) {
	        throw new Error(`channelState.security must be between 1 and 3, it is ${channelState.security}`);
	    }
	    const tree = new merkleTree.MerkleTree(channelState.seed, channelState.start, channelState.count, channelState.security);
	    return trytesHelper.TrytesHelper.fromTrits(tree.root.addressTrits);
	}
	exports.channelRoot = channelRoot;
	/**
	 * Prepare a message on the mam channel.
	 * @param channelState The channel to prepare the message for.
	 * @param message The trytes to include in the message.
	 * @returns The prepared message, the channel state will also be updated.
	 */
	function createMessage(channelState, message) {
	    var _a;
	    if (!trytesHelper.TrytesHelper.isTrytes(message)) {
	        throw new Error("The message must be in trytes");
	    }
	    const tree = new merkleTree.MerkleTree(channelState.seed, channelState.start, channelState.count, channelState.security);
	    const nextRootTree = new merkleTree.MerkleTree(channelState.seed, channelState.start + channelState.count, channelState.nextCount, channelState.security);
	    const nextRootTrits = nextRootTree.root.addressTrits;
	    const messageTrits = trytesHelper.TrytesHelper.toTrits(message);
	    const indexTrits = pascal.pascalEncode(channelState.index);
	    const messageLengthTrits = pascal.pascalEncode(messageTrits.length);
	    const subtree = tree.getSubtree(channelState.index);
	    const sponge = new iota_js_1__default['default'].Curl(27);
	    const sideKeyTrits = trytesHelper.TrytesHelper.toTrits((_a = channelState.sideKey) !== null && _a !== void 0 ? _a : "9".repeat(81));
	    sponge.absorb(sideKeyTrits, 0, sideKeyTrits.length);
	    sponge.absorb(tree.root.addressTrits, 0, tree.root.addressTrits.length);
	    let payload = arrayHelper.concatenate([indexTrits, messageLengthTrits]);
	    sponge.absorb(payload, 0, payload.length);
	    // Encrypt the next root along with the message
	    const maskedNextRoot = mask_1.mask(arrayHelper.concatenate([nextRootTrits, messageTrits]), sponge);
	    payload = arrayHelper.concatenate([payload, maskedNextRoot]);
	    // Calculate the nonce for the message so far
	    const hammingDiver$1 = new hammingDiver.HammingDiver();
	    const nonceTrits = hammingDiver$1.search(sponge.rate(iota_js_1__default['default'].Curl.STATE_LENGTH), channelState.security, iota_js_1__default['default'].Curl.HASH_LENGTH / 3, 0);
	    mask_1.mask(nonceTrits, sponge);
	    payload = arrayHelper.concatenate([payload, nonceTrits]);
	    // Create the signature and add the sibling information
	    const sig = issP27.signature(sponge.rate(), subtree.key);
	    const subtreeTrits = arrayHelper.concatenate(subtree.leaves.map(l => l.addressTrits));
	    const siblingsCount = subtreeTrits.length / iota_js_1__default['default'].Curl.HASH_LENGTH;
	    const encryptedSignature = mask_1.mask(arrayHelper.concatenate([sig, pascal.pascalEncode(siblingsCount), subtreeTrits]), sponge);
	    // Insert the signature and pad if necessary
	    payload = arrayHelper.concatenate([payload, encryptedSignature]);
	    const nextThird = payload.length % 3;
	    if (nextThird !== 0) {
	        payload = arrayHelper.concatenate([payload, new Int8Array(3 - nextThird).fill(0)]);
	    }
	    const messageAddress = channelState.mode === "public"
	        ? tree.root.addressTrits : mask_1.maskHash(tree.root.addressTrits);
	    const maskedAuthenticatedMessage = {
	        payload: trytesHelper.TrytesHelper.fromTrits(payload),
	        root: trytesHelper.TrytesHelper.fromTrits(tree.root.addressTrits),
	        address: trytesHelper.TrytesHelper.fromTrits(messageAddress)
	    };
	    if (channelState.index === channelState.count - 1) {
	        channelState.start = channelState.nextCount + channelState.start;
	        channelState.index = 0;
	    }
	    else {
	        channelState.index++;
	    }
	    channelState.nextRoot = trytesHelper.TrytesHelper.fromTrits(nextRootTrits);
	    return maskedAuthenticatedMessage;
	}
	exports.createMessage = createMessage;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYW0vY2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBcUM7QUFDckMscURBQWtEO0FBSWxELDZEQUEwRDtBQUMxRCxnREFBK0M7QUFDL0Msc0RBQW1EO0FBQ25ELDRDQUFrRDtBQUNsRCx3Q0FBK0M7QUFDL0MsNENBQStDO0FBQy9DLHdEQUFxRDtBQUVyRDs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsYUFBYSxDQUFDLElBQVksRUFBRSxRQUFnQixFQUFFLElBQWEsRUFBRSxPQUFnQjtJQUN6RixJQUFJLENBQUMsMkJBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0tBQ3REO0lBQ0QsSUFBSSxRQUFRLEdBQUcsQ0FBQyxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUU7UUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUMxRTtJQUNELHdCQUFlLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRS9CLE9BQU87UUFDSCxJQUFJO1FBQ0osSUFBSTtRQUNKLE9BQU8sRUFBRSxJQUFJLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFDNUUsUUFBUTtRQUNSLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxFQUFFLENBQUM7UUFDUixTQUFTLEVBQUUsQ0FBQztRQUNaLEtBQUssRUFBRSxDQUFDO0tBQ1gsQ0FBQztBQUNOLENBQUM7QUFuQkQsc0NBbUJDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLFdBQVcsQ0FBQyxZQUE4QjtJQUN0RCxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0tBQ3BEO0lBQ0QsSUFBSSxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtRQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7S0FDdEQ7SUFDRCxJQUFJLFlBQVksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO1FBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztLQUNyRDtJQUNELElBQUksWUFBWSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksWUFBWSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUU7UUFDeEQsTUFBTSxJQUFJLEtBQUssQ0FBQyx3REFBd0QsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDcEc7SUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLHVCQUFVLENBQ3ZCLFlBQVksQ0FBQyxJQUFJLEVBQ2pCLFlBQVksQ0FBQyxLQUFLLEVBQ2xCLFlBQVksQ0FBQyxLQUFLLEVBQ2xCLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUUzQixPQUFPLDJCQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQXJCRCxrQ0FxQkM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQWdCLGFBQWEsQ0FBQyxZQUE4QixFQUFFLE9BQWU7O0lBQ3pFLElBQUksQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7S0FDcEQ7SUFDRCxNQUFNLElBQUksR0FBRyxJQUFJLHVCQUFVLENBQ3ZCLFlBQVksQ0FBQyxJQUFJLEVBQ2pCLFlBQVksQ0FBQyxLQUFLLEVBQ2xCLFlBQVksQ0FBQyxLQUFLLEVBQ2xCLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQixNQUFNLFlBQVksR0FBRyxJQUFJLHVCQUFVLENBQy9CLFlBQVksQ0FBQyxJQUFJLEVBQ2pCLFlBQVksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUssRUFDdkMsWUFBWSxDQUFDLFNBQVMsRUFDdEIsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTNCLE1BQU0sYUFBYSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBRXJELE1BQU0sWUFBWSxHQUFHLDJCQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25ELE1BQU0sVUFBVSxHQUFHLHFCQUFZLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BELE1BQU0sa0JBQWtCLEdBQUcscUJBQVksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFN0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFcEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFNUIsTUFBTSxZQUFZLEdBQUcsMkJBQVksQ0FBQyxPQUFPLENBQUMsTUFBQSxZQUFZLENBQUMsT0FBTyxtQ0FBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV4RSxJQUFJLE9BQU8sR0FBRyx5QkFBVyxDQUFDLENBQUMsVUFBVSxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQztJQUU1RCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTFDLCtDQUErQztJQUMvQyxNQUFNLGNBQWMsR0FBRyxXQUFJLENBQUMseUJBQVcsQ0FBQyxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hGLE9BQU8sR0FBRyx5QkFBVyxDQUFDLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFFakQsNkNBQTZDO0lBQzdDLE1BQU0sWUFBWSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO0lBQ3hDLE1BQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBSSxDQUFDLFlBQVksQ0FBQyxFQUM5QixZQUFZLENBQUMsUUFBUSxFQUNyQixjQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQzFCLENBQUM7SUFDRixXQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pCLE9BQU8sR0FBRyx5QkFBVyxDQUFDLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFFN0MsdURBQXVEO0lBQ3ZELE1BQU0sR0FBRyxHQUFHLG1CQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsRCxNQUFNLFlBQVksR0FBRyx5QkFBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDMUUsTUFBTSxhQUFhLEdBQUcsWUFBWSxDQUFDLE1BQU0sR0FBRyxjQUFJLENBQUMsV0FBVyxDQUFDO0lBRTdELE1BQU0sa0JBQWtCLEdBQUcsV0FBSSxDQUFDLHlCQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUscUJBQVksQ0FBQyxhQUFhLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXZHLDRDQUE0QztJQUM1QyxPQUFPLEdBQUcseUJBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7SUFDckQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDckMsSUFBSSxTQUFTLEtBQUssQ0FBQyxFQUFFO1FBQ2pCLE9BQU8sR0FBRyx5QkFBVyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksU0FBUyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzFFO0lBRUQsTUFBTSxjQUFjLEdBQUcsWUFBWSxDQUFDLElBQUksS0FBSyxRQUFRO1FBQ2pELENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsZUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFaEUsTUFBTSwwQkFBMEIsR0FBZ0I7UUFDNUMsT0FBTyxFQUFFLDJCQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUN4QyxJQUFJLEVBQUUsMkJBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDcEQsT0FBTyxFQUFFLDJCQUFZLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztLQUNsRCxDQUFDO0lBRUYsSUFBSSxZQUFZLENBQUMsS0FBSyxLQUFLLFlBQVksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO1FBQy9DLFlBQVksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ2pFLFlBQVksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0tBQzFCO1NBQU07UUFDSCxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDeEI7SUFFRCxZQUFZLENBQUMsUUFBUSxHQUFHLDJCQUFZLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRTlELE9BQU8sMEJBQTBCLENBQUM7QUFDdEMsQ0FBQztBQWhGRCxzQ0FnRkMifQ==
	});

	var parser = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseMessage = void 0;






	/**
	 * Parse the trytes back to the original message.
	 * @param payload The trytes to decode.
	 * @param root The root for the message.
	 * @param channelKey The key used to encode the data.
	 * @returns The decoded message.
	 */
	function parseMessage(payload, root, channelKey) {
	    const payloadTrits = trytesHelper.TrytesHelper.toTrits(payload);
	    const rootTrits = trytesHelper.TrytesHelper.toTrits(root);
	    const channelKeyTrits = trytesHelper.TrytesHelper.toTrits(channelKey !== null && channelKey !== void 0 ? channelKey : "9".repeat(81));
	    // Get data positions in payload
	    const indexData = pascal.pascalDecode(payloadTrits);
	    const index = indexData.value;
	    const messageData = pascal.pascalDecode(payloadTrits.slice(indexData.end));
	    const messageLength = messageData.value;
	    const nextRootStart = indexData.end + messageData.end;
	    const messageStart = nextRootStart + iota_js_1__default['default'].Curl.HASH_LENGTH;
	    const messageEnd = messageStart + messageLength;
	    // Hash the key, root and payload
	    const sponge = new iota_js_1__default['default'].Curl(27);
	    sponge.absorb(channelKeyTrits, 0, channelKeyTrits.length);
	    sponge.absorb(rootTrits, 0, rootTrits.length);
	    sponge.absorb(payloadTrits, 0, nextRootStart);
	    // Decrypt the metadata
	    const nextRoot = mask_1.unmask(payloadTrits.slice(nextRootStart, nextRootStart + iota_js_1__default['default'].Curl.HASH_LENGTH), sponge);
	    const message = mask_1.unmask(payloadTrits.slice(messageStart, messageStart + messageLength), sponge);
	    const nonce = mask_1.unmask(payloadTrits.slice(messageEnd, messageEnd + (iota_js_1__default['default'].Curl.HASH_LENGTH / 3)), sponge);
	    const hmac = sponge.rate();
	    // Check the security level is valid
	    const securityLevel = issP27.checksumSecurity(hmac);
	    if (securityLevel === 0) {
	        throw new Error("Message Hash did not have a hamming weight of zero, security level is invalid");
	    }
	    // Decrypt the rest of the payload
	    const decryptedMetadata = mask_1.unmask(payloadTrits.slice(messageEnd + nonce.length), sponge);
	    sponge.reset();
	    // Get the signature and absorb its digest
	    const signature = decryptedMetadata.slice(0, securityLevel * issP27.PRIVATE_KEY_FRAGMENT_LENGTH);
	    const digest = issP27.digestFromSignature(hmac, signature);
	    sponge.absorb(digest, 0, digest.length);
	    // Get the sibling information and validate it
	    const siblingsCountData = pascal.pascalDecode(decryptedMetadata.slice(securityLevel * issP27.PRIVATE_KEY_FRAGMENT_LENGTH));
	    const siblingsCount = siblingsCountData.value;
	    let recalculatedRoot = sponge.rate();
	    if (siblingsCount !== 0) {
	        const siblingsStart = (securityLevel * issP27.PRIVATE_KEY_FRAGMENT_LENGTH) + siblingsCountData.end;
	        const siblings = decryptedMetadata.slice(siblingsStart, siblingsStart + (siblingsCount * iota_js_1__default['default'].Curl.HASH_LENGTH));
	        recalculatedRoot = merkleTree.MerkleTree.root(recalculatedRoot, siblings, index);
	    }
	    // Make sure the root matches the calculated one
	    if (trytesHelper.TrytesHelper.fromTrits(recalculatedRoot) !== root) {
	        throw new Error("Signature did not match expected root");
	    }
	    return {
	        nextRoot: trytesHelper.TrytesHelper.fromTrits(nextRoot),
	        message: trytesHelper.TrytesHelper.fromTrits(message)
	    };
	}
	exports.parseMessage = parseMessage;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXFDO0FBQ3JDLHFEQUFrRDtBQUNsRCxnREFBd0c7QUFDeEcsd0NBQXVDO0FBQ3ZDLDRDQUErQztBQUMvQyx3REFBcUQ7QUFFckQ7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsWUFBWSxDQUFDLE9BQWUsRUFBRSxJQUFZLEVBQUUsVUFBbUI7SUFVM0UsTUFBTSxZQUFZLEdBQUcsMkJBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkQsTUFBTSxTQUFTLEdBQUcsMkJBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsTUFBTSxlQUFlLEdBQUcsMkJBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxhQUFWLFVBQVUsY0FBVixVQUFVLEdBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRTNFLGdDQUFnQztJQUNoQyxNQUFNLFNBQVMsR0FBRyxxQkFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzdDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7SUFDOUIsTUFBTSxXQUFXLEdBQUcscUJBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFDeEMsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDO0lBQ3RELE1BQU0sWUFBWSxHQUFHLGFBQWEsR0FBRyxjQUFJLENBQUMsV0FBVyxDQUFDO0lBQ3RELE1BQU0sVUFBVSxHQUFHLFlBQVksR0FBRyxhQUFhLENBQUM7SUFFaEQsaUNBQWlDO0lBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUksY0FBSSxD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
	});

	var client = createCommonjsModule(function (module, exports) {
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.decodeMessages = exports.mamFetchAll = exports.decodeAddress = exports.mamFetch = exports.mamAttach = void 0;





	/**
	 * Attach the mam message to the tangle.
	 * @param client The client or node endpoint to use for sending.
	 * @param mamMessage The message to attach.
	 * @param tag Optional tag for the transactions.
	 * @returns The transactions that were attached.
	 */
	function mamAttach(client, mamMessage, tag) {
	    return __awaiter(this, void 0, void 0, function* () {
	        if (tag !== undefined && typeof tag !== "string") {
	            throw new Error("MWM and depth are no longer needed when calling mamAttach");
	        }
	        const tagLength = tag ? tag.length : 0;
	        if (tagLength > 27) {
	            throw new Error("The tag length is too long");
	        }
	        const packedTag = tag ? trytesHelper.TrytesHelper.packTrytes(tag) : undefined;
	        const packedTaglength = packedTag ? packedTag.length : 0;
	        const packedData = trytesHelper.TrytesHelper.packTrytes(mamMessage.payload);
	        const data = new Uint8Array(1 + packedTaglength + packedData.length);
	        data[0] = packedTaglength;
	        if (packedTag) {
	            data.set(packedTag, 1);
	        }
	        data.set(packedData, 1 + packedTaglength);
	        const hashedAddress = iota_js_1__default['default'].Blake2b.sum256(iota_js_1__default['default'].Converter.utf8ToBytes(mamMessage.address));
	        const indexationPayload = {
	            type: iota_js_1__default['default'].INDEXATION_PAYLOAD_TYPE,
	            index: iota_js_1__default['default'].Converter.bytesToHex(hashedAddress),
	            data: iota_js_1__default['default'].Converter.bytesToHex(data)
	        };
	        const message = {
	            payload: indexationPayload
	        };
	        const localClient = typeof client === "string" ? new iota_js_1__default['default'].SingleNodeClient(client) : client;
	        const messageId = yield localClient.messageSubmit(message);
	        return {
	            message,
	            messageId
	        };
	    });
	}
	exports.mamAttach = mamAttach;
	/**
	 * Fetch a mam message from a channel.
	 * @param client The client or node endpoint to use for fetching.
	 * @param root The root within the mam channel to fetch the message.
	 * @param mode The mode to use for fetching.
	 * @param sideKey The sideKey if mode is restricted.
	 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
	 * throws exception if transactions found on address are invalid.
	 */
	function mamFetch(client, root, mode, sideKey) {
	    return __awaiter(this, void 0, void 0, function* () {
	        guards.validateModeKey(mode, sideKey);
	        const localClient = typeof client === "string" ? new iota_js_1__default['default'].SingleNodeClient(client) : client;
	        const messageAddress = decodeAddress(root, mode);
	        const hashedAddress = iota_js_1__default['default'].Blake2b.sum256(iota_js_1__default['default'].Converter.utf8ToBytes(messageAddress));
	        try {
	            const messagesResponse = yield localClient.messagesFind(hashedAddress);
	            const messages = [];
	            for (const messageId of messagesResponse.messageIds) {
	                try {
	                    const message = yield localClient.message(messageId);
	                    messages.push(message);
	                }
	                catch (_a) { }
	            }
	            return yield decodeMessages(messages, root, sideKey);
	        }
	        catch (_b) { }
	    });
	}
	exports.mamFetch = mamFetch;
	/**
	 * Decodes the root to its associated address.
	 * @param root The root to device.
	 * @param mode The mode for the channel.
	 * @returns The decoded address.
	 */
	function decodeAddress(root, mode) {
	    return mode === "public"
	        ? root
	        : trytesHelper.TrytesHelper.fromTrits(mask_1.maskHash(trytesHelper.TrytesHelper.toTrits(root)));
	}
	exports.decodeAddress = decodeAddress;
	/**
	 * Fetch all the mam message from a channel.
	 * If limit is undefined we use Number.MAX_VALUE, this could potentially take a long time to complete.
	 * It is preferable to specify the limit so you read the data in chunks, then if you read and get the
	 * same amount of messages as your limit you should probably read again.
	 * @param client The client or node endpoint to use for fetching.
	 * @param root The root within the mam channel to fetch the message.
	 * @param mode The mode to use for fetching.
	 * @param sideKey The sideKey if mode is restricted.
	 * @param limit Limit the number of messages retrieved.
	 * @returns The array of retrieved messages.
	 */
	function mamFetchAll(client, root, mode, sideKey, limit) {
	    return __awaiter(this, void 0, void 0, function* () {
	        const localClient = typeof client === "string" ? new iota_js_1__default['default'].SingleNodeClient(client) : client;
	        guards.validateModeKey(mode, sideKey);
	        const localLimit = limit === undefined ? Number.MAX_VALUE : limit;
	        const messages = [];
	        let fetchRoot = root;
	        do {
	            const fetched = yield mamFetch(localClient, fetchRoot, mode, sideKey);
	            if (fetched) {
	                messages.push(fetched);
	                fetchRoot = fetched.nextRoot;
	            }
	            else {
	                fetchRoot = undefined;
	            }
	        } while (fetchRoot && messages.length < localLimit);
	        return messages;
	    });
	}
	exports.mamFetchAll = mamFetchAll;
	/**
	 * Decode messages from an address to try and find a MAM message.
	 * @param messages The objects returned from the fetch.
	 * @param root The root within the mam channel to fetch the message.
	 * @param sideKey The sideKey if mode is restricted.
	 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
	 * throws exception if transactions found on address are invalid.
	 */
	function decodeMessages(messages, root, sideKey) {
	    var _a;
	    return __awaiter(this, void 0, void 0, function* () {
	        if (!messages || messages.length === 0) {
	            return;
	        }
	        for (const message of messages) {
	            // We only use indexation payload for storing mam messages
	            if (((_a = message.payload) === null || _a === void 0 ? void 0 : _a.type) === iota_js_1__default['default'].INDEXATION_PAYLOAD_TYPE && message.payload.data) {
	                const payloadBytes = iota_js_1__default['default'].Converter.hexToBytes(message.payload.data);
	                // We have a minimum size for the message payload
	                if (payloadBytes.length > 100) {
	                    const packedTagLength = payloadBytes[0];
	                    const packedTag = packedTagLength > 0 ? payloadBytes.slice(1, 1 + packedTagLength) : undefined;
	                    const packedData = payloadBytes.slice(1 + packedTagLength);
	                    const tag = packedTag ? trytesHelper.TrytesHelper.unpackTrytes(packedTag) : "";
	                    const data = trytesHelper.TrytesHelper.unpackTrytes(packedData);
	                    try {
	                        const parsed = parser.parseMessage(data, root, sideKey);
	                        return Object.assign(Object.assign({ root }, parsed), { tag });
	                    }
	                    catch (_b) { }
	                }
	            }
	        }
	    });
	}
	exports.decodeMessages = decodeMessages;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXdKO0FBSXhKLDRDQUFrRDtBQUNsRCx3Q0FBeUM7QUFDekMsd0RBQXFEO0FBQ3JELHFDQUF3QztBQUV4Qzs7Ozs7O0dBTUc7QUFDSCxTQUFzQixTQUFTLENBQzNCLE1BQXdCLEVBQ3hCLFVBQXVCLEVBQ3ZCLEdBQVk7O1FBSVosSUFBSSxHQUFHLEtBQUssU0FBUyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUM5QyxNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7U0FDaEY7UUFDRCxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLFNBQVMsR0FBRyxFQUFFLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQywyQkFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2pFLE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sVUFBVSxHQUFHLDJCQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUvRCxNQUFNLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEdBQUcsZUFBZSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDO1FBQzFCLElBQUksU0FBUyxF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
	});

	var IMamChannelState = /*#__PURE__*/Object.defineProperty({

	}, '__esModule', {value: true});

	var IMamFetchedMessage = /*#__PURE__*/Object.defineProperty({

	}, '__esModule', {value: true});

	var IMamMessage = /*#__PURE__*/Object.defineProperty({

	}, '__esModule', {value: true});

	var mamMode = /*#__PURE__*/Object.defineProperty({

	}, '__esModule', {value: true});

	var es = createCommonjsModule(function (module, exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(channel, exports);
	__exportStar(client, exports);
	__exportStar(parser, exports);
	__exportStar(IMamChannelState, exports);
	__exportStar(IMamFetchedMessage, exports);
	__exportStar(IMamMessage, exports);
	__exportStar(mamMode, exports);
	__exportStar(trytesHelper, exports);
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQThCO0FBQzlCLCtDQUE2QjtBQUM3QiwrQ0FBNkI7QUFDN0IsNERBQTBDO0FBQzFDLDhEQUE0QztBQUM1Qyx1REFBcUM7QUFDckMsbURBQWlDO0FBQ2pDLHVEQUFxQyJ9
	});

	var index = /*@__PURE__*/getDefaultExportFromCjs(es);

	return index;

})));
