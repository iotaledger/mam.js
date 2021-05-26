"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unmask = exports.mask = exports.maskHash = void 0;
// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const iota_js_1 = require("@iota/iota.js");
/**
 * Create the mask hash for the key.
 * @param keyTrits The key to create the mask hash for.
 * @returns The masked hash.
 * @internal
 */
function maskHash(keyTrits) {
    const sponge = new iota_js_1.Curl(81);
    sponge.absorb(keyTrits, 0, keyTrits.length);
    const finalKeyTrits = new Int8Array(iota_js_1.Curl.HASH_LENGTH);
    sponge.squeeze(finalKeyTrits, 0, finalKeyTrits.length);
    return finalKeyTrits;
}
exports.maskHash = maskHash;
/**
 * Apply mask to the payload.
 * @param payload The payload to apply the mask to.
 * @param sponge The sponge to use.
 * @returns The masked payload.
 * @internal
 */
function mask(payload, sponge) {
    const keyChunk = sponge.rate();
    const numChunks = Math.ceil(payload.length / iota_js_1.Curl.HASH_LENGTH);
    for (let c = 0; c < numChunks; c++) {
        const chunk = payload.slice(c * iota_js_1.Curl.HASH_LENGTH, (c + 1) * iota_js_1.Curl.HASH_LENGTH);
        sponge.absorb(chunk, 0, chunk.length);
        const state = sponge.rate();
        for (let i = 0; i < chunk.length; i++) {
            payload[(c * iota_js_1.Curl.HASH_LENGTH) + i] = tritSum(chunk[i], keyChunk[i]);
            keyChunk[i] = state[i];
        }
    }
    return payload;
}
exports.mask = mask;
/**
 * Unmask a payload.
 * @param payload The payload to unmask.
 * @param sponge The sponge to use.
 * @returns The unmasked payload.
 * @internal
 */
function unmask(payload, sponge) {
    const unmasked = new Int8Array(payload);
    const limit = Math.ceil(unmasked.length / iota_js_1.Curl.HASH_LENGTH) * iota_js_1.Curl.HASH_LENGTH;
    let state;
    for (let c = 0; c < limit; c++) {
        const indexInChunk = c % iota_js_1.Curl.HASH_LENGTH;
        if (indexInChunk === 0) {
            state = sponge.rate();
        }
        if (state) {
            unmasked[c] = tritSum(unmasked[c], -state[indexInChunk]);
        }
        if (indexInChunk === iota_js_1.Curl.HASH_LENGTH - 1) {
            sponge.absorb(unmasked, Math.floor(c / iota_js_1.Curl.HASH_LENGTH) * iota_js_1.Curl.HASH_LENGTH, iota_js_1.Curl.HASH_LENGTH);
        }
    }
    return unmasked;
}
exports.unmask = unmask;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9tYXNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsMkNBQXFDO0FBRXJDOzs7OztHQUtHO0FBQ0gsU0FBZ0IsUUFBUSxDQUFDLFFBQW1CO0lBQ3hDLE1BQU0sTUFBTSxHQUFHLElBQUksY0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFNUMsTUFBTSxhQUFhLEdBQUcsSUFBSSxTQUFTLENBQUMsY0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RELE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFdkQsT0FBTyxhQUFhLENBQUM7QUFDekIsQ0FBQztBQVRELDRCQVNDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsSUFBSSxDQUFDLE9BQWtCLEVBQUUsTUFBWTtJQUNqRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFL0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLGNBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2hDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLGNBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsY0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTlFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25DLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxjQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFCO0tBQ0o7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBakJELG9CQWlCQztBQUVEOzs7Ozs7R0FNRztBQUNILFNBQWdCLE1BQU0sQ0FBQyxPQUFrQixFQUFFLE1BQVk7SUFDbkQsTUFBTSxRQUFRLEdBQWMsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFbkQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLGNBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxjQUFJLENBQUMsV0FBVyxDQUFDO0lBQy9FLElBQUksS0FBSyxDQUFDO0lBQ1YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM1QixNQUFNLFlBQVksR0FBRyxDQUFDLEdBQUcsY0FBSSxDQUFDLFdBQVcsQ0FBQztRQUUxQyxJQUFJLFlBQVksS0FBSyxDQUFDLEVBQUU7WUFDcEIsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUVELElBQUksS0FBSyxFQUFFO1lBQ1AsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztTQUM1RDtRQUVELElBQUksWUFBWSxLQUFLLGNBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLGNBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxjQUFJLENBQUMsV0FBVyxFQUFFLGNBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNsRztLQUNKO0lBRUQsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQztBQXRCRCx3QkFzQkM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxJQUFZLEVBQUUsS0FBYTtJQUN4QyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBRXpCLFFBQVEsR0FBRyxFQUFFO1FBQ1QsS0FBSyxDQUFDO1lBQ0YsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNkLEtBQUssQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLENBQUM7UUFDYjtZQUNJLE9BQU8sR0FBRyxDQUFDO0tBQ2xCO0FBQ0wsQ0FBQyJ9