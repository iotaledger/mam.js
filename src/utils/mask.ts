import { trits } from "@iota/converter";
import Curl from "@iota/curl";
import { concatenate } from "./arrayHelper";
import { curlRate } from "./curlHelper";

/**
 * Create the mask hash for the key and salt it if provided.
 * @param keyTrits The key to create the mask hash for.
 * @returns The mask hash.
 */
export function maskHash(keyTrits: Int8Array): Int8Array {
    const sponge = new Curl(81);

    sponge.reset();
    sponge.absorb(keyTrits, 0, keyTrits.length);

    const finalKeyTrits = new Int8Array(Curl.HASH_LENGTH);
    sponge.squeeze(finalKeyTrits, 0, finalKeyTrits.length);

    return finalKeyTrits;
}

/**
 * Apply mask to the payload.
 * @param payload The payload to apply the mask to.
 * @param sponge The sponge to use.
 * @returns The masked payload.
 */
export function mask(payload: Int8Array, sponge: Curl): Int8Array {
    const keyChunk = curlRate(sponge);

    const numChunks = Math.ceil(payload.length / Curl.HASH_LENGTH);
    for (let c = 0; c < numChunks; c++) {
        const chunk = payload.slice(c * Curl.HASH_LENGTH, (c + 1) * Curl.HASH_LENGTH);

        sponge.absorb(chunk, 0, chunk.length);

        const state = curlRate(sponge);
        for (let i = 0; i < chunk.length; i++) {
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
 */
export function unmask(payload: Int8Array, sponge: Curl): Int8Array {
    const unmasked: Int8Array[] = [];

    const numChunks = Math.ceil(payload.length / Curl.HASH_LENGTH);
    for (let c = 0; c < numChunks; c++) {
        const chunk = payload.slice(c * Curl.HASH_LENGTH, (c + 1) * Curl.HASH_LENGTH);

        const state = curlRate(sponge);

        for (let i = 0; i < chunk.length; i++) {
            chunk[i] = tritSum(chunk[i], -state[i]);
        }

        unmasked.push(chunk);
        sponge.absorb(chunk, 0, chunk.length);
    }

    return concatenate(unmasked);
}

/**
 * Sum the parts of a trit.
 * @param left The left part.
 * @param right The right part.
 * @returns The sum.
 */
function tritSum(left: number, right: number): number {
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
