import { Curl } from "../signing/curl";
/**
 * Create the mask hash for the key.
 * @param keyTrits The key to create the mask hash for.
 * @returns The masked hash.
 * @private
 */
export declare function maskHash(keyTrits: Int8Array): Int8Array;
/**
 * Apply mask to the payload.
 * @param payload The payload to apply the mask to.
 * @param sponge The sponge to use.
 * @returns The masked payload.
 * @private
 */
export declare function mask(payload: Int8Array, sponge: Curl): Int8Array;
/**
 * Unmask a payload.
 * @param payload The payload to unmask.
 * @param sponge The sponge to use.
 * @returns The unmasked payload.
 * @private
 */
export declare function unmask(payload: Int8Array, sponge: Curl): Int8Array;
