"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unmask = exports.mask = exports.maskHash = void 0;
const iota2_js_1 = require("@iota/iota2.js");
/**
 * Create the mask hash for the key.
 * @param keyTrits The key to create the mask hash for.
 * @returns The masked hash.
 * @internal
 */
function maskHash(keyTrits) {
    const sponge = new iota2_js_1.Curl(81);
    sponge.absorb(keyTrits, 0, keyTrits.length);
    const finalKeyTrits = new Int8Array(iota2_js_1.Curl.HASH_LENGTH);
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
    const numChunks = Math.ceil(payload.length / iota2_js_1.Curl.HASH_LENGTH);
    for (let c = 0; c < numChunks; c++) {
        const chunk = payload.slice(c * iota2_js_1.Curl.HASH_LENGTH, (c + 1) * iota2_js_1.Curl.HASH_LENGTH);
        sponge.absorb(chunk, 0, chunk.length);
        const state = sponge.rate();
        for (let i = 0; i < chunk.length; i++) {
            payload[(c * iota2_js_1.Curl.HASH_LENGTH) + i] = tritSum(chunk[i], keyChunk[i]);
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
    const limit = Math.ceil(unmasked.length / iota2_js_1.Curl.HASH_LENGTH) * iota2_js_1.Curl.HASH_LENGTH;
    let state;
    for (let c = 0; c < limit; c++) {
        const indexInChunk = c % iota2_js_1.Curl.HASH_LENGTH;
        if (indexInChunk === 0) {
            state = sponge.rate();
        }
        if (state) {
            unmasked[c] = tritSum(unmasked[c], -state[indexInChunk]);
        }
        if (indexInChunk === iota2_js_1.Curl.HASH_LENGTH - 1) {
            sponge.absorb(unmasked, Math.floor(c / iota2_js_1.Curl.HASH_LENGTH) * iota2_js_1.Curl.HASH_LENGTH, iota2_js_1.Curl.HASH_LENGTH);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9tYXNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFzQztBQUV0Qzs7Ozs7R0FLRztBQUNILFNBQWdCLFFBQVEsQ0FBQyxRQUFtQjtJQUN4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUU1QixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTVDLE1BQU0sYUFBYSxHQUFHLElBQUksU0FBUyxDQUFDLGVBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0RCxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXZELE9BQU8sYUFBYSxDQUFDO0FBQ3pCLENBQUM7QUFURCw0QkFTQztBQUVEOzs7Ozs7R0FNRztBQUNILFNBQWdCLElBQUksQ0FBQyxPQUFrQixFQUFFLE1BQVk7SUFDakQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRS9CLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxlQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNoQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxlQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLGVBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU5RSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckUsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQjtLQUNKO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQWpCRCxvQkFpQkM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxTQUFnQixNQUFNLENBQUMsT0FBa0IsRUFBRSxNQUFZO0lBQ25ELE1BQU0sUUFBUSxHQUFjLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRW5ELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxlQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsZUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMvRSxJQUFJLEtBQUssQ0FBQztJQUNWLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDNUIsTUFBTSxZQUFZLEdBQUcsQ0FBQyxHQUFHLGVBQUksQ0FBQyxXQUFXLENBQUM7UUFFMUMsSUFBSSxZQUFZLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFFRCxJQUFJLEtBQUssRUFBRTtZQUNQLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7U0FDNUQ7UUFFRCxJQUFJLFlBQVksS0FBSyxlQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBRTtZQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxlQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsZUFBSSxDQUFDLFdBQVcsRUFBRSxlQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbEc7S0FDSjtJQUVELE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUF0QkQsd0JBc0JDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsU0FBUyxPQUFPLENBQUMsSUFBWSxFQUFFLEtBQWE7SUFDeEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUV6QixRQUFRLEdBQUcsRUFBRTtRQUNULEtBQUssQ0FBQztZQUNGLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDZCxLQUFLLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxDQUFDO1FBQ2I7WUFDSSxPQUFPLEdBQUcsQ0FBQztLQUNsQjtBQUNMLENBQUMifQ==