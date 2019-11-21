"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const curl_1 = __importDefault(require("@iota/curl"));
const arrayHelper_1 = require("./arrayHelper");
const curlHelper_1 = require("./curlHelper");
/**
 * Create the mask hash for the key and salt it if provided.
 * @param keyTrits The key to create the mask hash for.
 * @returns The mask hash.
 */
function maskHash(keyTrits) {
    const sponge = new curl_1.default(81);
    sponge.reset();
    sponge.absorb(keyTrits, 0, keyTrits.length);
    const finalKeyTrits = new Int8Array(curl_1.default.HASH_LENGTH);
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
    const keyChunk = curlHelper_1.curlRate(sponge);
    const numChunks = Math.ceil(payload.length / curl_1.default.HASH_LENGTH);
    for (let c = 0; c < numChunks; c++) {
        const chunk = payload.slice(c * curl_1.default.HASH_LENGTH, (c + 1) * curl_1.default.HASH_LENGTH);
        sponge.absorb(chunk, 0, chunk.length);
        const state = curlHelper_1.curlRate(sponge);
        for (let i = 0; i < chunk.length; i++) {
            payload[(c * curl_1.default.HASH_LENGTH) + i] = tritSum(chunk[i], keyChunk[i]);
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
    const unmasked = [];
    const numChunks = Math.ceil(payload.length / curl_1.default.HASH_LENGTH);
    for (let c = 0; c < numChunks; c++) {
        const chunk = payload.slice(c * curl_1.default.HASH_LENGTH, (c + 1) * curl_1.default.HASH_LENGTH);
        const state = curlHelper_1.curlRate(sponge);
        for (let i = 0; i < chunk.length; i++) {
            chunk[i] = tritSum(chunk[i], -state[i]);
        }
        unmasked.push(chunk);
        sponge.absorb(chunk, 0, chunk.length);
    }
    return arrayHelper_1.concatenate(unmasked);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9tYXNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esc0RBQThCO0FBQzlCLCtDQUE0QztBQUM1Qyw2Q0FBd0M7QUFFeEM7Ozs7R0FJRztBQUNILFNBQWdCLFFBQVEsQ0FBQyxRQUFtQjtJQUN4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUU1QixNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTVDLE1BQU0sYUFBYSxHQUFHLElBQUksU0FBUyxDQUFDLGNBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0RCxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXZELE9BQU8sYUFBYSxDQUFDO0FBQ3pCLENBQUM7QUFWRCw0QkFVQztBQUVEOzs7OztHQUtHO0FBQ0gsU0FBZ0IsSUFBSSxDQUFDLE9BQWtCLEVBQUUsTUFBWTtJQUNqRCxNQUFNLFFBQVEsR0FBRyxxQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRWxDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxjQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNoQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxjQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLGNBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU5RSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRDLE1BQU0sS0FBSyxHQUFHLHFCQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLGNBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUI7S0FDSjtJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFqQkQsb0JBaUJDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFnQixNQUFNLENBQUMsT0FBa0IsRUFBRSxNQUFZO0lBQ25ELE1BQU0sUUFBUSxHQUFnQixFQUFFLENBQUM7SUFFakMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLGNBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2hDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLGNBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsY0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTlFLE1BQU0sS0FBSyxHQUFHLHFCQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzQztRQUVELFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN6QztJQUVELE9BQU8seUJBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBbEJELHdCQWtCQztBQUVEOzs7OztHQUtHO0FBQ0gsU0FBUyxPQUFPLENBQUMsSUFBWSxFQUFFLEtBQWE7SUFDeEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUV6QixRQUFRLEdBQUcsRUFBRTtRQUNULEtBQUssQ0FBQztZQUNGLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDZCxLQUFLLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxDQUFDO1FBQ2I7WUFDSSxPQUFPLEdBQUcsQ0FBQztLQUNsQjtBQUNMLENBQUMifQ==