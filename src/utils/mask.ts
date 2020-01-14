import { Curl } from "../signing/curl";

/**
 * Create the mask hash for the key.
 * @param keyTrits The key to create the mask hash for.
 * @returns The masked hash.
 * @private
 */
export function maskHash(keyTrits: Int8Array): Int8Array {
    const sponge = new Curl(81);

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
 * @private
 */
export function mask(payload: Int8Array, sponge: Curl): Int8Array {
    const keyChunk = sponge.rate();

    const numChunks = Math.ceil(payload.length / Curl.HASH_LENGTH);
    for (let c = 0; c < numChunks; c++) {
        const chunk = payload.slice(c * Curl.HASH_LENGTH, (c + 1) * Curl.HASH_LENGTH);

        sponge.absorb(chunk, 0, chunk.length);

        const state = sponge.rate();
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
 * @private
 */
export function unmask(payload: Int8Array, sponge: Curl): Int8Array {
    const unmasked: Int8Array = new Int8Array(payload);

    const limit = Math.ceil(unmasked.length / Curl.HASH_LENGTH) * Curl.HASH_LENGTH;
    let state;
    for (let c = 0; c < limit; c++) {
        const indexInChunk = c % Curl.HASH_LENGTH;

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
