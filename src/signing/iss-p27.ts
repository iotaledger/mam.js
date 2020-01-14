import { Curl } from "../signing/curl";

const PRIVATE_KEY_NUM_FRAGMENTS: number = 27;
export const PRIVATE_KEY_FRAGMENT_LENGTH: number = PRIVATE_KEY_NUM_FRAGMENTS * Curl.HASH_LENGTH;
const MIN_TRYTE_VALUE: number = -13;
const MAX_TRYTE_VALUE: number = 13;
const MIN_TRIT_VALUE: number = -1;
const MAX_TRIT_VALUE: number = 1;

/**
 * Calculate the subseed for the seed.
 * @param seed The seed trits.
 * @param index The index for the subseed.
 * @returns The subseed trits.
 * @private
 */
export function subseed(seed: Int8Array, index: number): Int8Array {
    const sponge = new Curl(27);

    const subseedPreimage = seed.slice();
    let localIndex = index;

    while (localIndex-- > 0) {
        for (let i = 0; i < subseedPreimage.length; i++) {
            if (subseedPreimage[i]++ >= MAX_TRIT_VALUE) {
                subseedPreimage[i] = MIN_TRIT_VALUE;
            } else {
                break;
            }
        }
    }

    sponge.absorb(subseedPreimage, 0, subseedPreimage.length);
    const ss = new Int8Array(Curl.HASH_LENGTH);
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
export function digestFromSubseed(subSeed: Int8Array, securityLevel: number): Int8Array {
    const curl1 = new Curl(27);
    const curl2 = new Curl(27);
    const curl3 = new Curl(27);

    const length = securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH / Curl.HASH_LENGTH;
    const digest = new Int8Array(Curl.HASH_LENGTH);

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
 * @private
 */
export function address(digests: Int8Array): Int8Array {
    const sponge = new Curl(27);

    sponge.absorb(digests, 0, digests.length);

    const addressTrits = new Int8Array(Curl.HASH_LENGTH);
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
export function privateKeyFromSubseed(subSeed: Int8Array, securityLevel: number): Int8Array {
    const keyLength = securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH;
    const keyTrits = new Int8Array(keyLength);
    const actualKeyTrits: Int8Array = new Int8Array(keyLength);

    const sponge = new Curl(27);

    sponge.absorb(subSeed, 0, subSeed.length);
    sponge.squeeze(keyTrits, 0, keyTrits.length);

    for (let i = 0; i < keyLength / Curl.HASH_LENGTH; i++) {
        const offset = i * Curl.HASH_LENGTH;

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
export function signature(hashTrits: Int8Array, key: Int8Array): Int8Array {
    const signatures: Int8Array = new Int8Array(key.length);
    const sponge = new Curl(27);

    for (let i = 0; i < key.length / Curl.HASH_LENGTH; i++) {
        let buffer = key.subarray(i * Curl.HASH_LENGTH, (i + 1) * Curl.HASH_LENGTH);

        for (let k = 0;
            k < MAX_TRYTE_VALUE - (hashTrits[i * 3] + hashTrits[i * 3 + 1] * 3 + hashTrits[i * 3 + 2] * 9);
            k++) {
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
export function checksumSecurity(hash: Int8Array): number {
    if (hash.slice(0, Curl.HASH_LENGTH / 3).reduce((a, b) => a + b, 0) === 0) {
        return 1;
    }

    if (hash.slice(0, 2 * Curl.HASH_LENGTH / 3).reduce((a, b) => a + b, 0) === 0) {
        return 2;
    }

    return hash.reduce((a, b) => a + b, 0) === 0 ? 3 : 0;
}

/**
 * Get the digest from the signature
 * @param hash The hash to get the digest.
 * @param sig The signature.
 * @returns The digest.
 * @private
 */
export function digestFromSignature(hash: Int8Array, sig: Int8Array): Int8Array {
    const sponge = new Curl(27);
    const buffer: Int8Array = new Int8Array(sig.length);

    for (let i = 0; i < (sig.length / Curl.HASH_LENGTH); i++) {
        let innerBuffer = sig.slice(i * Curl.HASH_LENGTH, (i + 1) * Curl.HASH_LENGTH);

        for (let j = 0; j < (hash[i * 3] + hash[i * 3 + 1] * 3 + hash[i * 3 + 2] * 9) - MIN_TRYTE_VALUE; j++) {
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
