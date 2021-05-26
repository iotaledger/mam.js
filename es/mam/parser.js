"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMessage = void 0;
// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const iota_js_1 = require("@iota/iota.js");
const merkleTree_1 = require("../merkle/merkleTree");
const iss_p27_1 = require("../signing/iss-p27");
const mask_1 = require("../utils/mask");
const pascal_1 = require("../utils/pascal");
const trytesHelper_1 = require("../utils/trytesHelper");
/**
 * Parse the trytes back to the original message.
 * @param payload The trytes to decode.
 * @param root The root for the message.
 * @param channelKey The key used to encode the data.
 * @returns The decoded message.
 */
function parseMessage(payload, root, channelKey) {
    const payloadTrits = trytesHelper_1.TrytesHelper.toTrits(payload);
    const rootTrits = trytesHelper_1.TrytesHelper.toTrits(root);
    const channelKeyTrits = trytesHelper_1.TrytesHelper.toTrits(channelKey !== null && channelKey !== void 0 ? channelKey : "9".repeat(81));
    // Get data positions in payload
    const indexData = pascal_1.pascalDecode(payloadTrits);
    const index = indexData.value;
    const messageData = pascal_1.pascalDecode(payloadTrits.slice(indexData.end));
    const messageLength = messageData.value;
    const nextRootStart = indexData.end + messageData.end;
    const messageStart = nextRootStart + iota_js_1.Curl.HASH_LENGTH;
    const messageEnd = messageStart + messageLength;
    // Hash the key, root and payload
    const sponge = new iota_js_1.Curl(27);
    sponge.absorb(channelKeyTrits, 0, channelKeyTrits.length);
    sponge.absorb(rootTrits, 0, rootTrits.length);
    sponge.absorb(payloadTrits, 0, nextRootStart);
    // Decrypt the metadata
    const nextRoot = mask_1.unmask(payloadTrits.slice(nextRootStart, nextRootStart + iota_js_1.Curl.HASH_LENGTH), sponge);
    const message = mask_1.unmask(payloadTrits.slice(messageStart, messageStart + messageLength), sponge);
    const nonce = mask_1.unmask(payloadTrits.slice(messageEnd, messageEnd + (iota_js_1.Curl.HASH_LENGTH / 3)), sponge);
    const hmac = sponge.rate();
    // Check the security level is valid
    const securityLevel = iss_p27_1.checksumSecurity(hmac);
    if (securityLevel === 0) {
        throw new Error("Message Hash did not have a hamming weight of zero, security level is invalid");
    }
    // Decrypt the rest of the payload
    const decryptedMetadata = mask_1.unmask(payloadTrits.slice(messageEnd + nonce.length), sponge);
    sponge.reset();
    // Get the signature and absorb its digest
    const signature = decryptedMetadata.slice(0, securityLevel * iss_p27_1.PRIVATE_KEY_FRAGMENT_LENGTH);
    const digest = iss_p27_1.digestFromSignature(hmac, signature);
    sponge.absorb(digest, 0, digest.length);
    // Get the sibling information and validate it
    const siblingsCountData = pascal_1.pascalDecode(decryptedMetadata.slice(securityLevel * iss_p27_1.PRIVATE_KEY_FRAGMENT_LENGTH));
    const siblingsCount = siblingsCountData.value;
    let recalculatedRoot = sponge.rate();
    if (siblingsCount !== 0) {
        const siblingsStart = (securityLevel * iss_p27_1.PRIVATE_KEY_FRAGMENT_LENGTH) + siblingsCountData.end;
        const siblings = decryptedMetadata.slice(siblingsStart, siblingsStart + (siblingsCount * iota_js_1.Curl.HASH_LENGTH));
        recalculatedRoot = merkleTree_1.MerkleTree.root(recalculatedRoot, siblings, index);
    }
    // Make sure the root matches the calculated one
    if (trytesHelper_1.TrytesHelper.fromTrits(recalculatedRoot) !== root) {
        throw new Error("Signature did not match expected root");
    }
    return {
        nextRoot: trytesHelper_1.TrytesHelper.fromTrits(nextRoot),
        message: trytesHelper_1.TrytesHelper.fromTrits(message)
    };
}
exports.parseMessage = parseMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QywyQ0FBcUM7QUFDckMscURBQWtEO0FBQ2xELGdEQUF3RztBQUN4Ryx3Q0FBdUM7QUFDdkMsNENBQStDO0FBQy9DLHdEQUFxRDtBQUVyRDs7Ozs7O0dBTUc7QUFDSCxTQUFnQixZQUFZLENBQUMsT0FBZSxFQUFFLElBQVksRUFBRSxVQUFtQjtJQVUzRSxNQUFNLFlBQVksR0FBRywyQkFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxNQUFNLFNBQVMsR0FBRywyQkFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxNQUFNLGVBQWUsR0FBRywyQkFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLGFBQVYsVUFBVSxjQUFWLFVBQVUsR0FBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFM0UsZ0NBQWdDO0lBQ2hDLE1BQU0sU0FBUyxHQUFHLHFCQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDN0MsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztJQUM5QixNQUFNLFdBQVcsR0FBRyxxQkFBWSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEUsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztJQUN4QyxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUM7SUFDdEQsTUFBTSxZQUFZLEdBQUcsYUFBYSxHQUFHLGNBQUksQ0FBQyxXQUFXLENBQUM7SUFDdEQsTUFBTSxVQUFVLEdBQUcsWUFBWSxHQUFHLGFBQWEsQ0FBQztJQUVoRCxpQ0FBaUM7SUFDakMsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUU5Qyx1QkFBdUI7SUFDdkIsTUFBTSxRQUFRLEdBQUcsYUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLGFBQWEsR0FBRyxjQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckcsTUFBTSxPQUFPLEdBQUcsYUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFlBQVksR0FBRyxhQUFhLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvRixNQUFNLEtBQUssR0FBRyxhQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsVUFBVSxHQUFHLENBQUMsY0FBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2xHLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUUzQixvQ0FBb0M7SUFDcEMsTUFBTSxhQUFhLEdBQUcsMEJBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsSUFBSSxhQUFhLEtBQUssQ0FBQyxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0VBQStFLENBQUMsQ0FBQztLQUNwRztJQUVELGtDQUFrQztJQUNsQyxNQUFNLGlCQUFpQixHQUFHLGFBQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEYsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRWYsMENBQTBDO0lBQzFDLE1BQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsYUFBYSxHQUFHLHFDQUEyQixDQUFDLENBQUM7SUFDMUYsTUFBTSxNQUFNLEdBQUcsNkJBQW1CLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFeEMsOENBQThDO0lBQzlDLE1BQU0saUJBQWlCLEdBQUcscUJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLHFDQUEyQixDQUFDLENBQUMsQ0FBQztJQUM3RyxNQUFNLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7SUFDOUMsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckMsSUFBSSxhQUFhLEtBQUssQ0FBQyxFQUFFO1FBQ3JCLE1BQU0sYUFBYSxHQUFHLENBQUMsYUFBYSxHQUFHLHFDQUEyQixDQUFDLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDO1FBQzVGLE1BQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsYUFBYSxHQUFHLENBQUMsYUFBYSxHQUFHLGNBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBRTVHLGdCQUFnQixHQUFHLHVCQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUN6RTtJQUVELGdEQUFnRDtJQUNoRCxJQUFJLDJCQUFZLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ25ELE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztLQUM1RDtJQUVELE9BQU87UUFDSCxRQUFRLEVBQUUsMkJBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQzFDLE9BQU8sRUFBRSwyQkFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7S0FDM0MsQ0FBQztBQUNOLENBQUM7QUF0RUQsb0NBc0VDIn0=