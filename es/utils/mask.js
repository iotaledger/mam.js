"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curl_1 = require("../signing/curl");
/**
 * Create the mask hash for the key.
 * @param keyTrits The key to create the mask hash for.
 * @returns The masked hash.
 */
function maskHash(keyTrits) {
    const sponge = new curl_1.Curl(81);
    sponge.absorb(keyTrits, 0, keyTrits.length);
    const finalKeyTrits = new Int8Array(curl_1.Curl.HASH_LENGTH);
    sponge.squeeze(finalKeyTrits, 0, finalKeyTrits.length);
    return finalKeyTrits;
}
exports.maskHash = maskHash;
/**
 * Apply mask to the payload.
 * @param payload The payload to apply the mask to.
 * @param sponge The sponge to use.
 * @returns The masked payload.
 */
function mask(payload, sponge) {
    const keyChunk = sponge.rate();
    const numChunks = Math.ceil(payload.length / curl_1.Curl.HASH_LENGTH);
    for (let c = 0; c < numChunks; c++) {
        const chunk = payload.slice(c * curl_1.Curl.HASH_LENGTH, (c + 1) * curl_1.Curl.HASH_LENGTH);
        sponge.absorb(chunk, 0, chunk.length);
        const state = sponge.rate();
        for (let i = 0; i < chunk.length; i++) {
            payload[(c * curl_1.Curl.HASH_LENGTH) + i] = tritSum(chunk[i], keyChunk[i]);
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
 */
function unmask(payload, sponge) {
    const unmasked = new Int8Array(payload);
    const limit = Math.ceil(unmasked.length / curl_1.Curl.HASH_LENGTH) * curl_1.Curl.HASH_LENGTH;
    let state;
    for (let c = 0; c < limit; c++) {
        const indexInChunk = c % curl_1.Curl.HASH_LENGTH;
        if (indexInChunk === 0) {
            state = sponge.rate();
        }
        if (state) {
            unmasked[c] = tritSum(unmasked[c], -state[indexInChunk]);
        }
        if (indexInChunk === curl_1.Curl.HASH_LENGTH - 1) {
            sponge.absorb(unmasked, Math.floor(c / curl_1.Curl.HASH_LENGTH) * curl_1.Curl.HASH_LENGTH, curl_1.Curl.HASH_LENGTH);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9tYXNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMENBQXVDO0FBRXZDOzs7O0dBSUc7QUFDSCxTQUFnQixRQUFRLENBQUMsUUFBbUI7SUFDeEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxXQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU1QyxNQUFNLGFBQWEsR0FBRyxJQUFJLFNBQVMsQ0FBQyxXQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV2RCxPQUFPLGFBQWEsQ0FBQztBQUN6QixDQUFDO0FBVEQsNEJBU0M7QUFFRDs7Ozs7R0FLRztBQUNILFNBQWdCLElBQUksQ0FBQyxPQUFrQixFQUFFLE1BQVk7SUFDakQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRS9CLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxXQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNoQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxXQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFdBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU5RSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckUsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQjtLQUNKO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQWpCRCxvQkFpQkM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQWdCLE1BQU0sQ0FBQyxPQUFrQixFQUFFLE1BQVk7SUFDbkQsTUFBTSxRQUFRLEdBQWMsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFbkQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLFdBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxXQUFJLENBQUMsV0FBVyxDQUFDO0lBQy9FLElBQUksS0FBSyxDQUFDO0lBQ1YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM1QixNQUFNLFlBQVksR0FBRyxDQUFDLEdBQUcsV0FBSSxDQUFDLFdBQVcsQ0FBQztRQUUxQyxJQUFJLFlBQVksS0FBSyxDQUFDLEVBQUU7WUFDcEIsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUVELElBQUksS0FBSyxFQUFFO1lBQ1AsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztTQUM1RDtRQUVELElBQUksWUFBWSxLQUFLLFdBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLFdBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxXQUFJLENBQUMsV0FBVyxFQUFFLFdBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNsRztLQUNKO0lBRUQsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQztBQXRCRCx3QkFzQkM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQVMsT0FBTyxDQUFDLElBQVksRUFBRSxLQUFhO0lBQ3hDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7SUFFekIsUUFBUSxHQUFHLEVBQUU7UUFDVCxLQUFLLENBQUM7WUFDRixPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2QsS0FBSyxDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsQ0FBQztRQUNiO1lBQ0ksT0FBTyxHQUFHLENBQUM7S0FDbEI7QUFDTCxDQUFDIn0=