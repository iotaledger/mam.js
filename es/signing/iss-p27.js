"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.digestFromSignature = exports.checksumSecurity = exports.signature = exports.privateKeyFromSubseed = exports.address = exports.digestFromSubseed = exports.subseed = exports.PRIVATE_KEY_FRAGMENT_LENGTH = void 0;
const curl_1 = require("../signing/curl");
const PRIVATE_KEY_NUM_FRAGMENTS = 27;
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
 * @private
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
 * @private
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
 * @private
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
 * @private
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
 * @private
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
 * @private
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
 * @private
 */
function digestFromSignature(hash, sig) {
    const sponge = new curl_1.Curl(27);
    const buffer = new Int8Array(sig.length);
    for (let i = 0; i < (sig.length / curl_1.Curl.HASH_LENGTH); i++) {
        let innerBuffer = sig.slice(i * curl_1.Curl.HASH_LENGTH, (i + 1) * curl_1.Curl.HASH_LENGTH);
        for (let j = 0; j < (hash[i * 3] + (hash[(i * 3) + 1] * 3) + (hash[(i * 3) + 2] * 9)) - MIN_TRYTE_VALUE; j++) {
            sponge.reset();
            sponge.absorb(innerBuffer, 0, innerBuffer.length);
            innerBuffer = sponge.rate();
        }
        buffer.set(innerBuffer, i * curl_1.Curl.HASH_LENGTH);
    }
    sponge.reset();
    sponge.absorb(buffer, 0, buffer.length);
    return sponge.rate();
}
exports.digestFromSignature = digestFromSignature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNzLXAyNy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zaWduaW5nL2lzcy1wMjcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMENBQXVDO0FBRXZDLE1BQU0seUJBQXlCLEdBQVcsRUFBRSxDQUFDO0FBQ2hDLFFBQUEsMkJBQTJCLEdBQVcseUJBQXlCLEdBQUcsV0FBSSxDQUFDLFdBQVcsQ0FBQztBQUNoRyxNQUFNLGVBQWUsR0FBVyxDQUFDLEVBQUUsQ0FBQztBQUNwQyxNQUFNLGVBQWUsR0FBVyxFQUFFLENBQUM7QUFDbkMsTUFBTSxjQUFjLEdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDbEMsTUFBTSxjQUFjLEdBQVcsQ0FBQyxDQUFDO0FBRWpDOzs7Ozs7R0FNRztBQUNILFNBQWdCLE9BQU8sQ0FBQyxJQUFlLEVBQUUsS0FBYTtJQUNsRCxNQUFNLE1BQU0sR0FBRyxJQUFJLFdBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUU1QixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBRXZCLE9BQU8sVUFBVSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1FBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdDLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksY0FBYyxFQUFFO2dCQUN4QyxlQUFlLENBQUMsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDO2FBQ3ZDO2lCQUFNO2dCQUNILE1BQU07YUFDVDtTQUNKO0tBQ0o7SUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLEVBQUUsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFELE1BQU0sRUFBRSxHQUFHLElBQUksU0FBUyxDQUFDLFdBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRWpDLE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQXJCRCwwQkFxQkM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxTQUFnQixpQkFBaUIsQ0FBQyxPQUFrQixFQUFFLGFBQXFCO0lBQ3ZFLE1BQU0sS0FBSyxHQUFHLElBQUksV0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLE1BQU0sS0FBSyxHQUFHLElBQUksV0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLE1BQU0sS0FBSyxHQUFHLElBQUksV0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTNCLE1BQU0sTUFBTSxHQUFHLGFBQWEsR0FBRyxtQ0FBMkIsR0FBRyxXQUFJLENBQUMsV0FBVyxDQUFDO0lBQzlFLE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDLFdBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUUvQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXpDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDN0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxHQUFHLGVBQWUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUQsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzNDO1FBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMxQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFeEMsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQXpCRCw4Q0F5QkM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQWdCLE9BQU8sQ0FBQyxPQUFrQjtJQUN0QyxNQUFNLE1BQU0sR0FBRyxJQUFJLFdBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUU1QixNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTFDLE1BQU0sWUFBWSxHQUFHLElBQUksU0FBUyxDQUFDLFdBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNyRCxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXJELE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUFURCwwQkFTQztBQUVEOzs7Ozs7R0FNRztBQUNILFNBQWdCLHFCQUFxQixDQUFDLE9BQWtCLEVBQUUsYUFBcUI7SUFDM0UsTUFBTSxTQUFTLEdBQUcsYUFBYSxHQUFHLG1DQUEyQixDQUFDO0lBQzlELE1BQU0sUUFBUSxHQUFHLElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sY0FBYyxHQUFjLElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTNELE1BQU0sTUFBTSxHQUFHLElBQUksV0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU3QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxHQUFHLFdBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbkQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLFdBQUksQ0FBQyxXQUFXLENBQUM7UUFFcEMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFdBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVsRCxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUM3QztJQUVELE9BQU8sY0FBYyxDQUFDO0FBQzFCLENBQUM7QUFwQkQsc0RBb0JDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsU0FBUyxDQUFDLFNBQW9CLEVBQUUsR0FBYztJQUMxRCxNQUFNLFVBQVUsR0FBYyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxXQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsV0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwRCxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxXQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFdBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU1RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDVixDQUFDLEdBQUcsZUFBZSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUN0RyxDQUFDLEVBQUUsRUFBRTtZQUNMLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNmLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMxQjtRQUVELFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxXQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDaEQ7SUFFRCxPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDO0FBbkJELDhCQW1CQztBQUVEOzs7OztHQUtHO0FBQ0gsU0FBZ0IsZ0JBQWdCLENBQUMsSUFBZTtJQUM1QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFdBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDdEUsT0FBTyxDQUFDLENBQUM7S0FDWjtJQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDMUUsT0FBTyxDQUFDLENBQUM7S0FDWjtJQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBVkQsNENBVUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxTQUFnQixtQkFBbUIsQ0FBQyxJQUFlLEVBQUUsR0FBYztJQUMvRCxNQUFNLE1BQU0sR0FBRyxJQUFJLFdBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QixNQUFNLE1BQU0sR0FBYyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFcEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxXQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEQsSUFBSSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsV0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxXQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFOUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLGVBQWUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDZixNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xELFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDL0I7UUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsV0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ2pEO0lBRUQsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV4QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN6QixDQUFDO0FBcEJELGtEQW9CQyJ9