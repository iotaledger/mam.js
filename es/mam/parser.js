// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Curl } from "@iota/crypto.js";
import { MerkleTree } from "../merkle/merkleTree";
import { checksumSecurity, digestFromSignature, PRIVATE_KEY_FRAGMENT_LENGTH } from "../signing/iss-p27";
import { unmask } from "../utils/mask";
import { pascalDecode } from "../utils/pascal";
import { TrytesHelper } from "../utils/trytesHelper";
/**
 * Parse the trytes back to the original message.
 * @param payload The trytes to decode.
 * @param root The root for the message.
 * @param channelKey The key used to encode the data.
 * @returns The decoded message.
 */
export function parseMessage(payload, root, channelKey) {
    const payloadTrits = TrytesHelper.toTrits(payload);
    const rootTrits = TrytesHelper.toTrits(root);
    const channelKeyTrits = TrytesHelper.toTrits(channelKey !== null && channelKey !== void 0 ? channelKey : "9".repeat(81));
    // Get data positions in payload
    const indexData = pascalDecode(payloadTrits);
    const index = indexData.value;
    const messageData = pascalDecode(payloadTrits.slice(indexData.end));
    const messageLength = messageData.value;
    const nextRootStart = indexData.end + messageData.end;
    const messageStart = nextRootStart + Curl.HASH_LENGTH;
    const messageEnd = messageStart + messageLength;
    // Hash the key, root and payload
    const sponge = new Curl(27);
    sponge.absorb(channelKeyTrits, 0, channelKeyTrits.length);
    sponge.absorb(rootTrits, 0, rootTrits.length);
    sponge.absorb(payloadTrits, 0, nextRootStart);
    // Decrypt the metadata
    const nextRoot = unmask(payloadTrits.slice(nextRootStart, nextRootStart + Curl.HASH_LENGTH), sponge);
    const message = unmask(payloadTrits.slice(messageStart, messageStart + messageLength), sponge);
    const nonce = unmask(payloadTrits.slice(messageEnd, messageEnd + (Curl.HASH_LENGTH / 3)), sponge);
    const hmac = sponge.rate();
    // Check the security level is valid
    const securityLevel = checksumSecurity(hmac);
    if (securityLevel === 0) {
        throw new Error("Message Hash did not have a hamming weight of zero, security level is invalid");
    }
    // Decrypt the rest of the payload
    const decryptedMetadata = unmask(payloadTrits.slice(messageEnd + nonce.length), sponge);
    sponge.reset();
    // Get the signature and absorb its digest
    const signature = decryptedMetadata.slice(0, securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH);
    const digest = digestFromSignature(hmac, signature);
    sponge.absorb(digest, 0, digest.length);
    // Get the sibling information and validate it
    const siblingsCountData = pascalDecode(decryptedMetadata.slice(securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH));
    const siblingsCount = siblingsCountData.value;
    let recalculatedRoot = sponge.rate();
    if (siblingsCount !== 0) {
        const siblingsStart = (securityLevel * PRIVATE_KEY_FRAGMENT_LENGTH) + siblingsCountData.end;
        const siblings = decryptedMetadata.slice(siblingsStart, siblingsStart + (siblingsCount * Curl.HASH_LENGTH));
        recalculatedRoot = MerkleTree.root(recalculatedRoot, siblings, index);
    }
    // Make sure the root matches the calculated one
    if (TrytesHelper.fromTrits(recalculatedRoot) !== root) {
        throw new Error("Signature did not match expected root");
    }
    return {
        nextRoot: TrytesHelper.fromTrits(nextRoot),
        message: TrytesHelper.fromTrits(message)
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3hHLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVyRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsWUFBWSxDQUFDLE9BQWUsRUFBRSxJQUFZLEVBQUUsVUFBbUI7SUFVM0UsTUFBTSxZQUFZLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLE1BQU0sZUFBZSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxhQUFWLFVBQVUsY0FBVixVQUFVLEdBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRTNFLGdDQUFnQztJQUNoQyxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDN0MsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztJQUM5QixNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwRSxNQUFNLGFB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