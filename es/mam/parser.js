"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMessage = void 0;
const iota2_js_1 = require("@iota/iota2.js");
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
    const messageStart = nextRootStart + iota2_js_1.Curl.HASH_LENGTH;
    const messageEnd = messageStart + messageLength;
    // Hash the key, root and payload
    const sponge = new iota2_js_1.Curl(27);
    sponge.absorb(channelKeyTrits, 0, channelKeyTrits.length);
    sponge.absorb(rootTrits, 0, rootTrits.length);
    sponge.absorb(payloadTrits, 0, nextRootStart);
    // Decrypt the metadata
    const nextRoot = mask_1.unmask(payloadTrits.slice(nextRootStart, nextRootStart + iota2_js_1.Curl.HASH_LENGTH), sponge);
    const message = mask_1.unmask(payloadTrits.slice(messageStart, messageStart + messageLength), sponge);
    const nonce = mask_1.unmask(payloadTrits.slice(messageEnd, messageEnd + (iota2_js_1.Curl.HASH_LENGTH / 3)), sponge);
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
        const siblings = decryptedMetadata.slice(siblingsStart, siblingsStart + (siblingsCount * iota2_js_1.Curl.HASH_LENGTH));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXNDO0FBQ3RDLHFEQUFrRDtBQUNsRCxnREFBd0c7QUFDeEcsd0NBQXVDO0FBQ3ZDLDRDQUErQztBQUMvQyx3REFBcUQ7QUFFckQ7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsWUFBWSxDQUFDLE9BQWUsRUFBRSxJQUFZLEVBQUUsVUFBbUI7SUFVM0UsTUFBTSxZQUFZLEdBQUcsMkJBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkQsTUFBTSxTQUFTLEdBQUcsMkJBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsTUFBTSxlQUFlLEdBQUcsMkJBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxhQUFWLFVBQVUsY0FBVixVQUFVLEdBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRTNFLGdDQUFnQztJQUNoQyxNQUFNLFNBQVMsR0FBRyxxQkFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzdDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7SUFDOUIsTUFBTSxXQUFXLEdBQUcscUJBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFDeEMsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDO0lBQ3RELE1BQU0sWUFBWSxHQUFHLGFBQWEsR0FBRyxlQUFJLENBQUMsV0FBVyxDQUFDO0lBQ3RELE1BQU0sVUFBVSxHQUFHLFlBQVksR0FBRyxhQUFhLENBQUM7SUFFaEQsaUNBQWlDO0lBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUksZUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUMsRUFBRSxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFFOUMsdUJBQXVCO0lBQ3ZCLE1BQU0sUUFBUSxHQUFHLGFBQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxhQUFhLEdBQUcsZUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3JHLE1BQU0sT0FBTyxHQUFHLGFBQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxZQUFZLEdBQUcsYUFBYSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDL0YsTUFBTSxLQUFLLEdBQUcsYUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLFVBQVUsR0FBRyxDQUFDLGVBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNsRyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFM0Isb0NBQW9DO0lBQ3BDLE1BQU0sYUFBYSxHQUFHLDBCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLElBQUksYUFBYSxLQUFLLENBQUMsRUFBRTtRQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLCtFQUErRSxDQUFDLENBQUM7S0FDcEc7SUFFRCxrQ0FBa0M7SUFDbEMsTUFBTSxpQkFBaUIsR0FBRyxhQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hGLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUVmLDBDQUEwQztJQUMxQyxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLGFBQWEsR0FBRyxxQ0FBMkIsQ0FBQyxDQUFDO0lBQzFGLE1BQU0sTUFBTSxHQUFHLDZCQUFtQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNwRCxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXhDLDhDQUE4QztJQUM5QyxNQUFNLGlCQUFpQixHQUFHLHFCQUFZLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxxQ0FBMkIsQ0FBQyxDQUFDLENBQUM7SUFDN0csTUFBTSxhQUFhLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDO0lBQzlDLElBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JDLElBQUksYUFBYSxLQUFLLENBQUMsRUFBRTtRQUNyQixNQUFNLGFBQWEsR0FBRyxDQUFDLGFBQWEsR0FBRyxxQ0FBMkIsQ0FBQyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQztRQUM1RixNQUFNLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLGFBQWEsR0FBRyxDQUFDLGFBQWEsR0FBRyxlQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUU1RyxnQkFBZ0IsR0FBRyx1QkFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDekU7SUFFRCxnREFBZ0Q7SUFDaEQsSUFBSSwyQkFBWSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNuRCxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7S0FDNUQ7SUFFRCxPQUFPO1FBQ0gsUUFBUSxFQUFFLDJCQUFZLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUMxQyxPQUFPLEVBQUUsMkJBQVksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO0tBQzNDLENBQUM7QUFDTixDQUFDO0FBdEVELG9DQXNFQyJ9