"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.digestFromSignature = exports.checksumSecurity = exports.signature = exports.privateKeyFromSubseed = exports.address = exports.digestFromSubseed = exports.subseed = exports.PRIVATE_KEY_FRAGMENT_LENGTH = void 0;
const curl_1 = require("../signing/curl");
const PRIVATE_KEY_NUM_FRAGMENTS = 27;
/* @internal */
exports.PRIVATE_KEY_FRAGMENT_LENGTH = PRIVATE_KEY_NUM_FRAGMENTS * curl_1.Curl.HASH_LENGTH;
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
    const sponge = new curl_1.Curl(27);
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
    const ss = new Int8Array(curl_1.Curl.HASH_LENGTH);
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
    const curl1 = new curl_1.Curl(27);
    const curl2 = new curl_1.Curl(27);
    const curl3 = new curl_1.Curl(27);
    const length = securityLevel * exports.PRIVATE_KEY_FRAGMENT_LENGTH / curl_1.Curl.HASH_LENGTH;
    const digest = new Int8Array(curl_1.Curl.HASH_LENGTH);
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
    const sponge = new curl_1.Curl(27);
    sponge.absorb(digests, 0, digests.length);
    const addressTrits = new Int8Array(curl_1.Curl.HASH_LENGTH);
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
    const sponge = new curl_1.Curl(27);
    sponge.absorb(subSeed, 0, subSeed.length);
    sponge.squeeze(keyTrits, 0, keyTrits.length);
    for (let i = 0; i < keyLength / curl_1.Curl.HASH_LENGTH; i++) {
        const offset = i * curl_1.Curl.HASH_LENGTH;
        sponge.reset();
        sponge.absorb(keyTrits, offset, curl_1.Curl.HASH_LENGTH);
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
    const sponge = new curl_1.Curl(27);
    for (let i = 0; i < key.length / curl_1.Curl.HASH_LENGTH; i++) {
        let buffer = key.subarray(i * curl_1.Curl.HASH_LENGTH, (i + 1) * curl_1.Curl.HASH_LENGTH);
        for (let k = 0; k < MAX_TRYTE_VALUE - (hashTrits[i * 3] + (hashTrits[(i * 3) + 1] * 3) + (hashTrits[(i * 3) + 2] * 9)); k++) {
            sponge.reset();
            sponge.absorb(buffer, 0, buffer.length);
            buffer = sponge.rate();
        }
        signatures.set(buffer, i * curl_1.Curl.HASH_LENGTH);
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
    if (hash.slice(0, curl_1.Curl.HASH_LENGTH / 3).reduce((a, b) => a + b, 0) === 0) {
        return 1;
    }
    if (hash.slice(0, 2 * curl_1.Curl.HASH_LENGTH / 3).reduce((a, b) => a + b, 0) === 0) {
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
 * @internal
 */
function digestFromSignature(hash, sig) {
    const sponge = new curl_1.Curl(27);
    const bytes = new Int8Array(sig.length);
    for (let i = 0; i < (sig.length / curl_1.Curl.HASH_LENGTH); i++) {
        let innerBytes = sig.slice(i * curl_1.Curl.HASH_LENGTH, (i + 1) * curl_1.Curl.HASH_LENGTH);
        for (let j = 0; j < (hash[i * 3] + (hash[(i * 3) + 1] * 3) + (hash[(i * 3) + 2] * 9)) - MIN_TRYTE_VALUE; j++) {
            sponge.reset();
            sponge.absorb(innerBytes, 0, innerBytes.length);
            innerBytes = sponge.rate();
        }
        bytes.set(innerBytes, i * curl_1.Curl.HASH_LENGTH);
    }
    sponge.reset();
    sponge.absorb(bytes, 0, bytes.length);
    return sponge.rate();
}
exports.digestFromSignature = digestFromSignature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNzLXAyNy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zaWduaW5nL2lzcy1wMjcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMENBQXVDO0FBRXZDLE1BQU0seUJBQXlCLEdBQVcsRUFBRSxDQUFDO0FBQzdDLGVBQWU7QUFDRixRQUFBLDJCQUEyQixHQUFXLHlCQUF5QixHQUFHLFdBQUksQ0FBQyxXQUFXLENBQUM7QUFDaEcsTUFBTSxlQUFlLEdBQVcsQ0FBQyxFQUFFLENBQUM7QUFDcEMsTUFBTSxlQUFlLEdBQVcsRUFBRSxDQUFDO0FBQ25DLE1BQU0sY0FBYyxHQUFXLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLE1BQU0sY0FBYyxHQUFXLENBQUMsQ0FBQztBQUVqQzs7Ozs7O0dBTUc7QUFDSCxTQUFnQixPQUFPLENBQUMsSUFBZSxFQUFFLEtBQWE7SUFDbEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxXQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFNUIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JDLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztJQUV2QixPQUFPLFVBQVUsRUFBRSxHQUFHLENBQUMsRUFBRTtRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QyxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLGNBQWMsRUFBRTtnQkFDeEMsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQzthQUN2QztpQkFBTTtnQkFDSCxNQUFNO2FBQ1Q7U0FDSjtLQUNKO0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRCxNQUFNLEVBQUUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxXQUFJ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