"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const curl_1 = __importDefault(require("@iota/curl"));
const arrayHelper_1 = require("../utils/arrayHelper");
const curlHelper_1 = require("../utils/curlHelper");
const PRIVATE_KEY_NUM_FRAGMENTS = 27;
exports.PRIVATE_KEY_FRAGMENT_LENGTH = PRIVATE_KEY_NUM_FRAGMENTS * curl_1.default.HASH_LENGTH;
const MIN_TRYTE_VALUE = -13;
const MAX_TRYTE_VALUE = 13;
const MIN_TRIT_VALUE = -1;
const MAX_TRIT_VALUE = 1;
/**
 * Calculate the subseed for the seed.
 * @param seed The seed trits.
 * @param index The index for the subseed.
 * @returns The subseed trits.
 */
function subseed(seed, index) {
    const sponge = new curl_1.default(27);
    sponge.initialize();
    const subseedPreimage = seed.slice();
    let localIndex = index;
    while (localIndex-- > 0) {
        for (let i = 0; i < subseedPreimage.length; i++) {
            if (++subseedPreimage[i] > MAX_TRIT_VALUE) {
                subseedPreimage[i] = MIN_TRIT_VALUE;
            }
            else {
                break;
            }
        }
    }
    sponge.absorb(subseedPreimage, 0, subseedPreimage.length);
    const ss = new Int8Array(curl_1.default.HASH_LENGTH);
    sponge.squeeze(ss, 0, ss.length);
    return ss;
}
exports.subseed = subseed;
/**
 * Get the digest from the subseed.
 * @param subSeed The subseed to get the digest for.
 * @param securityLevel The security level to get the digest.
 * @returns The digest trits.
 */
