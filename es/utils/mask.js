// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Curl } from "@iota/crypto.js";
/**
 * Create the mask hash for the key.
 * @param keyTrits The key to create the mask hash for.
 * @returns The masked hash.
 * @internal
 */
export function maskHash(keyTrits) {
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
 * @internal
 */
export function mask(payload, sponge) {
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
 * @internal
 */
export function unmask(payload, sponge) {
    const unmasked = new Int8Array(payload);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9tYXNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXZDOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLFFBQVEsQ0FBQyxRQUFtQjtJQUN4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUU1QixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTVDLE1BQU0sYUFBYSxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0RCxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXZELE9BQU8sYUFBYSxDQUFDO0FBQ3pCLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsSUFBSSxDQUFDLE9BQWtCLEVBQUUsTUFBWTtJQUNqRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFL0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2hDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTlFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25DLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFCO0tBQ0o7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLE1BQU0sQ0FBQyxPQUFrQixFQUFFLE1BQVk7SUFDbkQsTUFBTSxRQUFRLEdBQWMsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFbkQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQy9FLElBQUksS0FBSyxDQUFDO0lBQ1YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM1QixNQUFNLFlBQVksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUUxQyxJQUFJLFlBQVksS0FBSyxDQUFDLEVBQUU7WUFDcEIsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUVELElBQUksS0FBSyxFQUFFO1lBQ1AsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztTQUM1RDtRQUVELElBQUksWUFBWSxLQUFLLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNsRztLQUNKO0lBRUQsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNILFNBQVMsT0FBTyxDQUFDLElBQVksRUFBRSxLQUFhO0lBQ3hDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7SUFFekIsUUFBUSxHQUFHLEVBQUU7UUFDVCxLQUFLLENBQUM7WUFDRixPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2QsS0FBSyxDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsQ0FBQztRQUNiO1lBQ0ksT0FBTyxHQUFHLENBQUM7S0FDbEI7QUFDTCxDQUFDIn0=