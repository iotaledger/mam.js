export declare const PRIVATE_KEY_FRAGMENT_LENGTH: number;
/**
 * Calculate the subseed for the seed.
 * @param seed The seed trits.
 * @param index The index for the subseed.
 * @returns The subseed trits.
 * @private
 */
export declare function subseed(seed: Int8Array, index: number): Int8Array;
/**
 * Get the digest from the subseed.
 * @param subSeed The subseed to get the digest for.
 * @param securityLevel The security level to get the digest.
 * @returns The digest trits.
 * @private
 */
export declare function digestFromSubseed(subSeed: Int8Array, securityLevel: number): Int8Array;
/**
 * Get the address from the digests.
 * @param digests The digests to get the address for.
 * @returns The address trits.
 * @private
 */
export declare function address(digests: Int8Array): Int8Array;
/**
 * Get the private key from the subseed.
 * @param subSeed The subseed to get the private key for.
 * @param securityLevel The security level for the private key.
 * @returns The private key trits.
 * @private
 */
export declare function privateKeyFromSubseed(subSeed: Int8Array, securityLevel: number): Int8Array;
/**
 * Create a signature for the trits.
 * @param hashTrits The trits to create the signature for.
 * @param key The key to use for signing.
 * @returns The signature trits.
 * @private
 */
export declare function signature(hashTrits: Int8Array, key: Int8Array): Int8Array;
/**
 * Check the security level.
 * @param hash The hash to check.
 * @returns The security level
 * @private
 */
export declare function checksumSecurity(hash: Int8Array): number;
/**
 * Get the digest from the signature
 * @param hash The hash to get the digest.
 * @param sig The signature.
 * @returns The digest.
 * @private
 */
export declare function digestFromSignature(hash: Int8Array, sig: Int8Array): Int8Array;
