(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@iota/iota2.js'), require('big-integer')) :
	typeof define === 'function' && define.amd ? define(['@iota/iota2.js', 'big-integer'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.mam = factory(global.iota2_js_1, global.bigInt));
}(this, (function (iota2_js_1, require$$0) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var iota2_js_1__default = /*#__PURE__*/_interopDefaultLegacy(iota2_js_1);
	var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var curl = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Curl = void 0;
	/**
	 * Class to implement Curl sponge.
	 * @private
	 */
	class Curl {
	    /**
	     * Create a new instance of Curl.
	     * @param rounds The number of rounds to perform.
	     */
	    constructor(rounds = Curl.NUMBER_OF_ROUNDS) {
	        if (rounds !== 27 && rounds !== 81) {
	            throw new Error("Illegal number of rounds. Only `27` and `81` rounds are supported.");
	        }
	        this._state = new Int8Array(Curl.STATE_LENGTH);
	        this._rounds = rounds;
	    }
	    /**
	     * Resets the state
	     */
	    reset() {
	        this._state = new Int8Array(Curl.STATE_LENGTH);
	    }
	    /**
	     * Get the state of the sponge.
	     * @param len The length of the state to get.
	     * @returns The state.
	     */
	    rate(len = Curl.HASH_LENGTH) {
	        return this._state.slice(0, len);
	    }
	    /**
	     * Absorbs trits given an offset and length
	     * @param trits The trits to absorb.
	     * @param offset The offset to start abororbing from the array.
	     * @param length The length of trits to absorb.
	     */
	    absorb(trits, offset, length) {
	        do {
	            const limit = length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH;
	            this._state.set(trits.subarray(offset, offset + limit));
	            this.transform();
	            length -= Curl.HASH_LENGTH;
	            offset += limit;
	        } while (length > 0);
	    }
	    /**
	     * Squeezes trits given an offset and length
	     * @param trits The trits to squeeze.
	     * @param offset The offset to start squeezing from the array.
	     * @param length The length of trits to squeeze.
	     */
	    squeeze(trits, offset, length) {
	        do {
	            const limit = length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH;
	            trits.set(this._state.subarray(0, limit), offset);
	            this.transform();
	            length -= Curl.HASH_LENGTH;
	            offset += limit;
	        } while (length > 0);
	    }
	    /**
	     * Sponge transform function
	     */
	    transform() {
	        let stateCopy;
	        let index = 0;
	        for (let round = 0; round < this._rounds; round++) {
	            stateCopy = this._state.slice();
	            for (let i = 0; i < Curl.STATE_LENGTH; i++) {
	                this._state[i] =
	                    // eslint-disable-next-line no-bitwise
	                    Curl.TRUTH_TABLE[stateCopy[index] + (stateCopy[(index += index < 365 ? 364 : -365)] << 2) + 5];
	            }
	        }
	    }
	}
	exports.Curl = Curl;
	/**
	 * The Hash Length
	 */
	Curl.HASH_LENGTH = 243;
	/**
	 * The State Length.
	 */
	Curl.STATE_LENGTH = 3 * Curl.HASH_LENGTH;
	/**
	 * The default number of rounds.
	 */
	Curl.NUMBER_OF_ROUNDS = 81;
	/**
	 * Truth Table.
	 */
	Curl.TRUTH_TABLE = [1, 0, -1, 2, 1, -1, 0, 2, -1, 1, 0];

	});

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
	}
	exports.TrytesHelper = TrytesHelper;
	/**
	 * All the characters that can be used in trytes.
	 */
	TrytesHelper.ALPHABET = "9ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	/**
	 * Trytes to trits lookup table.
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

	});

	var issP27 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.digestFromSignature = exports.checksumSecurity = exports.signature = exports.privateKeyFromSubseed = exports.address = exports.digestFromSubseed = exports.subseed = exports.PRIVATE_KEY_FRAGMENT_LENGTH = void 0;

	const PRIVATE_KEY_NUM_FRAGMENTS = 27;
	exports.PRIVATE_KEY_FRAGMENT_LENGTH = PRIVATE_KEY_NUM_FRAGMENTS * curl.Curl.HASH_LENGTH;
	const MIN_TRYTE_VALUE = -13;
	const MAX_TRYTE_VALUE = 13;
	const MIN_TRIT_VALUE = -1;
	const MAX_TRIT_VALUE = 1;
	/**
	 * Calculate the subseed for the seed.
	 * @param seed The seed trits.
	 * @param index The index for the subseed.
	 * @returns The subseed trits.
	 * @private
	 */
	function subseed(seed, index) {
	    const sponge = new curl.Curl(27);
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
	    const ss = new Int8Array(curl.Curl.HASH_LENGTH);
	    sponge.squeeze(ss, 0, ss.length);
	    return ss;
	}
	exports.subseed = subseed;
	/**
	 * Get the digest from the subseed.
	 * @param subSeed The subseed to get the digest for.
	 * @param securityLevel The security level to get the digest.
	 * @returns The digest trits.
	 * @private
	 */
	function digestFromSubseed(subSeed, securityLevel) {
	    const curl1 = new curl.Curl(27);
	    const curl2 = new curl.Curl(27);
	    const curl3 = new curl.Curl(27);
	    const length = securityLevel * exports.PRIVATE_KEY_FRAGMENT_LENGTH / curl.Curl.HASH_LENGTH;
	    const digest = new Int8Array(curl.Curl.HASH_LENGTH);
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
	 * @private
	 */
	function address(digests) {
	    const sponge = new curl.Curl(27);
	    sponge.absorb(digests, 0, digests.length);
	    const addressTrits = new Int8Array(curl.Curl.HASH_LENGTH);
	    sponge.squeeze(addressTrits, 0, addressTrits.length);
	    return addressTrits;
	}
	exports.address = address;
	/**
	 * Get the private key from the subseed.
	 * @param subSeed The subseed to get the private key for.
	 * @param securityLevel The security level for the private key.
	 * @returns The private key trits.
	 * @private
	 */
	function privateKeyFromSubseed(subSeed, securityLevel) {
	    const keyLength = securityLevel * exports.PRIVATE_KEY_FRAGMENT_LENGTH;
	    const keyTrits = new Int8Array(keyLength);
	    const actualKeyTrits = new Int8Array(keyLength);
	    const sponge = new curl.Curl(27);
	    sponge.absorb(subSeed, 0, subSeed.length);
	    sponge.squeeze(keyTrits, 0, keyTrits.length);
	    for (let i = 0; i < keyLength / curl.Curl.HASH_LENGTH; i++) {
	        const offset = i * curl.Curl.HASH_LENGTH;
	        sponge.reset();
	        sponge.absorb(keyTrits, offset, curl.Curl.HASH_LENGTH);
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
	 * @private
	 */
	function signature(hashTrits, key) {
	    const signatures = new Int8Array(key.length);
	    const sponge = new curl.Curl(27);
	    for (let i = 0; i < key.length / curl.Curl.HASH_LENGTH; i++) {
	        let buffer = key.subarray(i * curl.Curl.HASH_LENGTH, (i + 1) * curl.Curl.HASH_LENGTH);
	        for (let k = 0; k < MAX_TRYTE_VALUE - (hashTrits[i * 3] + (hashTrits[(i * 3) + 1] * 3) + (hashTrits[(i * 3) + 2] * 9)); k++) {
	            sponge.reset();
	            sponge.absorb(buffer, 0, buffer.length);
	            buffer = sponge.rate();
	        }
	        signatures.set(buffer, i * curl.Curl.HASH_LENGTH);
	    }
	    return signatures;
	}
	exports.signature = signature;
	/**
	 * Check the security level.
	 * @param hash The hash to check.
	 * @returns The security level
	 * @private
	 */
	function checksumSecurity(hash) {
	    if (hash.slice(0, curl.Curl.HASH_LENGTH / 3).reduce((a, b) => a + b, 0) === 0) {
	        return 1;
	    }
	    if (hash.slice(0, 2 * curl.Curl.HASH_LENGTH / 3).reduce((a, b) => a + b, 0) === 0) {
	        return 2;
	    }
	    return hash.reduce((a, b) => a + b, 0) === 0 ? 3 : 0;
	}
	exports.checksumSecurity = checksumSecurity;
	/**
	 * Get the digest from the signature
	 * @param hash The hash to get the digest.
	 * @param sig The signature.
	 * @returns The digest.
	 * @private
	 */
	function digestFromSignature(hash, sig) {
	    const sponge = new curl.Curl(27);
	    const buffer = new Int8Array(sig.length);
	    for (let i = 0; i < (sig.length / curl.Curl.HASH_LENGTH); i++) {
	        let innerBuffer = sig.slice(i * curl.Curl.HASH_LENGTH, (i + 1) * curl.Curl.HASH_LENGTH);
	        for (let j = 0; j < (hash[i * 3] + (hash[(i * 3) + 1] * 3) + (hash[(i * 3) + 2] * 9)) - MIN_TRYTE_VALUE; j++) {
	            sponge.reset();
	            sponge.absorb(innerBuffer, 0, innerBuffer.length);
	            innerBuffer = sponge.rate();
	        }
	        buffer.set(innerBuffer, i * curl.Curl.HASH_LENGTH);
	    }
	    sponge.reset();
	    sponge.absorb(buffer, 0, buffer.length);
	    return sponge.rate();
	}
	exports.digestFromSignature = digestFromSignature;

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
	 * @private
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

	});

	var merkleNode = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MerkleNode = void 0;
	/**
	 * Class to represent a node in a merkle tree.
	 * @private
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

	});

	var merkleTree = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MerkleTree = void 0;




	/**
	 * Class to represent a merkle tree.
	 * @private
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
	        const sponge = new curl.Curl(27);
	        let i = 1;
	        const numChunks = Math.ceil(siblings.length / curl.Curl.HASH_LENGTH);
	        for (let c = 0; c < numChunks; c++) {
	            const chunk = siblings.slice(c * curl.Curl.HASH_LENGTH, (c + 1) * curl.Curl.HASH_LENGTH);
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
	                key: ((_a = this.root.left) === null || _a === void 0 ? void 0 : _a.privateKeyTrits) ? this.root.left.privateKeyTrits : new Int8Array(),
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
	                const sponge = new curl.Curl(27);
	                sponge.absorb(left.addressTrits, 0, left.addressTrits.length);
	                sponge.absorb(right.addressTrits, 0, right.addressTrits.length);
	                addressTrits = new Int8Array(curl.Curl.HASH_LENGTH);
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

	});

	var pascal = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.roundThird = exports.pascalDecode = exports.pascalEncode = void 0;

	/* eslint-disable no-bitwise */
	const ZERO = new Int8Array([1, 0, 0, -1]);
	const RADIX = 3;
	const TRITS_PER_TRYTE = 3;
	/**
	 * Perform pascal encoding of the value.
	 * @param value The value to encode.
	 * @returns The trits for the encoded value.
	 * @private
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
	 * @private
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
	 * @private
	 */
	function encodedLength(value) {
	    const length = roundThird(minTrits(Math.abs(value), 1));
	    return length + (length / RADIX);
	}
	/**
	 * Round the number to the third.
	 * @param value The value to round.
	 * @returns The rounded number.
	 * @private
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
	 * @private
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
	 * @private
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
	 * @private
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
	 * @private
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
	 * @private
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
	        let size = Math.min(length, curl.Curl.HASH_LENGTH) - offset;
	        let index = 0;
	        while (index === 0) {
	            const incrementResult = this.increment(state, offset + (size * 2 / 3), offset + size);
	            size = Math.min(pascal.roundThird(offset + (size * 2 / 3) + incrementResult), curl.Curl.HASH_LENGTH) - offset;
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
	        const initialState = this.tritsToBigInt(trits, curl.Curl.STATE_LENGTH);
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
	                low: searchStates.low.slice(0, curl.Curl.STATE_LENGTH),
	                high: searchStates.high.slice(0, curl.Curl.STATE_LENGTH)
	            };
	            for (let stateIndex = 0; stateIndex < curl.Curl.STATE_LENGTH; stateIndex++) {
	                const alpha = curlScratchpad.low[curlScratchpadIndex];
	                const beta = curlScratchpad.high[curlScratchpadIndex];
	                if (curlScratchpadIndex < 365) {
	                    curlScratchpadIndex += 364;
	                }
	                else {
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

	});

	var arrayHelper = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.concatenate = void 0;
	/**
	 * Concatentate a list of arrays.
	 * @param arrays The arrays to concatenate.
	 * @returns The concatenated arrays.
	 * @private
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

	});

	var guards = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.validateModeKey = void 0;

	/**
	 * Validate the mode and key.
	 * @param mode The mamMode to validate.
	 * @param sideKey The sideKey to validate.
	 * @private
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

	});

	var mask_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.unmask = exports.mask = exports.maskHash = void 0;

	/**
	 * Create the mask hash for the key.
	 * @param keyTrits The key to create the mask hash for.
	 * @returns The masked hash.
	 * @private
	 */
	function maskHash(keyTrits) {
	    const sponge = new curl.Curl(81);
	    sponge.absorb(keyTrits, 0, keyTrits.length);
	    const finalKeyTrits = new Int8Array(curl.Curl.HASH_LENGTH);
	    sponge.squeeze(finalKeyTrits, 0, finalKeyTrits.length);
	    return finalKeyTrits;
	}
	exports.maskHash = maskHash;
	/**
	 * Apply mask to the payload.
	 * @param payload The payload to apply the mask to.
	 * @param sponge The sponge to use.
	 * @returns The masked payload.
	 * @private
	 */
	function mask(payload, sponge) {
	    const keyChunk = sponge.rate();
	    const numChunks = Math.ceil(payload.length / curl.Curl.HASH_LENGTH);
	    for (let c = 0; c < numChunks; c++) {
	        const chunk = payload.slice(c * curl.Curl.HASH_LENGTH, (c + 1) * curl.Curl.HASH_LENGTH);
	        sponge.absorb(chunk, 0, chunk.length);
	        const state = sponge.rate();
	        for (let i = 0; i < chunk.length; i++) {
	            payload[(c * curl.Curl.HASH_LENGTH) + i] = tritSum(chunk[i], keyChunk[i]);
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
	 * @private
	 */
	function unmask(payload, sponge) {
	    const unmasked = new Int8Array(payload);
	    const limit = Math.ceil(unmasked.length / curl.Curl.HASH_LENGTH) * curl.Curl.HASH_LENGTH;
	    let state;
	    for (let c = 0; c < limit; c++) {
	        const indexInChunk = c % curl.Curl.HASH_LENGTH;
	        if (indexInChunk === 0) {
	            state = sponge.rate();
	        }
	        if (state) {
	            unmasked[c] = tritSum(unmasked[c], -state[indexInChunk]);
	        }
	        if (indexInChunk === curl.Curl.HASH_LENGTH - 1) {
	            sponge.absorb(unmasked, Math.floor(c / curl.Curl.HASH_LENGTH) * curl.Curl.HASH_LENGTH, curl.Curl.HASH_LENGTH);
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
	 * @private
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
	    const sponge = new curl.Curl(27);
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
	    const nonceTrits = hammingDiver$1.search(sponge.rate(curl.Curl.STATE_LENGTH), channelState.security, curl.Curl.HASH_LENGTH / 3, 0);
	    mask_1.mask(nonceTrits, sponge);
	    payload = arrayHelper.concatenate([payload, nonceTrits]);
	    // Create the signature and add the sibling information
	    const sig = issP27.signature(sponge.rate(), subtree.key);
	    const subtreeTrits = arrayHelper.concatenate(subtree.leaves.map(l => l.addressTrits));
	    const siblingsCount = subtreeTrits.length / curl.Curl.HASH_LENGTH;
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

	});

	var ERROR_MSG_INPUT = 'Input must be an string, Buffer or Uint8Array';

	// For convenience, let people hash a string, not just a Uint8Array
	function normalizeInput (input) {
	  var ret;
	  if (input instanceof Uint8Array) {
	    ret = input;
	  } else if (input instanceof Buffer) {
	    ret = new Uint8Array(input);
	  } else if (typeof (input) === 'string') {
	    ret = new Uint8Array(Buffer.from(input, 'utf8'));
	  } else {
	    throw new Error(ERROR_MSG_INPUT)
	  }
	  return ret
	}

	// Converts a Uint8Array to a hexadecimal string
	// For example, toHex([255, 0, 255]) returns "ff00ff"
	function toHex (bytes) {
	  return Array.prototype.map.call(bytes, function (n) {
	    return (n < 16 ? '0' : '') + n.toString(16)
	  }).join('')
	}

	// Converts any value in [0...2^32-1] to an 8-character hex string
	function uint32ToHex (val) {
	  return (0x100000000 + val).toString(16).substring(1)
	}

	// For debugging: prints out hash state in the same format as the RFC
	// sample computation exactly, so that you can diff
	function debugPrint (label, arr, size) {
	  var msg = '\n' + label + ' = ';
	  for (var i = 0; i < arr.length; i += 2) {
	    if (size === 32) {
	      msg += uint32ToHex(arr[i]).toUpperCase();
	      msg += ' ';
	      msg += uint32ToHex(arr[i + 1]).toUpperCase();
	    } else if (size === 64) {
	      msg += uint32ToHex(arr[i + 1]).toUpperCase();
	      msg += uint32ToHex(arr[i]).toUpperCase();
	    } else throw new Error('Invalid size ' + size)
	    if (i % 6 === 4) {
	      msg += '\n' + new Array(label.length + 4).join(' ');
	    } else if (i < arr.length - 2) {
	      msg += ' ';
	    }
	  }
	  console.log(msg);
	}

	// For performance testing: generates N bytes of input, hashes M times
	// Measures and prints MB/second hash performance each time
	function testSpeed (hashFn, N, M) {
	  var startMs = new Date().getTime();

	  var input = new Uint8Array(N);
	  for (var i = 0; i < N; i++) {
	    input[i] = i % 256;
	  }
	  var genMs = new Date().getTime();
	  console.log('Generated random input in ' + (genMs - startMs) + 'ms');
	  startMs = genMs;

	  for (i = 0; i < M; i++) {
	    var hashHex = hashFn(input);
	    var hashMs = new Date().getTime();
	    var ms = hashMs - startMs;
	    startMs = hashMs;
	    console.log('Hashed in ' + ms + 'ms: ' + hashHex.substring(0, 20) + '...');
	    console.log(Math.round(N / (1 << 20) / (ms / 1000) * 100) / 100 + ' MB PER SECOND');
	  }
	}

	var util = {
	  normalizeInput: normalizeInput,
	  toHex: toHex,
	  debugPrint: debugPrint,
	  testSpeed: testSpeed
	};

	// Blake2B in pure Javascript
	// Adapted from the reference implementation in RFC7693
	// Ported to Javascript by DC - https://github.com/dcposch



	// 64-bit unsigned addition
	// Sets v[a,a+1] += v[b,b+1]
	// v should be a Uint32Array
	function ADD64AA (v, a, b) {
	  var o0 = v[a] + v[b];
	  var o1 = v[a + 1] + v[b + 1];
	  if (o0 >= 0x100000000) {
	    o1++;
	  }
	  v[a] = o0;
	  v[a + 1] = o1;
	}

	// 64-bit unsigned addition
	// Sets v[a,a+1] += b
	// b0 is the low 32 bits of b, b1 represents the high 32 bits
	function ADD64AC (v, a, b0, b1) {
	  var o0 = v[a] + b0;
	  if (b0 < 0) {
	    o0 += 0x100000000;
	  }
	  var o1 = v[a + 1] + b1;
	  if (o0 >= 0x100000000) {
	    o1++;
	  }
	  v[a] = o0;
	  v[a + 1] = o1;
	}

	// Little-endian byte access
	function B2B_GET32 (arr, i) {
	  return (arr[i] ^
	  (arr[i + 1] << 8) ^
	  (arr[i + 2] << 16) ^
	  (arr[i + 3] << 24))
	}

	// G Mixing function
	// The ROTRs are inlined for speed
	function B2B_G (a, b, c, d, ix, iy) {
	  var x0 = m[ix];
	  var x1 = m[ix + 1];
	  var y0 = m[iy];
	  var y1 = m[iy + 1];

	  ADD64AA(v, a, b); // v[a,a+1] += v[b,b+1] ... in JS we must store a uint64 as two uint32s
	  ADD64AC(v, a, x0, x1); // v[a, a+1] += x ... x0 is the low 32 bits of x, x1 is the high 32 bits

	  // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated to the right by 32 bits
	  var xor0 = v[d] ^ v[a];
	  var xor1 = v[d + 1] ^ v[a + 1];
	  v[d] = xor1;
	  v[d + 1] = xor0;

	  ADD64AA(v, c, d);

	  // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 24 bits
	  xor0 = v[b] ^ v[c];
	  xor1 = v[b + 1] ^ v[c + 1];
	  v[b] = (xor0 >>> 24) ^ (xor1 << 8);
	  v[b + 1] = (xor1 >>> 24) ^ (xor0 << 8);

	  ADD64AA(v, a, b);
	  ADD64AC(v, a, y0, y1);

	  // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated right by 16 bits
	  xor0 = v[d] ^ v[a];
	  xor1 = v[d + 1] ^ v[a + 1];
	  v[d] = (xor0 >>> 16) ^ (xor1 << 16);
	  v[d + 1] = (xor1 >>> 16) ^ (xor0 << 16);

	  ADD64AA(v, c, d);

	  // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 63 bits
	  xor0 = v[b] ^ v[c];
	  xor1 = v[b + 1] ^ v[c + 1];
	  v[b] = (xor1 >>> 31) ^ (xor0 << 1);
	  v[b + 1] = (xor0 >>> 31) ^ (xor1 << 1);
	}

	// Initialization Vector
	var BLAKE2B_IV32 = new Uint32Array([
	  0xF3BCC908, 0x6A09E667, 0x84CAA73B, 0xBB67AE85,
	  0xFE94F82B, 0x3C6EF372, 0x5F1D36F1, 0xA54FF53A,
	  0xADE682D1, 0x510E527F, 0x2B3E6C1F, 0x9B05688C,
	  0xFB41BD6B, 0x1F83D9AB, 0x137E2179, 0x5BE0CD19
	]);

	var SIGMA8 = [
	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
	  11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
	  7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
	  9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
	  2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
	  12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
	  13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
	  6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
	  10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0,
	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3
	];

	// These are offsets into a uint64 buffer.
	// Multiply them all by 2 to make them offsets into a uint32 buffer,
	// because this is Javascript and we don't have uint64s
	var SIGMA82 = new Uint8Array(SIGMA8.map(function (x) { return x * 2 }));

	// Compression function. 'last' flag indicates last block.
	// Note we're representing 16 uint64s as 32 uint32s
	var v = new Uint32Array(32);
	var m = new Uint32Array(32);
	function blake2bCompress (ctx, last) {
	  var i = 0;

	  // init work variables
	  for (i = 0; i < 16; i++) {
	    v[i] = ctx.h[i];
	    v[i + 16] = BLAKE2B_IV32[i];
	  }

	  // low 64 bits of offset
	  v[24] = v[24] ^ ctx.t;
	  v[25] = v[25] ^ (ctx.t / 0x100000000);
	  // high 64 bits not supported, offset may not be higher than 2**53-1

	  // last block flag set ?
	  if (last) {
	    v[28] = ~v[28];
	    v[29] = ~v[29];
	  }

	  // get little-endian words
	  for (i = 0; i < 32; i++) {
	    m[i] = B2B_GET32(ctx.b, 4 * i);
	  }

	  // twelve rounds of mixing
	  // uncomment the DebugPrint calls to log the computation
	  // and match the RFC sample documentation
	  // util.debugPrint('          m[16]', m, 64)
	  for (i = 0; i < 12; i++) {
	    // util.debugPrint('   (i=' + (i < 10 ? ' ' : '') + i + ') v[16]', v, 64)
	    B2B_G(0, 8, 16, 24, SIGMA82[i * 16 + 0], SIGMA82[i * 16 + 1]);
	    B2B_G(2, 10, 18, 26, SIGMA82[i * 16 + 2], SIGMA82[i * 16 + 3]);
	    B2B_G(4, 12, 20, 28, SIGMA82[i * 16 + 4], SIGMA82[i * 16 + 5]);
	    B2B_G(6, 14, 22, 30, SIGMA82[i * 16 + 6], SIGMA82[i * 16 + 7]);
	    B2B_G(0, 10, 20, 30, SIGMA82[i * 16 + 8], SIGMA82[i * 16 + 9]);
	    B2B_G(2, 12, 22, 24, SIGMA82[i * 16 + 10], SIGMA82[i * 16 + 11]);
	    B2B_G(4, 14, 16, 26, SIGMA82[i * 16 + 12], SIGMA82[i * 16 + 13]);
	    B2B_G(6, 8, 18, 28, SIGMA82[i * 16 + 14], SIGMA82[i * 16 + 15]);
	  }
	  // util.debugPrint('   (i=12) v[16]', v, 64)

	  for (i = 0; i < 16; i++) {
	    ctx.h[i] = ctx.h[i] ^ v[i] ^ v[i + 16];
	  }
	  // util.debugPrint('h[8]', ctx.h, 64)
	}

	// Creates a BLAKE2b hashing context
	// Requires an output length between 1 and 64 bytes
	// Takes an optional Uint8Array key
	function blake2bInit (outlen, key) {
	  if (outlen === 0 || outlen > 64) {
	    throw new Error('Illegal output length, expected 0 < length <= 64')
	  }
	  if (key && key.length > 64) {
	    throw new Error('Illegal key, expected Uint8Array with 0 < length <= 64')
	  }

	  // state, 'param block'
	  var ctx = {
	    b: new Uint8Array(128),
	    h: new Uint32Array(16),
	    t: 0, // input count
	    c: 0, // pointer within buffer
	    outlen: outlen // output length in bytes
	  };

	  // initialize hash state
	  for (var i = 0; i < 16; i++) {
	    ctx.h[i] = BLAKE2B_IV32[i];
	  }
	  var keylen = key ? key.length : 0;
	  ctx.h[0] ^= 0x01010000 ^ (keylen << 8) ^ outlen;

	  // key the hash, if applicable
	  if (key) {
	    blake2bUpdate(ctx, key);
	    // at the end
	    ctx.c = 128;
	  }

	  return ctx
	}

	// Updates a BLAKE2b streaming hash
	// Requires hash context and Uint8Array (byte array)
	function blake2bUpdate (ctx, input) {
	  for (var i = 0; i < input.length; i++) {
	    if (ctx.c === 128) { // buffer full ?
	      ctx.t += ctx.c; // add counters
	      blake2bCompress(ctx, false); // compress (not last)
	      ctx.c = 0; // counter to zero
	    }
	    ctx.b[ctx.c++] = input[i];
	  }
	}

	// Completes a BLAKE2b streaming hash
	// Returns a Uint8Array containing the message digest
	function blake2bFinal (ctx) {
	  ctx.t += ctx.c; // mark last block offset

	  while (ctx.c < 128) { // fill up with zeros
	    ctx.b[ctx.c++] = 0;
	  }
	  blake2bCompress(ctx, true); // final block flag = 1

	  // little endian convert and store
	  var out = new Uint8Array(ctx.outlen);
	  for (var i = 0; i < ctx.outlen; i++) {
	    out[i] = ctx.h[i >> 2] >> (8 * (i & 3));
	  }
	  return out
	}

	// Computes the BLAKE2B hash of a string or byte array, and returns a Uint8Array
	//
	// Returns a n-byte Uint8Array
	//
	// Parameters:
	// - input - the input bytes, as a string, Buffer or Uint8Array
	// - key - optional key Uint8Array, up to 64 bytes
	// - outlen - optional output length in bytes, default 64
	function blake2b (input, key, outlen) {
	  // preprocess inputs
	  outlen = outlen || 64;
	  input = util.normalizeInput(input);

	  // do the math
	  var ctx = blake2bInit(outlen, key);
	  blake2bUpdate(ctx, input);
	  return blake2bFinal(ctx)
	}

	// Computes the BLAKE2B hash of a string or byte array
	//
	// Returns an n-byte hash in hex, all lowercase
	//
	// Parameters:
	// - input - the input bytes, as a string, Buffer, or Uint8Array
	// - key - optional key Uint8Array, up to 64 bytes
	// - outlen - optional output length in bytes, default 64
	function blake2bHex (input, key, outlen) {
	  var output = blake2b(input, key, outlen);
	  return util.toHex(output)
	}

	var blake2b_1 = {
	  blake2b: blake2b,
	  blake2bHex: blake2bHex,
	  blake2bInit: blake2bInit,
	  blake2bUpdate: blake2bUpdate,
	  blake2bFinal: blake2bFinal
	};

	// BLAKE2s hash function in pure Javascript
	// Adapted from the reference implementation in RFC7693
	// Ported to Javascript by DC - https://github.com/dcposch



	// Little-endian byte access.
	// Expects a Uint8Array and an index
	// Returns the little-endian uint32 at v[i..i+3]
	function B2S_GET32 (v, i) {
	  return v[i] ^ (v[i + 1] << 8) ^ (v[i + 2] << 16) ^ (v[i + 3] << 24)
	}

	// Mixing function G.
	function B2S_G (a, b, c, d, x, y) {
	  v$1[a] = v$1[a] + v$1[b] + x;
	  v$1[d] = ROTR32(v$1[d] ^ v$1[a], 16);
	  v$1[c] = v$1[c] + v$1[d];
	  v$1[b] = ROTR32(v$1[b] ^ v$1[c], 12);
	  v$1[a] = v$1[a] + v$1[b] + y;
	  v$1[d] = ROTR32(v$1[d] ^ v$1[a], 8);
	  v$1[c] = v$1[c] + v$1[d];
	  v$1[b] = ROTR32(v$1[b] ^ v$1[c], 7);
	}

	// 32-bit right rotation
	// x should be a uint32
	// y must be between 1 and 31, inclusive
	function ROTR32 (x, y) {
	  return (x >>> y) ^ (x << (32 - y))
	}

	// Initialization Vector.
	var BLAKE2S_IV = new Uint32Array([
	  0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
	  0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19]);

	var SIGMA = new Uint8Array([
	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
	  11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
	  7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
	  9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
	  2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
	  12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
	  13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
	  6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
	  10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0]);

	// Compression function. "last" flag indicates last block
	var v$1 = new Uint32Array(16);
	var m$1 = new Uint32Array(16);
	function blake2sCompress (ctx, last) {
	  var i = 0;
	  for (i = 0; i < 8; i++) { // init work variables
	    v$1[i] = ctx.h[i];
	    v$1[i + 8] = BLAKE2S_IV[i];
	  }

	  v$1[12] ^= ctx.t; // low 32 bits of offset
	  v$1[13] ^= (ctx.t / 0x100000000); // high 32 bits
	  if (last) { // last block flag set ?
	    v$1[14] = ~v$1[14];
	  }

	  for (i = 0; i < 16; i++) { // get little-endian words
	    m$1[i] = B2S_GET32(ctx.b, 4 * i);
	  }

	  // ten rounds of mixing
	  // uncomment the DebugPrint calls to log the computation
	  // and match the RFC sample documentation
	  // util.debugPrint('          m[16]', m, 32)
	  for (i = 0; i < 10; i++) {
	    // util.debugPrint('   (i=' + i + ')  v[16]', v, 32)
	    B2S_G(0, 4, 8, 12, m$1[SIGMA[i * 16 + 0]], m$1[SIGMA[i * 16 + 1]]);
	    B2S_G(1, 5, 9, 13, m$1[SIGMA[i * 16 + 2]], m$1[SIGMA[i * 16 + 3]]);
	    B2S_G(2, 6, 10, 14, m$1[SIGMA[i * 16 + 4]], m$1[SIGMA[i * 16 + 5]]);
	    B2S_G(3, 7, 11, 15, m$1[SIGMA[i * 16 + 6]], m$1[SIGMA[i * 16 + 7]]);
	    B2S_G(0, 5, 10, 15, m$1[SIGMA[i * 16 + 8]], m$1[SIGMA[i * 16 + 9]]);
	    B2S_G(1, 6, 11, 12, m$1[SIGMA[i * 16 + 10]], m$1[SIGMA[i * 16 + 11]]);
	    B2S_G(2, 7, 8, 13, m$1[SIGMA[i * 16 + 12]], m$1[SIGMA[i * 16 + 13]]);
	    B2S_G(3, 4, 9, 14, m$1[SIGMA[i * 16 + 14]], m$1[SIGMA[i * 16 + 15]]);
	  }
	  // util.debugPrint('   (i=10) v[16]', v, 32)

	  for (i = 0; i < 8; i++) {
	    ctx.h[i] ^= v$1[i] ^ v$1[i + 8];
	  }
	  // util.debugPrint('h[8]', ctx.h, 32)
	}

	// Creates a BLAKE2s hashing context
	// Requires an output length between 1 and 32 bytes
	// Takes an optional Uint8Array key
	function blake2sInit (outlen, key) {
	  if (!(outlen > 0 && outlen <= 32)) {
	    throw new Error('Incorrect output length, should be in [1, 32]')
	  }
	  var keylen = key ? key.length : 0;
	  if (key && !(keylen > 0 && keylen <= 32)) {
	    throw new Error('Incorrect key length, should be in [1, 32]')
	  }

	  var ctx = {
	    h: new Uint32Array(BLAKE2S_IV), // hash state
	    b: new Uint32Array(64), // input block
	    c: 0, // pointer within block
	    t: 0, // input count
	    outlen: outlen // output length in bytes
	  };
	  ctx.h[0] ^= 0x01010000 ^ (keylen << 8) ^ outlen;

	  if (keylen > 0) {
	    blake2sUpdate(ctx, key);
	    ctx.c = 64; // at the end
	  }

	  return ctx
	}

	// Updates a BLAKE2s streaming hash
	// Requires hash context and Uint8Array (byte array)
	function blake2sUpdate (ctx, input) {
	  for (var i = 0; i < input.length; i++) {
	    if (ctx.c === 64) { // buffer full ?
	      ctx.t += ctx.c; // add counters
	      blake2sCompress(ctx, false); // compress (not last)
	      ctx.c = 0; // counter to zero
	    }
	    ctx.b[ctx.c++] = input[i];
	  }
	}

	// Completes a BLAKE2s streaming hash
	// Returns a Uint8Array containing the message digest
	function blake2sFinal (ctx) {
	  ctx.t += ctx.c; // mark last block offset
	  while (ctx.c < 64) { // fill up with zeros
	    ctx.b[ctx.c++] = 0;
	  }
	  blake2sCompress(ctx, true); // final block flag = 1

	  // little endian convert and store
	  var out = new Uint8Array(ctx.outlen);
	  for (var i = 0; i < ctx.outlen; i++) {
	    out[i] = (ctx.h[i >> 2] >> (8 * (i & 3))) & 0xFF;
	  }
	  return out
	}

	// Computes the BLAKE2S hash of a string or byte array, and returns a Uint8Array
	//
	// Returns a n-byte Uint8Array
	//
	// Parameters:
	// - input - the input bytes, as a string, Buffer, or Uint8Array
	// - key - optional key Uint8Array, up to 32 bytes
	// - outlen - optional output length in bytes, default 64
	function blake2s (input, key, outlen) {
	  // preprocess inputs
	  outlen = outlen || 32;
	  input = util.normalizeInput(input);

	  // do the math
	  var ctx = blake2sInit(outlen, key);
	  blake2sUpdate(ctx, input);
	  return blake2sFinal(ctx)
	}

	// Computes the BLAKE2S hash of a string or byte array
	//
	// Returns an n-byte hash in hex, all lowercase
	//
	// Parameters:
	// - input - the input bytes, as a string, Buffer, or Uint8Array
	// - key - optional key Uint8Array, up to 32 bytes
	// - outlen - optional output length in bytes, default 64
	function blake2sHex (input, key, outlen) {
	  var output = blake2s(input, key, outlen);
	  return util.toHex(output)
	}

	var blake2s_1 = {
	  blake2s: blake2s,
	  blake2sHex: blake2sHex,
	  blake2sInit: blake2sInit,
	  blake2sUpdate: blake2sUpdate,
	  blake2sFinal: blake2sFinal
	};

	var blakejs = {
	  blake2b: blake2b_1.blake2b,
	  blake2bHex: blake2b_1.blake2bHex,
	  blake2bInit: blake2b_1.blake2bInit,
	  blake2bUpdate: blake2b_1.blake2bUpdate,
	  blake2bFinal: blake2b_1.blake2bFinal,
	  blake2s: blake2s_1.blake2s,
	  blake2sHex: blake2s_1.blake2sHex,
	  blake2sInit: blake2s_1.blake2sInit,
	  blake2sUpdate: blake2s_1.blake2sUpdate,
	  blake2sFinal: blake2s_1.blake2sFinal
	};

	var blake2b$1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Blake2b = void 0;

	/**
	 * Class to help with Blake2B Signature scheme.
	 */
	class Blake2b {
	    /**
	     * Perform Sum 256 on the data.
	     * @param data The data to operate on.
	     * @returns The sum 256 of the data.
	     */
	    static sum256(data) {
	        return Buffer.from(blakejs.blake2b(data, undefined, Blake2b.SIZE_256));
	    }
	}
	exports.Blake2b = Blake2b;
	/**
	 * Blake2b 256.
	 */
	Blake2b.SIZE_256 = 32;

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
	    const messageStart = nextRootStart + curl.Curl.HASH_LENGTH;
	    const messageEnd = messageStart + messageLength;
	    // Hash the key, root and payload
	    const sponge = new curl.Curl(27);
	    sponge.absorb(channelKeyTrits, 0, channelKeyTrits.length);
	    sponge.absorb(rootTrits, 0, rootTrits.length);
	    sponge.absorb(payloadTrits, 0, nextRootStart);
	    // Decrypt the metadata
	    const nextRoot = mask_1.unmask(payloadTrits.slice(nextRootStart, nextRootStart + curl.Curl.HASH_LENGTH), sponge);
	    const message = mask_1.unmask(payloadTrits.slice(messageStart, messageStart + messageLength), sponge);
	    const nonce = mask_1.unmask(payloadTrits.slice(messageEnd, messageEnd + (curl.Curl.HASH_LENGTH / 3)), sponge);
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
	        const siblings = decryptedMetadata.slice(siblingsStart, siblingsStart + (siblingsCount * curl.Curl.HASH_LENGTH));
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
	 * @param client The client to use for sending.
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
	        const data = Buffer.alloc(1 + tagLength + mamMessage.payload.length);
	        data.writeUInt8(tagLength, 0);
	        if (tag) {
	            data.write(tag, 1, "ascii");
	        }
	        data.write(mamMessage.payload, 1 + tagLength, "ascii");
	        const indexationPayload = {
	            type: 2,
	            index: blake2b$1.Blake2b.sum256(Buffer.from(mamMessage.address)).toString("hex"),
	            data: data.toString("hex")
	        };
	        const tips = yield client.tips();
	        const message = {
	            version: 1,
	            parent1MessageId: tips.tip1MessageId,
	            parent2MessageId: tips.tip2MessageId,
	            payload: indexationPayload,
	            nonce: 0
	        };
	        const messageId = yield client.messageSubmit(message);
	        return {
	            message,
	            messageId
	        };
	    });
	}
	exports.mamAttach = mamAttach;
	/**
	 * Fetch a mam message from a channel.
	 * @param client The client to use for fetching.
	 * @param root The root within the mam channel to fetch the message.
	 * @param mode The mode to use for fetching.
	 * @param sideKey The sideKey if mode is restricted.
	 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
	 * throws exception if transactions found on address are invalid.
	 */
	function mamFetch(client, root, mode, sideKey) {
	    return __awaiter(this, void 0, void 0, function* () {
	        guards.validateModeKey(mode, sideKey);
	        const messageAddress = decodeAddress(root, mode);
	        const messagesResponse = yield client.messagesFind(blake2b$1.Blake2b.sum256(Buffer.from(messageAddress)).toString("hex"));
	        const messages = [];
	        for (const messageId of messagesResponse.messageIds) {
	            const message = yield client.message(messageId);
	            if (message) {
	                messages.push(message);
	            }
	        }
	        return decodeMessages(messages, root, sideKey);
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
	 * @param client The client to use for fetching.
	 * @param root The root within the mam channel to fetch the message.
	 * @param mode The mode to use for fetching.
	 * @param sideKey The sideKey if mode is restricted.
	 * @param limit Limit the number of messages retrieved.
	 * @returns The array of retrieved messages.
	 */
	function mamFetchAll(client, root, mode, sideKey, limit) {
	    return __awaiter(this, void 0, void 0, function* () {
	        guards.validateModeKey(mode, sideKey);
	        const localLimit = limit === undefined ? Number.MAX_VALUE : limit;
	        const messages = [];
	        let fetchRoot = root;
	        do {
	            const fetched = yield mamFetch(client, fetchRoot, mode, sideKey);
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
	    return __awaiter(this, void 0, void 0, function* () {
	        if (!messages || messages.length === 0) {
	            return;
	        }
	        for (const message of messages) {
	            // We only use indexation payload for storing mam messages
	            if (message.payload && message.payload.type === 2) {
	                const data = Buffer.from(message.payload.data, "hex");
	                // We have a minimum size for the message payload
	                if (data.length > 100) {
	                    const tagLength = data.readUInt8(0);
	                    if (tagLength === 0 || tagLength > 27) {
	                        return;
	                    }
	                    const tag = data.slice(1, 1 + tagLength).toString();
	                    const msg = data.slice(1 + tagLength).toString();
	                    try {
	                        const parsed = parser.parseMessage(msg, root, sideKey);
	                        return Object.assign(Object.assign({ root }, parsed), { tag });
	                    }
	                    catch (_a) {
	                    }
	                }
	            }
	        }
	    });
	}
	exports.decodeMessages = decodeMessages;

	});

	var IMamChannelState = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IMamFetchedMessage = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var IMamMessage = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

	var mamMode = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	});

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
	exports.SingleNodeClient = void 0;

	Object.defineProperty(exports, "SingleNodeClient", { enumerable: true, get: function () { return iota2_js_1__default['default'].SingleNodeClient; } });
	__exportStar(channel, exports);
	__exportStar(client, exports);
	__exportStar(parser, exports);
	__exportStar(IMamChannelState, exports);
	__exportStar(IMamFetchedMessage, exports);
	__exportStar(IMamMessage, exports);
	__exportStar(mamMode, exports);
	__exportStar(trytesHelper, exports);

	});

	var index = /*@__PURE__*/getDefaultExportFromCjs(es);

	return index;

})));
