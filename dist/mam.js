(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@iota/converter'), require('@iota/validators'), require('big-integer')) :
    typeof define === 'function' && define.amd ? define(['exports', '@iota/converter', '@iota/validators', 'big-integer'], factory) :
    (global = global || self, factory(global.mam = {}, global.converter, global.validators, global.bigInt));
}(this, (function (exports, converter, validators, bigInt) { 'use strict';

    bigInt = bigInt && Object.prototype.hasOwnProperty.call(bigInt, 'default') ? bigInt['default'] : bigInt;

    /**
     * Class to implement Curl sponge.
     * @private
     */
    var Curl = /** @class */ (function () {
        /**
         * Create a new instance of Curl.
         * @param rounds The number of rounds to perform.
         */
        function Curl(rounds) {
            if (rounds === void 0) { rounds = Curl.NUMBER_OF_ROUNDS; }
            if (rounds !== 27 && rounds !== 81) {
                throw new Error("Illegal number of rounds. Only `27` and `81` rounds are supported.");
            }
            this._state = new Int8Array(Curl.STATE_LENGTH);
            this._rounds = rounds;
        }
        /**
         * Resets the state
         */
        Curl.prototype.reset = function () {
            this._state = new Int8Array(Curl.STATE_LENGTH);
        };
        /**
         * Get the state of the sponge.
         * @param len The length of the state to get.
         * @returns The state.
         */
        Curl.prototype.rate = function (len) {
            if (len === void 0) { len = Curl.HASH_LENGTH; }
            return this._state.slice(0, len);
        };
        /**
         * Absorbs trits given an offset and length
         * @param trits The trits to absorb.
         * @param offset The offset to start abororbing from the array.
         * @param length The length of trits to absorb.
         */
        Curl.prototype.absorb = function (trits, offset, length) {
            do {
                var limit = length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH;
                this._state.set(trits.subarray(offset, offset + limit));
                this.transform();
                length -= Curl.HASH_LENGTH;
                offset += limit;
            } while (length > 0);
        };
        /**
         * Squeezes trits given an offset and length
         * @param trits The trits to squeeze.
         * @param offset The offset to start squeezing from the array.
         * @param length The length of trits to squeeze.
         */
        Curl.prototype.squeeze = function (trits, offset, length) {
            do {
                var limit = length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH;
                trits.set(this._state.subarray(0, limit), offset);
                this.transform();
                length -= Curl.HASH_LENGTH;
                offset += limit;
            } while (length > 0);
        };
        /**
         * Sponge transform function
         */
        Curl.prototype.transform = function () {
            var stateCopy;
            var index = 0;
            for (var round = 0; round < this._rounds; round++) {
                stateCopy = this._state.slice();
                for (var i = 0; i < Curl.STATE_LENGTH; i++) {
                    this._state[i] =
                        Curl.TRUTH_TABLE[stateCopy[index] + (stateCopy[(index += index < 365 ? 364 : -365)] << 2) + 5];
                }
            }
        };
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
        return Curl;
    }());

    var PRIVATE_KEY_NUM_FRAGMENTS = 27;
    var PRIVATE_KEY_FRAGMENT_LENGTH = PRIVATE_KEY_NUM_FRAGMENTS * Curl.HASH_LENGTH;
    var MIN_TRYTE_VALUE = -13;
    var MAX_TRYTE_VALUE = 13;
    var MIN_TRIT_VALUE = -1;
    var MAX_TRIT_VALUE = 1;
    /**
     * Calculate the subseed for the seed.
     * @param seed The seed trits.
     * @param index The index for the subseed.
     * @returns The subseed trits.
     * @private
     */
    function subseed(seed, index) {
        var sponge = new Curl(27);
        var subseedPreimage = seed.slice();
        var localIndex = index;
        while (localIndex-- > 0) {
            for (var i = 0; i < subseedPreimage.length; i++) {
                if (subseedPreimage[i]++ >= MAX_TRIT_VALUE) {
                    subseedPreimage[i] = MIN_TRIT_VALUE;
                }
                else {
                    break;
                }
            }
        }
        sponge.absorb(subseedPreimage, 0, subseedPreimage.length);
        var ss = new Int8Array(Curl.HASH_LENGTH);
        sponge.squeeze(ss, 0, ss.length);
        return ss;
    }
    /**
     * Get the digest from the subseed.
     * @param subSeed The subseed to get the digest for.
     * @param securityLevel The security level to get the digest.
     * @returns The digest trits.
     * @private
     */
    function digestFromSubseed(subSeed, securityLevel) {
        var curl1 = new Curl(27);
        var curl2 = new Curl(27);
        var curl3 = new Curl(27);
        var length = securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH / Curl.HASH_LENGTH;
        var digest = new Int8Array(Curl.HASH_LENGTH);
        curl1.absorb(subSeed, 0, subSeed.length);
        for (var i = 0; i < length; i++) {
            curl1.squeeze(digest, 0, digest.length);
            for (var k = 0; k < MAX_TRYTE_VALUE - MIN_TRYTE_VALUE + 1; k++) {
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
     * @private
     */
    function address(digests) {
        var sponge = new Curl(27);
        sponge.absorb(digests, 0, digests.length);
        var addressTrits = new Int8Array(Curl.HASH_LENGTH);
        sponge.squeeze(addressTrits, 0, addressTrits.length);
        return addressTrits;
    }
    /**
     * Get the private key from the subseed.
     * @param subSeed The subseed to get the private key for.
     * @param securityLevel The security level for the private key.
     * @returns The private key trits.
     * @private
     */
    function privateKeyFromSubseed(subSeed, securityLevel) {
        var keyLength = securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH;
        var keyTrits = new Int8Array(keyLength);
        var actualKeyTrits = new Int8Array(keyLength);
        var sponge = new Curl(27);
        sponge.absorb(subSeed, 0, subSeed.length);
        sponge.squeeze(keyTrits, 0, keyTrits.length);
        for (var i = 0; i < keyLength / Curl.HASH_LENGTH; i++) {
            var offset = i * Curl.HASH_LENGTH;
            sponge.reset();
            sponge.absorb(keyTrits, offset, Curl.HASH_LENGTH);
            actualKeyTrits.set(sponge.rate(), offset);
        }
        return actualKeyTrits;
    }
    /**
     * Create a signature for the trits.
     * @param hashTrits The trits to create the signature for.
     * @param key The key to use for signing.
     * @returns The signature trits.
     * @private
     */
    function signature(hashTrits, key) {
        var signatures = new Int8Array(key.length);
        var sponge = new Curl(27);
        for (var i = 0; i < key.length / Curl.HASH_LENGTH; i++) {
            var buffer = key.subarray(i * Curl.HASH_LENGTH, (i + 1) * Curl.HASH_LENGTH);
            for (var k = 0; k < MAX_TRYTE_VALUE - (hashTrits[i * 3] + hashTrits[i * 3 + 1] * 3 + hashTrits[i * 3 + 2] * 9); k++) {
                sponge.reset();
                sponge.absorb(buffer, 0, buffer.length);
                buffer = sponge.rate();
            }
            signatures.set(buffer, i * Curl.HASH_LENGTH);
        }
        return signatures;
    }
    /**
     * Check the security level.
     * @param hash The hash to check.
     * @returns The security level
     * @private
     */
    function checksumSecurity(hash) {
        if (hash.slice(0, Curl.HASH_LENGTH / 3).reduce(function (a, b) { return a + b; }, 0) === 0) {
            return 1;
        }
        if (hash.slice(0, 2 * Curl.HASH_LENGTH / 3).reduce(function (a, b) { return a + b; }, 0) === 0) {
            return 2;
        }
        return hash.reduce(function (a, b) { return a + b; }, 0) === 0 ? 3 : 0;
    }
    /**
     * Get the digest from the signature
     * @param hash The hash to get the digest.
     * @param sig The signature.
     * @returns The digest.
     * @private
     */
    function digestFromSignature(hash, sig) {
        var sponge = new Curl(27);
        var buffer = new Int8Array(sig.length);
        for (var i = 0; i < (sig.length / Curl.HASH_LENGTH); i++) {
            var innerBuffer = sig.slice(i * Curl.HASH_LENGTH, (i + 1) * Curl.HASH_LENGTH);
            for (var j = 0; j < (hash[i * 3] + hash[i * 3 + 1] * 3 + hash[i * 3 + 2] * 9) - MIN_TRYTE_VALUE; j++) {
                sponge.reset();
                sponge.absorb(innerBuffer, 0, innerBuffer.length);
                innerBuffer = sponge.rate();
            }
            buffer.set(innerBuffer, i * Curl.HASH_LENGTH);
        }
        sponge.reset();
        sponge.absorb(buffer, 0, buffer.length);
        return sponge.rate();
    }

    /**
     * Generate an address for the merklr tree.
     * @param seedTrits The trits for the seed.
     * @param index The index of the address to generate.
     * @param security The security level of the address to generate.
     * @returns The address and the private key.
     * @private
     */
    function generateAddress(seedTrits, index, security) {
        var ss = subseed(seedTrits, index);
        var dg = digestFromSubseed(ss, security);
        return {
            address: address(dg),
            privateKey: privateKeyFromSubseed(ss, security)
        };
    }

    /**
     * Class to represent a node in a merkle tree.
     * @private
     */
    var MerkleNode = /** @class */ (function () {
        /**
         * Create a new instance of MerkleNode.
         * @param left The left node.
         * @param right The right node.
         * @param addressTrits The trits representing the address.
         * @param privateKeyTrits The trits for the private key.
         */
        function MerkleNode(left, right, addressTrits, privateKeyTrits) {
            this.left = left;
            this.right = right;
            this.size = (left ? left.size : 0) + (right ? right.size : 0);
            this.addressTrits = addressTrits;
            this.privateKeyTrits = privateKeyTrits;
        }
        return MerkleNode;
    }());

    /**
     * Class to represent a merkle tree.
     * @private
     */
    var MerkleTree = /** @class */ (function () {
        /**
         * Create a new instance of the merkle tree.
         * @param seed The seed to use for the tree.
         * @param index The start index for the creation.
         * @param count The count for the creation.
         * @param security The security level to create the hashes.
         */
        function MerkleTree(seed, index, count, security) {
            var seedTrits = converter.trits(seed);
            var leaves = [];
            for (var i = 0; i < count; i++) {
                var addressPrivateKey = generateAddress(seedTrits, index + i, security);
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
        MerkleTree.root = function (rate, siblings, index) {
            var sponge = new Curl(27);
            var i = 1;
            var numChunks = Math.ceil(siblings.length / Curl.HASH_LENGTH);
            for (var c = 0; c < numChunks; c++) {
                var chunk = siblings.slice(c * Curl.HASH_LENGTH, (c + 1) * Curl.HASH_LENGTH);
                sponge.reset();
                if ((i & index) === 0) {
                    sponge.absorb(rate, 0, rate.length);
                    sponge.absorb(chunk, 0, chunk.length);
                }
                else {
                    sponge.absorb(chunk, 0, chunk.length);
                    sponge.absorb(rate, 0, rate.length);
                }
                i <<= 1;
                rate = sponge.rate();
            }
            return sponge.rate();
        };
        /**
         * Get a sub tree.
         * @param index The index of the subtree.
         * @returns The key and leaves for the sub tree.
         */
        MerkleTree.prototype.getSubtree = function (index) {
            if (this.root.size === 1) {
                return {
                    key: this.root.left && this.root.left.privateKeyTrits
                        ? this.root.left.privateKeyTrits : new Int8Array(), leaves: []
                };
            }
            var leaves = [];
            var node = this.root;
            var size = this.root.size;
            var privateKey;
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
                key: privateKey || new Int8Array(),
                leaves: leaves
            };
        };
        /**
         * Build tree from the leaf hashes.
         * @param leaves The leaves to build the tree from.
         * @returns The root node.
         */
        MerkleTree.prototype.buildTree = function (leaves) {
            var subnodes = [];
            for (var i = 0; i < leaves.length; i += 2) {
                var left = leaves[i];
                var right = (i + 1 < leaves.length) ? leaves[i + 1] : undefined;
                var addressTrits = void 0;
                if (right) {
                    var sponge = new Curl(27);
                    sponge.absorb(left.addressTrits, 0, left.addressTrits.length);
                    sponge.absorb(right.addressTrits, 0, right.addressTrits.length);
                    addressTrits = new Int8Array(Curl.HASH_LENGTH);
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
        };
        return MerkleTree;
    }());

    var ZERO = new Int8Array([1, 0, 0, -1]);
    var RADIX = 3;
    var TRITS_PER_TRYTE = 3;
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
        var length = roundThird(minTrits(Math.abs(value), 1));
        var trits = new Int8Array(encodedLength(value));
        valueToTrits(value, trits);
        var encoding = 0;
        var index = 0;
        for (var i = 0; i < length - TRITS_PER_TRYTE; i += TRITS_PER_TRYTE) {
            var tritValue = trits.slice(i, i + TRITS_PER_TRYTE);
            var tritsAsInt = converter.value(tritValue);
            if (tritsAsInt >= 0) {
                encoding |= 1 << index;
                for (var j = 0; j < tritValue.length; j++) {
                    trits[i + j] = -tritValue[j];
                }
            }
            index++;
        }
        var v = trits.slice(length - TRITS_PER_TRYTE, length - TRITS_PER_TRYTE + length);
        if (converter.value(v) < 0) {
            encoding |= 1 << index;
            for (var k = 0; k < v.length; k++) {
                trits[k + length - TRITS_PER_TRYTE] = -trits[k + length - TRITS_PER_TRYTE];
            }
        }
        var checksumTrits = new Int8Array(trits.length - length);
        valueToTrits(encoding, checksumTrits);
        for (var i = 0; i < checksumTrits.length; i++) {
            trits[length + i] = checksumTrits[i];
        }
        return trits;
    }
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
        var encoderStart = end(value);
        var inputEnd = encoderStart + (encoderStart / TRITS_PER_TRYTE);
        var encoder = converter.value(value.slice(encoderStart, inputEnd));
        var result = 0;
        for (var i = 0; i < encoderStart / TRITS_PER_TRYTE; i++) {
            var tritsIntValue = ((encoder >> i) & 1) !== 0
                ? -converter.value(value.slice(i * TRITS_PER_TRYTE, (i + 1) * TRITS_PER_TRYTE))
                : converter.value(value.slice(i * TRITS_PER_TRYTE, (i + 1) * TRITS_PER_TRYTE));
            result = result + (Math.pow(27, i) * tritsIntValue);
        }
        return { value: result, end: inputEnd };
    }
    /**
     * Get the encoded length of the value.
     * @param value The value.
     * @returns The length.
     * @private
     */
    function encodedLength(value) {
        var length = roundThird(minTrits(Math.abs(value), 1));
        return length + (length / RADIX);
    }
    /**
     * Round the number to the third.
     * @param value The value to round.
     * @returns The rounded number.
     * @private
     */
    function roundThird(value) {
        var rem = value % RADIX;
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
        if (converter.value(input.slice(0, TRITS_PER_TRYTE)) > 0) {
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
        var endWrite = writeTrits(input, trits, 0);
        if (input >= 0) {
            return endWrite;
        }
        for (var i = 0; i < trits.length; i++) {
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
                var abs = Math.floor(input / RADIX);
                var r = input % RADIX;
                if (r > 1) {
                    abs += 1;
                    r = -1;
                }
                trits[index] = r;
                index++;
                return 1 + writeTrits(abs, trits, index);
        }
    }

    /**
     * Class to perform Hamming calculation for nonce.
     * @private
     */
    var HammingDiver = /** @class */ (function () {
        function HammingDiver() {
        }
        /**
         * Search for the nonce.
         * @param trits The trits to calculate the nonce.
         * @param securityLevel The security level to calculate at.
         * @param length The length of the data to search.
         * @param offset The offset to start the search.
         * @returns The trits of the nonce.
         */
        HammingDiver.prototype.search = function (trits, securityLevel, length, offset) {
            var state = this.prepareTrits(trits, offset);
            var size = Math.min(length, Curl.HASH_LENGTH) - offset;
            var index = 0;
            while (index === 0) {
                var incrementResult = this.increment(state, offset + size * 2 / 3, offset + size);
                size = Math.min(roundThird(offset + size * 2 / 3 + incrementResult), Curl.HASH_LENGTH) - offset;
                var curlCopy = {
                    low: state.low.slice(),
                    high: state.high.slice()
                };
                this.transform(curlCopy);
                index = this.check(securityLevel, curlCopy.low, curlCopy.high);
            }
            return this.trinaryGet(state.low, state.high, size, index);
        };
        /**
         * Prepare the trits for calculation.
         * @param trits The trits.
         * @param offset The offset to start.
         * @returns The prepared trits.
         */
        HammingDiver.prototype.prepareTrits = function (trits, offset) {
            var initialState = this.tritsToBigInt(trits, Curl.STATE_LENGTH);
            initialState.low[offset] = HammingDiver.LOW_0;
            initialState.low[offset + 1] = HammingDiver.LOW_1;
            initialState.low[offset + 2] = HammingDiver.LOW_2;
            initialState.low[offset + 3] = HammingDiver.LOW_3;
            initialState.high[offset] = HammingDiver.HIGH_0;
            initialState.high[offset + 1] = HammingDiver.HIGH_1;
            initialState.high[offset + 2] = HammingDiver.HIGH_2;
            initialState.high[offset + 3] = HammingDiver.HIGH_3;
            return initialState;
        };
        /**
         * Convert the trits to bigint form.
         * @param input The input trits.
         * @param length The length of the input.
         * @returns The trits in big int form.
         */
        HammingDiver.prototype.tritsToBigInt = function (input, length) {
            var result = {
                low: [],
                high: []
            };
            for (var i = 0; i < input.length; i++) {
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
            for (var i = input.length; i < length; i++) {
                result.low[i] = HammingDiver.MAX_VALUE;
                result.high[i] = HammingDiver.MAX_VALUE;
            }
            return result;
        };
        /**
         * Increment the state values.
         * @param states The state to increment.
         * @param fromIndex The index to start from.
         * @param toIndex The index to end at,
         * @returns The increment length.
         */
        HammingDiver.prototype.increment = function (states, fromIndex, toIndex) {
            for (var i = fromIndex; i < toIndex; i++) {
                var low = states.low[i];
                var high = states.high[i];
                states.low[i] = high.xor(low);
                states.high[i] = low;
                if ((high.and(low.not())).equals(0)) {
                    return toIndex - fromIndex;
                }
            }
            return toIndex - fromIndex + 1;
        };
        /**
         * Transform the states.
         * @param searchStates The states to transform.
         */
        HammingDiver.prototype.transform = function (searchStates) {
            var curlScratchpadIndex = 0;
            for (var round = 0; round < HammingDiver.ROUNDS; round++) {
                var curlScratchpad = {
                    low: searchStates.low.slice(0, Curl.STATE_LENGTH),
                    high: searchStates.high.slice(0, Curl.STATE_LENGTH)
                };
                for (var stateIndex = 0; stateIndex < Curl.STATE_LENGTH; stateIndex++) {
                    var alpha = curlScratchpad.low[curlScratchpadIndex];
                    var beta = curlScratchpad.high[curlScratchpadIndex];
                    if (curlScratchpadIndex < 365) {
                        curlScratchpadIndex += 364;
                    }
                    else {
                        curlScratchpadIndex += -365;
                    }
                    var gamma = curlScratchpad.high[curlScratchpadIndex];
                    var lowXorBeta = curlScratchpad.low[curlScratchpadIndex].xor(beta);
                    var notGamma = this.bitWiseNot(gamma);
                    var alphaOrNotGamma = alpha.or(notGamma);
                    var delta = alphaOrNotGamma.and(lowXorBeta);
                    searchStates.low[stateIndex] = this.bitWiseNot(delta);
                    var alphaXorGamma = alpha.xor(gamma);
                    searchStates.high[stateIndex] = alphaXorGamma.or(delta);
                }
            }
        };
        /**
         * Perform a bitwise not for 64 bit, not twos complement.
         * @param value The value to bitwise not.
         * @returns The bitwise not of the value.
         */
        HammingDiver.prototype.bitWiseNot = function (value) {
            return bigInt(1).shiftLeft(64).subtract(bigInt(1)).subtract(value);
        };
        /**
         * Check if we have found the nonce.
         * @param securityLevel The security level to check.
         * @param low The low bits.
         * @param high The high bits.
         * @returns The nonce if found.
         */
        HammingDiver.prototype.check = function (securityLevel, low, high) {
            for (var i = 0; i < 64; i++) {
                var sum = 0;
                for (var j = 0; j < securityLevel; j++) {
                    for (var k = j * 243 / 3; k < (j + 1) * 243 / 3; k++) {
                        var bIndex = bigInt(1).shiftLeft(i);
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
        };
        /**
         * Get data from the tinary bits.
         * @param low The low bits.
         * @param high The high bits.
         * @param arrLength The array length to get from.
         * @param index The index to get the values.
         * @returns The values stored at the index.
         */
        HammingDiver.prototype.trinaryGet = function (low, high, arrLength, index) {
            var result = new Int8Array(arrLength);
            for (var i = 0; i < arrLength; i++) {
                var bIndex = bigInt(index);
                var l = low[i].shiftRight(bIndex).and(1);
                var h = high[i].shiftRight(bIndex).and(1);
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
        };
        /**
         * Max 64 bit value.
         */
        HammingDiver.MAX_VALUE = bigInt("FFFFFFFFFFFFFFFF", 16);
        /**
         * Min 64 bit value.
         */
        HammingDiver.MIN_VALUE = bigInt("0000000000000000", 16);
        /**
         * High 0
         */
        HammingDiver.HIGH_0 = bigInt("B6DB6DB6DB6DB6DB", 16);
        /**
         * High 1
         */
        HammingDiver.HIGH_1 = bigInt("8FC7E3F1F8FC7E3F", 16);
        /**
         * High 2
         */
        HammingDiver.HIGH_2 = bigInt("FFC01FFFF803FFFF", 16);
        /**
         * High 3
         */
        HammingDiver.HIGH_3 = bigInt("003FFFFFFFFFFFFF", 16);
        /**
         * Low 0
         */
        HammingDiver.LOW_0 = bigInt("DB6DB6DB6DB6DB6D", 16);
        /**
         * Low 1
         */
        HammingDiver.LOW_1 = bigInt("F1F8FC7E3F1F8FC7", 16);
        /**
         * Low 2
         */
        HammingDiver.LOW_2 = bigInt("7FFFE00FFFFC01FF", 16);
        /**
         * Low 3
         */
        HammingDiver.LOW_3 = bigInt("FFC0000007FFFFFF", 16);
        /**
         * Number of rounds
         */
        HammingDiver.ROUNDS = 27;
        return HammingDiver;
    }());

    /**
     * Concatentate a list of arrays.
     * @param arrays The arrays to concatenate.
     * @returns The concatenated arrays.
     * @private
     */
    function concatenate(arrays) {
        var totalLength = 0;
        for (var _i = 0, arrays_1 = arrays; _i < arrays_1.length; _i++) {
            var arr = arrays_1[_i];
            totalLength += arr.length;
        }
        var result = new Int8Array(totalLength);
        var offset = 0;
        for (var _a = 0, arrays_2 = arrays; _a < arrays_2.length; _a++) {
            var arr = arrays_2[_a];
            result.set(arr, offset);
            offset += arr.length;
        }
        return result;
    }

    /**
     * Validate the mode and key.
     * @param mode The mamMode to validate.
     * @param sideKey The sideKey to validate.
     * @private
     */
    function validateModeKey(mode, sideKey) {
        if (mode !== "public" && mode !== "private" && mode !== "restricted") {
            throw new Error("The mode must be public, private or restricted, it is '" + mode + "'");
        }
        if (mode === "restricted") {
            if (!sideKey) {
                throw new Error("You must provide a sideKey for restricted mode");
            }
            if (!validators.isTrytes(sideKey)) {
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

    /**
     * Create the mask hash for the key.
     * @param keyTrits The key to create the mask hash for.
     * @returns The masked hash.
     * @private
     */
    function maskHash(keyTrits) {
        var sponge = new Curl(81);
        sponge.absorb(keyTrits, 0, keyTrits.length);
        var finalKeyTrits = new Int8Array(Curl.HASH_LENGTH);
        sponge.squeeze(finalKeyTrits, 0, finalKeyTrits.length);
        return finalKeyTrits;
    }
    /**
     * Apply mask to the payload.
     * @param payload The payload to apply the mask to.
     * @param sponge The sponge to use.
     * @returns The masked payload.
     * @private
     */
    function mask(payload, sponge) {
        var keyChunk = sponge.rate();
        var numChunks = Math.ceil(payload.length / Curl.HASH_LENGTH);
        for (var c = 0; c < numChunks; c++) {
            var chunk = payload.slice(c * Curl.HASH_LENGTH, (c + 1) * Curl.HASH_LENGTH);
            sponge.absorb(chunk, 0, chunk.length);
            var state = sponge.rate();
            for (var i = 0; i < chunk.length; i++) {
                payload[(c * Curl.HASH_LENGTH) + i] = tritSum(chunk[i], keyChunk[i]);
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
     * @private
     */
    function unmask(payload, sponge) {
        var unmasked = new Int8Array(payload);
        var limit = Math.ceil(unmasked.length / Curl.HASH_LENGTH) * Curl.HASH_LENGTH;
        var state;
        for (var c = 0; c < limit; c++) {
            var indexInChunk = c % Curl.HASH_LENGTH;
            if (indexInChunk === 0) {
                state = sponge.rate();
            }
            if (state) {
                unmasked[c] = tritSum(unmasked[c], -state[indexInChunk]);
            }
            if (indexInChunk === Curl.HASH_LENGTH - 1) {
                sponge.absorb(unmasked, Math.floor(c / Curl.HASH_LENGTH) * Curl.HASH_LENGTH, Curl.HASH_LENGTH);
            }
        }
        return unmasked;
    }
    /**
     * Sum the parts of a trit.
     * @param left The left part.
     * @param right The right part.
     * @returns The sum.
     * @private
     */
    function tritSum(left, right) {
        var sum = left + right;
        switch (sum) {
            case 2:
                return -1;
            case -2:
                return 1;
            default:
                return sum;
        }
    }

    /**
     * Create a new channel object.
     * @param seed The seed for the channel.
     * @param security The security level for the channel.
     * @param mode The mode for the channel.
     * @param sideKey The side key to use for restricted mode.
     * @returns The new channel state.
     */
    function createChannel(seed, security, mode, sideKey) {
        if (!validators.isTrytesOfExactLength(seed, 81)) {
            throw new Error("The seed must be 81 trytes long");
        }
        if (security < 1 || security > 3) {
            throw new Error("Security must be between 1 and 3, it is " + security);
        }
        validateModeKey(mode, sideKey);
        return {
            seed: seed,
            mode: mode,
            sideKey: mode === "restricted" ? (sideKey || "").padEnd(81, "9") : undefined,
            security: security,
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
            throw new Error("channelState.security must be between 1 and 3, it is " + channelState.security);
        }
        var tree = new MerkleTree(channelState.seed, channelState.start, channelState.count, channelState.security);
        return converter.trytes(tree.root.addressTrits);
    }
    /**
     * Prepare a message on the mam channel.
     * @param channelState The channel to prepare the message for.
     * @param message The trytes to include in the message.
     * @returns The prepared message, the channel state will also be updated.
     */
    function createMessage(channelState, message) {
        if (!validators.isTrytes(message)) {
            throw new Error("The message must be in trytes");
        }
        var tree = new MerkleTree(channelState.seed, channelState.start, channelState.count, channelState.security);
        var nextRootTree = new MerkleTree(channelState.seed, channelState.start + channelState.count, channelState.nextCount, channelState.security);
        var nextRootTrits = nextRootTree.root.addressTrits;
        var messageTrits = converter.trits(message);
        var indexTrits = pascalEncode(channelState.index);
        var messageLengthTrits = pascalEncode(messageTrits.length);
        var subtree = tree.getSubtree(channelState.index);
        var sponge = new Curl(27);
        var sideKeyTrits = converter.trits(channelState.sideKey || "9".repeat(81));
        sponge.absorb(sideKeyTrits, 0, sideKeyTrits.length);
        sponge.absorb(tree.root.addressTrits, 0, tree.root.addressTrits.length);
        var payload = concatenate([indexTrits, messageLengthTrits]);
        sponge.absorb(payload, 0, payload.length);
        // Encrypt the next root along with the message
        var maskedNextRoot = mask(concatenate([nextRootTrits, messageTrits]), sponge);
        payload = concatenate([payload, maskedNextRoot]);
        // Calculate the nonce for the message so far
        var hammingDiver = new HammingDiver();
        var nonceTrits = hammingDiver.search(sponge.rate(Curl.STATE_LENGTH), channelState.security, Curl.HASH_LENGTH / 3, 0);
        mask(nonceTrits, sponge);
        payload = concatenate([payload, nonceTrits]);
        // Create the signature and add the sibling information
        var sig = signature(sponge.rate(), subtree.key);
        var subtreeTrits = concatenate(subtree.leaves.map(function (l) { return l.addressTrits; }));
        var siblingsCount = subtreeTrits.length / Curl.HASH_LENGTH;
        var encryptedSignature = mask(concatenate([sig, pascalEncode(siblingsCount), subtreeTrits]), sponge);
        // Insert the signature and pad if necessary
        payload = concatenate([payload, encryptedSignature]);
        var nextThird = payload.length % 3;
        if (nextThird !== 0) {
            payload = concatenate([payload, new Int8Array(3 - nextThird).fill(0)]);
        }
        var messageAddress = channelState.mode === "public" ?
            tree.root.addressTrits : maskHash(tree.root.addressTrits);
        var maskedAuthenticatedMessage = {
            payload: converter.trytes(payload),
            root: converter.trytes(tree.root.addressTrits),
            address: converter.trytes(messageAddress)
        };
        if (channelState.index === channelState.count - 1) {
            channelState.start = channelState.nextCount + channelState.start;
            channelState.index = 0;
        }
        else {
            channelState.index++;
        }
        channelState.nextRoot = converter.trytes(nextRootTrits);
        return maskedAuthenticatedMessage;
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /**
     * Parse the trytes back to the original message.
     * @param payload The trytes to decode.
     * @param root The root for the message.
     * @param channelKey The key used to encode the data.
     * @returns The decoded message.
     */
    function parseMessage(payload, root, channelKey) {
        var payloadTrits = converter.trits(payload);
        var rootTrits = converter.trits(root);
        var channelKeyTrits = converter.trits(channelKey || "9".repeat(81));
        // Get data positions in payload
        var indexData = pascalDecode(payloadTrits);
        var index = indexData.value;
        var messageData = pascalDecode(payloadTrits.slice(indexData.end));
        var messageLength = messageData.value;
        var nextRootStart = indexData.end + messageData.end;
        var messageStart = nextRootStart + Curl.HASH_LENGTH;
        var messageEnd = messageStart + messageLength;
        // Hash the key, root and payload
        var sponge = new Curl(27);
        sponge.absorb(channelKeyTrits, 0, channelKeyTrits.length);
        sponge.absorb(rootTrits, 0, rootTrits.length);
        sponge.absorb(payloadTrits, 0, nextRootStart);
        // Decrypt the metadata
        var nextRoot = unmask(payloadTrits.slice(nextRootStart, nextRootStart + Curl.HASH_LENGTH), sponge);
        var message = unmask(payloadTrits.slice(messageStart, messageStart + messageLength), sponge);
        var nonce = unmask(payloadTrits.slice(messageEnd, messageEnd + Curl.HASH_LENGTH / 3), sponge);
        var hmac = sponge.rate();
        // Check the security level is valid
        var securityLevel = checksumSecurity(hmac);
        if (securityLevel === 0) {
            throw new Error("Message Hash did not have a hamming weight of zero, security level is invalid");
        }
        // Decrypt the rest of the payload
        var decryptedMetadata = unmask(payloadTrits.slice(messageEnd + nonce.length), sponge);
        sponge.reset();
        // Get the signature and absorb its digest
        var signature = decryptedMetadata.slice(0, securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH);
        var digest = digestFromSignature(hmac, signature);
        sponge.absorb(digest, 0, digest.length);
        // Get the sibling information and validate it
        var siblingsCountData = pascalDecode(decryptedMetadata.slice(securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH));
        var siblingsCount = siblingsCountData.value;
        var recalculatedRoot = sponge.rate();
        if (siblingsCount !== 0) {
            var siblingsStart = (securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH) + siblingsCountData.end;
            var siblings = decryptedMetadata.slice(siblingsStart, siblingsStart + (siblingsCount * Curl.HASH_LENGTH));
            recalculatedRoot = MerkleTree.root(recalculatedRoot, siblings, index);
        }
        // Make sure the root matches the calculated one
        if (converter.trytes(recalculatedRoot) !== root) {
            throw new Error("Signature did not match expected root");
        }
        return {
            nextRoot: converter.trytes(nextRoot),
            message: converter.trytes(message)
        };
    }

    /**
     * Attach the mam message to the tangle.
     * @param api The api to use for attaching.
     * @param mamMessage The message to attach.
     * @param depth The depth to perform the attach.
     * @param mwm The mwm to perform the attach.
     * @param tag Optional tag for the transactions.
     * @returns The transactions that were attached.
     */
    function mamAttach(api, mamMessage, depth, mwm, tag) {
        return __awaiter(this, void 0, Promise, function () {
            var transfers, preparedTrytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transfers = [
                            {
                                address: mamMessage.address,
                                value: 0,
                                message: mamMessage.payload,
                                tag: tag
                            }
                        ];
                        return [4 /*yield*/, api.prepareTransfers("9".repeat(81), transfers)];
                    case 1:
                        preparedTrytes = _a.sent();
                        return [2 /*return*/, api.sendTrytes(preparedTrytes, depth, mwm)];
                }
            });
        });
    }
    /**
     * Fetch a mam message from a channel.
     * @param api The api to use for fetching.
     * @param root The root within the mam channel to fetch the message.
     * @param mode The mode to use for fetching.
     * @param sideKey The sideKey if mode is restricted.
     * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
     * throws exception if transactions found on address are invalid.
     */
    function mamFetch(api, root, mode, sideKey) {
        return __awaiter(this, void 0, Promise, function () {
            var messageAddress, txObjects;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validateModeKey(mode, sideKey);
                        messageAddress = decodeAddress(root, mode);
                        return [4 /*yield*/, api.findTransactionObjects({ addresses: [messageAddress] })];
                    case 1:
                        txObjects = _a.sent();
                        return [2 /*return*/, decodeTransactions(txObjects, messageAddress, root, sideKey)];
                }
            });
        });
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
            : converter.trytes(maskHash(converter.trits(root)));
    }
    /**
     * Fetch all the mam message from a channel.
     * If limit is undefined we use Number.MAX_VALUE, this could potentially take a long time to complete.
     * It is preferable to specify the limit so you read the data in chunks, then if you read and get the
     * same amount of messages as your limit you should probably read again.
     * @param api The api to use for fetching.
     * @param root The root within the mam channel to fetch the message.
     * @param mode The mode to use for fetching.
     * @param sideKey The sideKey if mode is restricted.
     * @param limit Limit the number of messages retrieved.
     * @returns The array of retrieved messages.
     */
    function mamFetchAll(api, root, mode, sideKey, limit) {
        return __awaiter(this, void 0, Promise, function () {
            var localLimit, messages, fetchRoot, fetched;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validateModeKey(mode, sideKey);
                        localLimit = limit === undefined ? Number.MAX_VALUE : limit;
                        messages = [];
                        fetchRoot = root;
                        _a.label = 1;
                    case 1: return [4 /*yield*/, mamFetch(api, fetchRoot, mode, sideKey)];
                    case 2:
                        fetched = _a.sent();
                        if (fetched) {
                            messages.push(fetched);
                            fetchRoot = fetched.nextRoot;
                        }
                        else {
                            fetchRoot = undefined;
                        }
                        _a.label = 3;
                    case 3:
                        if (fetchRoot && messages.length < localLimit) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4: return [2 /*return*/, messages];
                }
            });
        });
    }
    /**
     * Fetch the next message from a list of channels.
     * @param {API} api - The api to use for fetching.
     * @param {Object[]} channels - The list of channel details to check for new messages.
     * @param {string} channels[].root - The root within the mam channel to fetch the message.
     * @param {MamMode} channels[].mode - The mode to use for fetching.
     * @param {string=} channels[].sideKey - The sideKey if mode is restricted.
     * @returns The decoded messages and the nextRoot if successful for each channel, undefined if no messages found,
     * throws exception if transactions found on address are invalid.
     */
    function mamFetchCombined(api, channels) {
        return __awaiter(this, void 0, Promise, function () {
            var addresses, txObjects, messages, _loop_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addresses = channels.map(function (c) {
                            return c.mode === "public"
                                ? c.root
                                : converter.trytes(maskHash(converter.trits(c.root)));
                        });
                        return [4 /*yield*/, api.findTransactionObjects({ addresses: addresses })];
                    case 1:
                        txObjects = _a.sent();
                        messages = [];
                        _loop_1 = function (i) {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _b = (_a = messages).push;
                                        return [4 /*yield*/, decodeTransactions(txObjects.filter(function (t) { return t.address === addresses[i]; }), addresses[i], channels[i].root, channels[i].sideKey)];
                                    case 1:
                                        _b.apply(_a, [_c.sent()]);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < addresses.length)) return [3 /*break*/, 5];
                        return [5 /*yield**/, _loop_1(i)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, messages];
                }
            });
        });
    }
    /**
     * Decode transactions from an address to try and find a MAM message.
     * @param txObjects The objects returned from the fetch.
     * @param address The address that the data was fetched from.
     * @param root The root within the mam channel to fetch the message.
     * @param sideKey The sideKey if mode is restricted.
     * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
     * throws exception if transactions found on address are invalid.
     */
    function decodeTransactions(txObjects, address, root, sideKey) {
        return __awaiter(this, void 0, Promise, function () {
            var tails, notTails, _loop_2, i, state_1;
            return __generator(this, function (_a) {
                if (!txObjects || txObjects.length === 0) {
                    return [2 /*return*/];
                }
                tails = txObjects.filter(function (tx) { return tx.currentIndex === 0; });
                notTails = txObjects.filter(function (tx) { return tx.currentIndex !== 0; });
                _loop_2 = function (i) {
                    var msg = tails[i].signatureMessageFragment;
                    var currentTx = tails[i];
                    for (var j = 0; j < tails[i].lastIndex; j++) {
                        var nextTx = notTails.find(function (tx) { return tx.hash === currentTx.trunkTransaction; });
                        if (!nextTx) {
                            // This is an incomplete transaction chain so move onto
                            // the next tail
                            break;
                        }
                        msg += nextTx.signatureMessageFragment;
                        currentTx = nextTx;
                        // If we now have all the transactions which make up this message
                        // try and parse the message
                        if (j === tails[i].lastIndex - 1) {
                            try {
                                var parsed = parseMessage(msg, root, sideKey);
                                return { value: __assign(__assign({ root: root }, parsed), { tag: tails[i].tag }) };
                            }
                            catch (err) {
                                throw new Error("Failed while trying to read MAM channel from address " + address + ".\n" + err.message);
                            }
                        }
                    }
                };
                for (i = 0; i < tails.length; i++) {
                    state_1 = _loop_2(i);
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                }
                return [2 /*return*/];
            });
        });
    }

    exports.channelRoot = channelRoot;
    exports.createChannel = createChannel;
    exports.createMessage = createMessage;
    exports.decodeAddress = decodeAddress;
    exports.decodeTransactions = decodeTransactions;
    exports.mamAttach = mamAttach;
    exports.mamFetch = mamFetch;
    exports.mamFetchAll = mamFetchAll;
    exports.mamFetchCombined = mamFetchCombined;
    exports.parseMessage = parseMessage;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
