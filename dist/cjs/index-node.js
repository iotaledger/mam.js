(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@iota/crypto.js'), require('@iota/util.js'), require('big-integer'), require('@iota/iota.js')) :
    typeof define === 'function' && define.amd ? define(['exports', '@iota/crypto.js', '@iota/util.js', 'big-integer', '@iota/iota.js'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Mam = {}, global.IotaCrypto, global.IotaUtil, global.bigInt, global.Iota));
})(this, (function (exports, crypto_js, util_js, bigInt, iota_js) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var bigInt__default = /*#__PURE__*/_interopDefaultLegacy(bigInt);

    // Copyright 2021 IOTA Stiftung
    // SPDX-License-Identifier: Apache-2.0
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

    // Copyright 2021 IOTA Stiftung
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
            return util_js.Converter.binaryToBytes(allBits);
        }
        /**
         * Unpack bytes into trytes.
         * @param packed The packed trytes to unpack.
         * @returns The unpacked trytes.
         */
        static unpackTrytes(packed) {
            const allBits = util_js.Converter.bytesToBinary(packed);
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

    // Copyright 2021 IOTA Stiftung
    const PRIVATE_KEY_NUM_FRAGMENTS = 27;
    // @internal
    const PRIVATE_KEY_FRAGMENT_LENGTH = PRIVATE_KEY_NUM_FRAGMENTS * crypto_js.Curl.HASH_LENGTH;
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
        const sponge = new crypto_js.Curl(27);
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
        const ss = new Int8Array(crypto_js.Curl.HASH_LENGTH);
        sponge.squeeze(ss, 0, ss.length);
        return ss;
    }
    /**
     * Get the digest from the subseed.
     * @param subSeed The subseed to get the digest for.
     * @param securityLevel The security level to get the digest.
     * @returns The digest trits.
     * @internal
     */
    function digestFromSubseed(subSeed, securityLevel) {
        const curl1 = new crypto_js.Curl(27);
        const curl2 = new crypto_js.Curl(27);
        const curl3 = new crypto_js.Curl(27);
        const length = securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH / crypto_js.Curl.HASH_LENGTH;
        const digest = new Int8Array(crypto_js.Curl.HASH_LENGTH);
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
    /**
     * Get the address from the digests.
     * @param digests The digests to get the address for.
     * @returns The address trits.
     * @internal
     */
    function address(digests) {
        const sponge = new crypto_js.Curl(27);
        sponge.absorb(digests, 0, digests.length);
        const addressTrits = new Int8Array(crypto_js.Curl.HASH_LENGTH);
        sponge.squeeze(addressTrits, 0, addressTrits.length);
        return addressTrits;
    }
    /**
     * Get the private key from the subseed.
     * @param subSeed The subseed to get the private key for.
     * @param securityLevel The security level for the private key.
     * @returns The private key trits.
     * @internal
     */
    function privateKeyFromSubseed(subSeed, securityLevel) {
        const keyLength = securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH;
        const keyTrits = new Int8Array(keyLength);
        const actualKeyTrits = new Int8Array(keyLength);
        const sponge = new crypto_js.Curl(27);
        sponge.absorb(subSeed, 0, subSeed.length);
        sponge.squeeze(keyTrits, 0, keyTrits.length);
        for (let i = 0; i < keyLength / crypto_js.Curl.HASH_LENGTH; i++) {
            const offset = i * crypto_js.Curl.HASH_LENGTH;
            sponge.reset();
            sponge.absorb(keyTrits, offset, crypto_js.Curl.HASH_LENGTH);
            actualKeyTrits.set(sponge.rate(), offset);
        }
        return actualKeyTrits;
    }
    /**
     * Create a signature for the trits.
     * @param hashTrits The trits to create the signature for.
     * @param key The key to use for signing.
     * @returns The signature trits.
     * @internal
     */
    function signature(hashTrits, key) {
        const signatures = new Int8Array(key.length);
        const sponge = new crypto_js.Curl(27);
        for (let i = 0; i < key.length / crypto_js.Curl.HASH_LENGTH; i++) {
            let buffer = key.subarray(i * crypto_js.Curl.HASH_LENGTH, (i + 1) * crypto_js.Curl.HASH_LENGTH);
            for (let k = 0; k < MAX_TRYTE_VALUE - (hashTrits[i * 3] + (hashTrits[(i * 3) + 1] * 3) + (hashTrits[(i * 3) + 2] * 9)); k++) {
                sponge.reset();
                sponge.absorb(buffer, 0, buffer.length);
                buffer = sponge.rate();
            }
            signatures.set(buffer, i * crypto_js.Curl.HASH_LENGTH);
        }
        return signatures;
    }
    /**
     * Check the security level.
     * @param hash The hash to check.
     * @returns The security level
     * @internal
     */
    function checksumSecurity(hash) {
        const dataSum1 = hash.slice(0, crypto_js.Curl.HASH_LENGTH / 3);
        let sum1 = 0;
        for (let i = 0; i < dataSum1.length; i++) {
            sum1 += dataSum1[i];
        }
        if (sum1 === 0) {
            return 1;
        }
        const dataSum2 = hash.slice(0, 2 * crypto_js.Curl.HASH_LENGTH / 3);
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
    /**
     * Get the digest from the signature
     * @param hash The hash to get the digest.
     * @param sig The signature.
     * @returns The digest.
     * @internal
     */
    function digestFromSignature(hash, sig) {
        const sponge = new crypto_js.Curl(27);
        const bytes = new Int8Array(sig.length);
        for (let i = 0; i < (sig.length / crypto_js.Curl.HASH_LENGTH); i++) {
            let innerBytes = sig.slice(i * crypto_js.Curl.HASH_LENGTH, (i + 1) * crypto_js.Curl.HASH_LENGTH);
            for (let j = 0; j < (hash[i * 3] + (hash[(i * 3) + 1] * 3) + (hash[(i * 3) + 2] * 9)) - MIN_TRYTE_VALUE; j++) {
                sponge.reset();
                sponge.absorb(innerBytes, 0, innerBytes.length);
                innerBytes = sponge.rate();
            }
            bytes.set(innerBytes, i * crypto_js.Curl.HASH_LENGTH);
        }
        sponge.reset();
        sponge.absorb(bytes, 0, bytes.length);
        return sponge.rate();
    }

    // Copyright 2021 IOTA Stiftung
    /**
     * Generate an address for the merklr tree.
     * @param seedTrits The trits for the seed.
     * @param index The index of the address to generate.
     * @param security The security level of the address to generate.
     * @returns The address and the private key.
     * @internal
     */
    function generateAddress(seedTrits, index, security) {
        const ss = subseed(seedTrits, index);
        const dg = digestFromSubseed(ss, security);
        return {
            address: address(dg),
            privateKey: privateKeyFromSubseed(ss, security)
        };
    }

    // Copyright 2021 IOTA Stiftung
    // SPDX-License-Identifier: Apache-2.0
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

    // Copyright 2021 IOTA Stiftung
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
            const seedTrits = TrytesHelper.toTrits(seed);
            const leaves = [];
            for (let i = 0; i < count; i++) {
                const addressPrivateKey = generateAddress(seedTrits, index + i, security);
                leaves.push(new MerkleNode(undefined, undefined, addressPrivateKey.address, addressPrivateKey.privateKey));
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
            const sponge = new crypto_js.Curl(27);
            let i = 1;
            const numChunks = Math.ceil(siblings.length / crypto_js.Curl.HASH_LENGTH);
            for (let c = 0; c < numChunks; c++) {
                const chunk = siblings.slice(c * crypto_js.Curl.HASH_LENGTH, (c + 1) * crypto_js.Curl.HASH_LENGTH);
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
                        ? this.root.left.privateKeyTrits : new Int8Array(), leaves: []
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
                    const sponge = new crypto_js.Curl(27);
                    sponge.absorb(left.addressTrits, 0, left.addressTrits.length);
                    sponge.absorb(right.addressTrits, 0, right.addressTrits.length);
                    addressTrits = new Int8Array(crypto_js.Curl.HASH_LENGTH);
                    sponge.squeeze(addressTrits, 0, addressTrits.length);
                }
                else {
                    addressTrits = left.addressTrits;
                }
                subnodes.push(new MerkleNode(left, right, addressTrits, undefined));
            }
            if (subnodes.length === 1) {
                return subnodes[0];
            }
            return this.buildTree(subnodes);
        }
    }

    // Copyright 2021 IOTA Stiftung
    /* eslint-disable no-bitwise */
    // @internal
    const ZERO = new Int8Array([1, 0, 0, -1]);
    // @internal
    const RADIX = 3;
    // @internal
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
            const tritsAsInt = TrytesHelper.tritsValue(tritValue);
            if (tritsAsInt >= 0) {
                encoding |= 1 << index;
                for (let j = 0; j < tritValue.length; j++) {
                    trits[i + j] = -tritValue[j];
                }
            }
            index++;
        }
        const v = trits.slice(length - TRITS_PER_TRYTE, length - TRITS_PER_TRYTE + length);
        if (TrytesHelper.tritsValue(v) < 0) {
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
        const encoder = TrytesHelper.tritsValue(value.slice(encoderStart, inputEnd));
        let result = 0;
        for (let i = 0; i < encoderStart / TRITS_PER_TRYTE; i++) {
            const tritsIntValue = ((encoder >> i) & 1) !== 0
                ? -TrytesHelper.tritsValue(value.slice(i * TRITS_PER_TRYTE, (i + 1) * TRITS_PER_TRYTE))
                : TrytesHelper.tritsValue(value.slice(i * TRITS_PER_TRYTE, (i + 1) * TRITS_PER_TRYTE));
            result += (Math.pow(27, i) * tritsIntValue);
        }
        return { value: result, end: inputEnd };
    }
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
        if (TrytesHelper.tritsValue(input.slice(0, TRITS_PER_TRYTE)) > 0) {
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

    // Copyright 2021 IOTA Stiftung
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
            let size = Math.min(length, crypto_js.Curl.HASH_LENGTH) - offset;
            let index = 0;
            while (index === 0) {
                const incrementResult = this.increment(state, offset + (size * 2 / 3), offset + size);
                size = Math.min(roundThird(offset + (size * 2 / 3) + incrementResult), crypto_js.Curl.HASH_LENGTH) - offset;
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
            const initialState = this.tritsToBigInt(trits, crypto_js.Curl.STATE_LENGTH);
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
         * @param toIndex The index to end at.
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
                    low: searchStates.low.slice(0, crypto_js.Curl.STATE_LENGTH),
                    high: searchStates.high.slice(0, crypto_js.Curl.STATE_LENGTH)
                };
                for (let stateIndex = 0; stateIndex < crypto_js.Curl.STATE_LENGTH; stateIndex++) {
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
            return bigInt__default["default"](1).shiftLeft(64)
                .subtract(bigInt__default["default"](1))
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
                        const bIndex = bigInt__default["default"](1).shiftLeft(i);
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
                const bIndex = bigInt__default["default"](index);
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
    /**
     * Max 64 bit value.
     */
    HammingDiver.MAX_VALUE = bigInt__default["default"]("FFFFFFFFFFFFFFFF", 16);
    /**
     * Min 64 bit value.
     */
    HammingDiver.MIN_VALUE = bigInt__default["default"]("0000000000000000", 16);
    /**
     * High 0.
     */
    HammingDiver.HIGH_0 = bigInt__default["default"]("B6DB6DB6DB6DB6DB", 16);
    /**
     * High 1.
     */
    HammingDiver.HIGH_1 = bigInt__default["default"]("8FC7E3F1F8FC7E3F", 16);
    /**
     * High 2.
     */
    HammingDiver.HIGH_2 = bigInt__default["default"]("FFC01FFFF803FFFF", 16);
    /**
     * High 3.
     */
    HammingDiver.HIGH_3 = bigInt__default["default"]("003FFFFFFFFFFFFF", 16);
    /**
     * Low 0.
     */
    HammingDiver.LOW_0 = bigInt__default["default"]("DB6DB6DB6DB6DB6D", 16);
    /**
     * Low 1.
     */
    HammingDiver.LOW_1 = bigInt__default["default"]("F1F8FC7E3F1F8FC7", 16);
    /**
     * Low 2.
     */
    HammingDiver.LOW_2 = bigInt__default["default"]("7FFFE00FFFFC01FF", 16);
    /**
     * Low 3.
     */
    HammingDiver.LOW_3 = bigInt__default["default"]("FFC0000007FFFFFF", 16);
    /**
     * Number of rounds.
     */
    HammingDiver.ROUNDS = 27;

    // Copyright 2021 IOTA Stiftung
    // SPDX-License-Identifier: Apache-2.0
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
            if (!TrytesHelper.isTrytes(sideKey)) {
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

    // Copyright 2021 IOTA Stiftung
    /**
     * Create the mask hash for the key.
     * @param keyTrits The key to create the mask hash for.
     * @returns The masked hash.
     * @internal
     */
    function maskHash(keyTrits) {
        const sponge = new crypto_js.Curl(81);
        sponge.absorb(keyTrits, 0, keyTrits.length);
        const finalKeyTrits = new Int8Array(crypto_js.Curl.HASH_LENGTH);
        sponge.squeeze(finalKeyTrits, 0, finalKeyTrits.length);
        return finalKeyTrits;
    }
    /**
     * Apply mask to the payload.
     * @param payload The payload to apply the mask to.
     * @param sponge The sponge to use.
     * @returns The masked payload.
     * @internal
     */
    function mask(payload, sponge) {
        const keyChunk = sponge.rate();
        const numChunks = Math.ceil(payload.length / crypto_js.Curl.HASH_LENGTH);
        for (let c = 0; c < numChunks; c++) {
            const chunk = payload.slice(c * crypto_js.Curl.HASH_LENGTH, (c + 1) * crypto_js.Curl.HASH_LENGTH);
            sponge.absorb(chunk, 0, chunk.length);
            const state = sponge.rate();
            for (let i = 0; i < chunk.length; i++) {
                payload[(c * crypto_js.Curl.HASH_LENGTH) + i] = tritSum(chunk[i], keyChunk[i]);
                keyChunk[i] = state[i];
            }
        }
        return payload;
    }
    /**
     * Unmask a payload.
     * @param payload The payload to unmask.
     * @param sponge The sponge to use.
     * @returns The unmasked payload.
     * @internal
     */
    function unmask(payload, sponge) {
        const unmasked = new Int8Array(payload);
        const limit = Math.ceil(unmasked.length / crypto_js.Curl.HASH_LENGTH) * crypto_js.Curl.HASH_LENGTH;
        let state;
        for (let c = 0; c < limit; c++) {
            const indexInChunk = c % crypto_js.Curl.HASH_LENGTH;
            if (indexInChunk === 0) {
                state = sponge.rate();
            }
            if (state) {
                unmasked[c] = tritSum(unmasked[c], -state[indexInChunk]);
            }
            if (indexInChunk === crypto_js.Curl.HASH_LENGTH - 1) {
                sponge.absorb(unmasked, Math.floor(c / crypto_js.Curl.HASH_LENGTH) * crypto_js.Curl.HASH_LENGTH, crypto_js.Curl.HASH_LENGTH);
            }
        }
        return unmasked;
    }
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

    // Copyright 2021 IOTA Stiftung
    /**
     * Create a new channel object.
     * @param seed The seed for the channel.
     * @param security The security level for the channel.
     * @param mode The mode for the channel.
     * @param sideKey The side key to use for restricted mode.
     * @returns The new channel state.
     */
    function createChannel(seed, security, mode, sideKey) {
        if (!TrytesHelper.isHash(seed)) {
            throw new Error("The seed must be 81 trytes long");
        }
        if (security < 1 || security > 3) {
            throw new Error(`Security must be between 1 and 3, it is ${security}`);
        }
        validateModeKey(mode, sideKey);
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
        const tree = new MerkleTree(channelState.seed, channelState.start, channelState.count, channelState.security);
        return TrytesHelper.fromTrits(tree.root.addressTrits);
    }
    /**
     * Prepare a message on the mam channel.
     * @param channelState The channel to prepare the message for.
     * @param message The trytes to include in the message.
     * @returns The prepared message, the channel state will also be updated.
     */
    function createMessage(channelState, message) {
        var _a;
        if (!TrytesHelper.isTrytes(message)) {
            throw new Error("The message must be in trytes");
        }
        const tree = new MerkleTree(channelState.seed, channelState.start, channelState.count, channelState.security);
        const nextRootTree = new MerkleTree(channelState.seed, channelState.start + channelState.count, channelState.nextCount, channelState.security);
        const nextRootTrits = nextRootTree.root.addressTrits;
        const messageTrits = TrytesHelper.toTrits(message);
        const indexTrits = pascalEncode(channelState.index);
        const messageLengthTrits = pascalEncode(messageTrits.length);
        const subtree = tree.getSubtree(channelState.index);
        const sponge = new crypto_js.Curl(27);
        const sideKeyTrits = TrytesHelper.toTrits((_a = channelState.sideKey) !== null && _a !== void 0 ? _a : "9".repeat(81));
        sponge.absorb(sideKeyTrits, 0, sideKeyTrits.length);
        sponge.absorb(tree.root.addressTrits, 0, tree.root.addressTrits.length);
        let payload = concatenate([indexTrits, messageLengthTrits]);
        sponge.absorb(payload, 0, payload.length);
        // Encrypt the next root along with the message
        const maskedNextRoot = mask(concatenate([nextRootTrits, messageTrits]), sponge);
        payload = concatenate([payload, maskedNextRoot]);
        // Calculate the nonce for the message so far
        const hammingDiver = new HammingDiver();
        const nonceTrits = hammingDiver.search(sponge.rate(crypto_js.Curl.STATE_LENGTH), channelState.security, crypto_js.Curl.HASH_LENGTH / 3, 0);
        mask(nonceTrits, sponge);
        payload = concatenate([payload, nonceTrits]);
        // Create the signature and add the sibling information
        const sig = signature(sponge.rate(), subtree.key);
        const subtreeTrits = concatenate(subtree.leaves.map(l => l.addressTrits));
        const siblingsCount = subtreeTrits.length / crypto_js.Curl.HASH_LENGTH;
        const encryptedSignature = mask(concatenate([sig, pascalEncode(siblingsCount), subtreeTrits]), sponge);
        // Insert the signature and pad if necessary
        payload = concatenate([payload, encryptedSignature]);
        const nextThird = payload.length % 3;
        if (nextThird !== 0) {
            payload = concatenate([payload, new Int8Array(3 - nextThird).fill(0)]);
        }
        const messageAddress = channelState.mode === "public"
            ? tree.root.addressTrits : maskHash(tree.root.addressTrits);
        const maskedAuthenticatedMessage = {
            payload: TrytesHelper.fromTrits(payload),
            root: TrytesHelper.fromTrits(tree.root.addressTrits),
            address: TrytesHelper.fromTrits(messageAddress)
        };
        if (channelState.index === channelState.count - 1) {
            channelState.start = channelState.nextCount + channelState.start;
            channelState.index = 0;
        }
        else {
            channelState.index++;
        }
        channelState.nextRoot = TrytesHelper.fromTrits(nextRootTrits);
        return maskedAuthenticatedMessage;
    }

    // Copyright 2021 IOTA Stiftung
    /**
     * Parse the trytes back to the original message.
     * @param payload The trytes to decode.
     * @param root The root for the message.
     * @param channelKey The key used to encode the data.
     * @returns The decoded message.
     */
    function parseMessage(payload, root, channelKey) {
        const payloadTrits = TrytesHelper.toTrits(payload);
        const rootTrits = TrytesHelper.toTrits(root);
        const channelKeyTrits = TrytesHelper.toTrits(channelKey !== null && channelKey !== void 0 ? channelKey : "9".repeat(81));
        // Get data positions in payload
        const indexData = pascalDecode(payloadTrits);
        const index = indexData.value;
        const messageData = pascalDecode(payloadTrits.slice(indexData.end));
        const messageLength = messageData.value;
        const nextRootStart = indexData.end + messageData.end;
        const messageStart = nextRootStart + crypto_js.Curl.HASH_LENGTH;
        const messageEnd = messageStart + messageLength;
        // Hash the key, root and payload
        const sponge = new crypto_js.Curl(27);
        sponge.absorb(channelKeyTrits, 0, channelKeyTrits.length);
        sponge.absorb(rootTrits, 0, rootTrits.length);
        sponge.absorb(payloadTrits, 0, nextRootStart);
        // Decrypt the metadata
        const nextRoot = unmask(payloadTrits.slice(nextRootStart, nextRootStart + crypto_js.Curl.HASH_LENGTH), sponge);
        const message = unmask(payloadTrits.slice(messageStart, messageStart + messageLength), sponge);
        const nonce = unmask(payloadTrits.slice(messageEnd, messageEnd + (crypto_js.Curl.HASH_LENGTH / 3)), sponge);
        const hmac = sponge.rate();
        // Check the security level is valid
        const securityLevel = checksumSecurity(hmac);
        if (securityLevel === 0) {
            throw new Error("Message Hash did not have a hamming weight of zero, security level is invalid");
        }
        // Decrypt the rest of the payload
        const decryptedMetadata = unmask(payloadTrits.slice(messageEnd + nonce.length), sponge);
        sponge.reset();
        // Get the signature and absorb its digest
        const signature = decryptedMetadata.slice(0, securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH);
        const digest = digestFromSignature(hmac, signature);
        sponge.absorb(digest, 0, digest.length);
        // Get the sibling information and validate it
        const siblingsCountData = pascalDecode(decryptedMetadata.slice(securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH));
        const siblingsCount = siblingsCountData.value;
        let recalculatedRoot = sponge.rate();
        if (siblingsCount !== 0) {
            const siblingsStart = (securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH) + siblingsCountData.end;
            const siblings = decryptedMetadata.slice(siblingsStart, siblingsStart + (siblingsCount * crypto_js.Curl.HASH_LENGTH));
            recalculatedRoot = MerkleTree.root(recalculatedRoot, siblings, index);
        }
        // Make sure the root matches the calculated one
        if (TrytesHelper.fromTrits(recalculatedRoot) !== root) {
            throw new Error("Signature did not match expected root");
        }
        return {
            nextRoot: TrytesHelper.fromTrits(nextRoot),
            message: TrytesHelper.fromTrits(message)
        };
    }

    // Copyright 2021 IOTA Stiftung
    /**
     * Attach the mam message to the tangle.
     * @param client The client or node endpoint to use for sending.
     * @param mamMessage The message to attach.
     * @param tag Optional tag for the transactions.
     * @returns The transactions that were attached.
     */
    async function mamAttach(client, mamMessage, tag) {
        if (tag !== undefined && typeof tag !== "string") {
            throw new Error("MWM and depth are no longer needed when calling mamAttach");
        }
        const tagLength = tag ? tag.length : 0;
        if (tagLength > 27) {
            throw new Error("The tag length is too long");
        }
        const packedTag = tag ? TrytesHelper.packTrytes(tag) : undefined;
        const packedTaglength = packedTag ? packedTag.length : 0;
        const packedData = TrytesHelper.packTrytes(mamMessage.payload);
        const data = new Uint8Array(1 + packedTaglength + packedData.length);
        data[0] = packedTaglength;
        if (packedTag) {
            data.set(packedTag, 1);
        }
        data.set(packedData, 1 + packedTaglength);
        const hashedAddress = crypto_js.Blake2b.sum256(util_js.Converter.utf8ToBytes(mamMessage.address));
        const indexationPayload = {
            type: iota_js.INDEXATION_PAYLOAD_TYPE,
            index: util_js.Converter.bytesToHex(hashedAddress),
            data: util_js.Converter.bytesToHex(data)
        };
        const message = {
            payload: indexationPayload
        };
        const localClient = typeof client === "string" ? new iota_js.SingleNodeClient(client) : client;
        const messageId = await localClient.messageSubmit(message);
        return {
            message,
            messageId
        };
    }
    /**
     * Fetch a mam message from a channel.
     * @param client The client or node endpoint to use for fetching.
     * @param root The root within the mam channel to fetch the message.
     * @param mode The mode to use for fetching.
     * @param sideKey The sideKey if mode is restricted.
     * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
     * throws exception if transactions found on address are invalid.
     */
    async function mamFetch(client, root, mode, sideKey) {
        validateModeKey(mode, sideKey);
        const localClient = typeof client === "string" ? new iota_js.SingleNodeClient(client) : client;
        const messageAddress = decodeAddress(root, mode);
        const hashedAddress = crypto_js.Blake2b.sum256(util_js.Converter.utf8ToBytes(messageAddress));
        try {
            const messagesResponse = await localClient.messagesFind(hashedAddress);
            const messages = [];
            for (const messageId of messagesResponse.messageIds) {
                try {
                    const message = await localClient.message(messageId);
                    messages.push(message);
                }
                catch { }
            }
            return await decodeMessages(messages, root, sideKey);
        }
        catch { }
    }
    /**
     * Decodes the root to its associated address.
     * @param root The root to device.
     * @param mode The mode for the channel.
     * @returns The decoded address.
     */
    function decodeAddress(root, mode) {
        return mode === "public"
            ? root
            : TrytesHelper.fromTrits(maskHash(TrytesHelper.toTrits(root)));
    }
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
    async function mamFetchAll(client, root, mode, sideKey, limit) {
        const localClient = typeof client === "string" ? new iota_js.SingleNodeClient(client) : client;
        validateModeKey(mode, sideKey);
        const localLimit = limit === undefined ? Number.MAX_VALUE : limit;
        const messages = [];
        let fetchRoot = root;
        do {
            const fetched = await mamFetch(localClient, fetchRoot, mode, sideKey);
            if (fetched) {
                messages.push(fetched);
                fetchRoot = fetched.nextRoot;
            }
            else {
                fetchRoot = undefined;
            }
        } while (fetchRoot && messages.length < localLimit);
        return messages;
    }
    /**
     * Decode messages from an address to try and find a MAM message.
     * @param messages The objects returned from the fetch.
     * @param root The root within the mam channel to fetch the message.
     * @param sideKey The sideKey if mode is restricted.
     * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
     * throws exception if transactions found on address are invalid.
     */
    async function decodeMessages(messages, root, sideKey) {
        var _a;
        if (!messages || messages.length === 0) {
            return;
        }
        for (const message of messages) {
            // We only use indexation payload for storing mam messages
            if (((_a = message.payload) === null || _a === void 0 ? void 0 : _a.type) === iota_js.INDEXATION_PAYLOAD_TYPE && message.payload.data) {
                const payloadBytes = util_js.Converter.hexToBytes(message.payload.data);
                // We have a minimum size for the message payload
                if (payloadBytes.length > 100) {
                    const packedTagLength = payloadBytes[0];
                    const packedTag = packedTagLength > 0 ? payloadBytes.slice(1, 1 + packedTagLength) : undefined;
                    const packedData = payloadBytes.slice(1 + packedTagLength);
                    const tag = packedTag ? TrytesHelper.unpackTrytes(packedTag) : "";
                    const data = TrytesHelper.unpackTrytes(packedData);
                    try {
                        const parsed = parseMessage(data, root, sideKey);
                        return {
                            root,
                            ...parsed,
                            tag
                        };
                    }
                    catch { }
                }
            }
        }
    }

    exports.TrytesHelper = TrytesHelper;
    exports.channelRoot = channelRoot;
    exports.createChannel = createChannel;
    exports.createMessage = createMessage;
    exports.decodeAddress = decodeAddress;
    exports.decodeMessages = decodeMessages;
    exports.mamAttach = mamAttach;
    exports.mamFetch = mamFetch;
    exports.mamFetchAll = mamFetchAll;
    exports.parseMessage = parseMessage;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