function digestFromSubseed(subSeed, securityLevel) {
    const curl1 = new curl_1.default(27);
    const curl2 = new curl_1.default(27);
    const curl3 = new curl_1.default(27);
    const length = securityLevel * exports.PRIVATE_KEY_FRAGMENT_LENGTH / curl_1.default.HASH_LENGTH;
    const digest = new Int8Array(curl_1.default.HASH_LENGTH);
    curl1.reset();
    curl2.reset();
    curl3.reset();
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
 */
function address(digests) {
    const sponge = new curl_1.default(27);
    const hashLength = curl_1.default.HASH_LENGTH;
    sponge.initialize();
    sponge.absorb(digests, 0, digests.length);
    const addressTrits = new Int8Array(hashLength);
    sponge.squeeze(addressTrits, 0, addressTrits.length);
    return addressTrits;
}
exports.address = address;
/**
 * Get the private key from the subseed.
 * @param subSeed The subseed to get the private key for.
 * @param securityLevel The security level for the private key.
 * @returns The private key trits.
 */
function privateKeyFromSubseed(subSeed, securityLevel) {
    const keyLength = securityLevel * exports.PRIVATE_KEY_FRAGMENT_LENGTH;
    const keyTrits = new Int8Array(keyLength);
    const actualKeyTrits = [];
    const sponge = new curl_1.default(27);
    sponge.initialize();
    sponge.reset();
    sponge.absorb(subSeed, 0, subSeed.length);
    sponge.squeeze(keyTrits, 0, keyTrits.length);
    for (let i = 0; i < keyLength / curl_1.default.HASH_LENGTH; i++) {
        const offset = i * curl_1.default.HASH_LENGTH;
        sponge.reset();
        sponge.absorb(keyTrits, offset, curl_1.default.HASH_LENGTH);
        actualKeyTrits.push(curlHelper_1.curlRate(sponge));
    }
    return arrayHelper_1.concatenate(actualKeyTrits);
}
exports.privateKeyFromSubseed = privateKeyFromSubseed;
/**
 * Create a signature for the trits.
 * @param hashTrits The trits to create the signature for.
 * @param key The key to use for signing.
 * @returns The signature trits.
 */
function signature(hashTrits, key) {
    const sponge = new curl_1.default(27);
    const signatures = [];
    for (let i = 0; i < key.length / curl_1.default.HASH_LENGTH; i++) {
        let buffer = key.slice(i * curl_1.default.HASH_LENGTH, (i + 1) * curl_1.default.HASH_LENGTH);
        for (let k = 0; k < MAX_TRYTE_VALUE - (hashTrits[i * 3] + hashTrits[i * 3 + 1] * 3 + hashTrits[i * 3 + 2] * 9); k++) {
            sponge.reset();
            sponge.absorb(buffer, 0, buffer.length);
            buffer = curlHelper_1.curlRate(sponge);
        }
        signatures.push(buffer);
    }
    return arrayHelper_1.concatenate(signatures);
}
exports.signature = signature;
/**
 * Check the security level.
 * @param hash The hash to check.
 * @returns The security level
 */
function checksumSecurity(hash) {
    if (hash.slice(0, curl_1.default.HASH_LENGTH / 3).reduce((a, b) => a + b, 0) === 0) {
        return 1;
    }
    if (hash.slice(0, 2 * curl_1.default.HASH_LENGTH / 3).reduce((a, b) => a + b, 0) === 0) {
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
 */
function digestFromSignature(hash, sig) {
    const sponge = new curl_1.default(27);
    const buffer = [];
    for (let i = 0; i < (sig.length / curl_1.default.HASH_LENGTH); i++) {
        let innerBuffer = sig.slice(i * curl_1.default.HASH_LENGTH, (i + 1) * curl_1.default.HASH_LENGTH);
        for (let j = 0; j < (hash[i * 3] + hash[i * 3 + 1] * 3 + hash[i * 3 + 2] * 9) - MIN_TRYTE_VALUE; j++) {
            sponge.reset();
            sponge.absorb(innerBuffer, 0, innerBuffer.length);
            innerBuffer = curlHelper_1.curlRate(sponge);
        }
        buffer.push(innerBuffer);
    }
    sponge.reset();
    const final = arrayHelper_1.concatenate(buffer);
    sponge.absorb(final, 0, final.length);
    return curlHelper_1.curlRate(sponge);
}
exports.digestFromSignature = digestFromSignature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNzLXAyNy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zaWduaW5nL2lzcy1wMjcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsc0RBQW1EO0FBQ25ELG9EQUErQztBQUUvQyxNQUFNLHlCQUF5QixHQUFXLEVBQUUsQ0FBQztBQUNoQyxRQUFBLDJCQUEyQixHQUFXLHlCQUF5QixHQUFHLGNBQUksQ0FBQyxXQUFXLENBQUM7QUFDaEcsTUFBTSxlQUFlLEdBQVcsQ0FBQyxFQUFFLENBQUM7QUFDcEMsTUFBTSxlQUFlLEdBQVcsRUFBRSxDQUFDO0FBQ25DLE1BQU0sY0FBYyxHQUFXLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLE1BQU0sY0FBYyxHQUFXLENBQUMsQ0FBQztBQUVqQzs7Ozs7R0FLRztBQUNILFNBQWdCLE9BQU8sQ0FBQyxJQUFlLEVBQUUsS0FBYTtJQUNsRCxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QixNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7SUFFcEIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JDLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztJQUV2QixPQUFPLFVBQVUsRUFBRSxHQUFHLENBQUMsRUFBRTtRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLGNBQWMsRUFBRTtnQkFDdkMsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQzthQUN2QztpQkFBTTtnQkFDSCxNQUFNO2FBQ1Q7U0FDSjtLQUNKO0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRCxNQUFNLEVBQUUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxjQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVqQyxPQUFPLEVBQUUsQ0FBQztBQUNkLENBQUM7QUF0QkQsMEJBc0JDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFnQixpQkFBaUIsQ0FBQyxPQUFrQixFQUFFLGFBQXFCO0lBQ3ZFLE1BQU0sS0FBSyxHQUFHLElBQUksY0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLE1BQU0sS0FBSyxHQUFHLElBQUksY0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLE1BQU0sS0FBSyxHQUFHLElBQUksY0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTNCLE1BQU0sTUFBTSxHQUFHLGFBQWEsR0FBRyxtQ0FBMkIsR0FBRyxjQUFJLENBQUMsV0FBVyxDQUFDO0lBQzlFLE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDLGNBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUUvQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZCxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZCxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFZCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXpDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDN0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxHQUFHLGVBQWUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUQsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzNDO1FBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMxQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFeEMsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQTdCRCw4Q0E2QkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsT0FBTyxDQUFDLE9BQWtCO0lBQ3RDLE1BQU0sTUFBTSxHQUFHLElBQUksY0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLE1BQU0sVUFBVSxHQUFHLGNBQUksQ0FBQyxXQUFXLENBQUM7SUFFcEMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFMUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVyRCxPQUFPLFlBQVksQ0FBQztBQUN4QixDQUFDO0FBWEQsMEJBV0M7QUFFRDs7Ozs7R0FLRztBQUNILFNBQWdCLHFCQUFxQixDQUFDLE9BQWtCLEVBQUUsYUFBcUI7SUFDM0UsTUFBTSxTQUFTLEdBQUcsYUFBYSxHQUFHLG1DQUEyQixDQUFDO0lBQzlELE1BQU0sUUFBUSxHQUFHLElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUUxQixNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUU1QixNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTdDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEdBQUcsY0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuRCxNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQUcsY0FBSSxDQUFDLFdBQVcsQ0FBQztRQUVwQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsY0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRWxELGNBQWMsQ0FBQyxJQUFJLENBQUMscUJBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ3pDO0lBRUQsT0FBTyx5QkFBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUF0QkQsc0RBc0JDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFnQixTQUFTLENBQUMsU0FBb0IsRUFBRSxHQUFjO0lBQzFELE1BQU0sTUFBTSxHQUFHLElBQUksY0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTVCLE1BQU0sVUFBVSxHQUFnQixFQUFFLENBQUM7SUFFbkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsY0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwRCxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxjQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLGNBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDVixDQUFDLEdBQUcsZUFBZSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQzlGLENBQUMsRUFBRSxFQUFFO1lBQ0wsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QyxNQUFNLEdBQUcscUJBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM3QjtRQUVELFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDM0I7SUFFRCxPQUFPLHlCQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQW5CRCw4QkFtQkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsZ0JBQWdCLENBQUMsSUFBZTtJQUM1QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLGNBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDdEUsT0FBTyxDQUFDLENBQUM7S0FDWjtJQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDMUUsT0FBTyxDQUFDLENBQUM7S0FDWjtJQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBVkQsNENBVUM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQWdCLG1CQUFtQixDQUFDLElBQWUsRUFBRSxHQUFjO0lBQy9ELE1BQU0sTUFBTSxHQUFHLElBQUksY0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLE1BQU0sTUFBTSxHQUFnQixFQUFFLENBQUM7SUFFL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxjQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEQsSUFBSSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsY0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxjQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFOUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsZUFBZSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNmLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEQsV0FBVyxHQUFHLHFCQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbEM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQzVCO0lBRUQsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsTUFBTSxLQUFLLEdBQUcseUJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXRDLE9BQU8scUJBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBckJELGtEQXFCQyJ9