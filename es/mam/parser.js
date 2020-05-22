"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMessage = void 0;
const converter_1 = require("@iota/converter");
const merkleTree_1 = require("../merkle/merkleTree");
const curl_1 = require("../signing/curl");
const iss_p27_1 = require("../signing/iss-p27");
const mask_1 = require("../utils/mask");
const pascal_1 = require("../utils/pascal");
/**
 * Parse the trytes back to the original message.
 * @param payload The trytes to decode.
 * @param root The root for the message.
 * @param channelKey The key used to encode the data.
 * @returns The decoded message.
 */
function parseMessage(payload, root, channelKey) {
    const payloadTrits = converter_1.trits(payload);
    const rootTrits = converter_1.trits(root);
    const channelKeyTrits = converter_1.trits(channelKey || "9".repeat(81));
    // Get data positions in payload
    const indexData = pascal_1.pascalDecode(payloadTrits);
    const index = indexData.value;
    const messageData = pascal_1.pascalDecode(payloadTrits.slice(indexData.end));
    const messageLength = messageData.value;
    const nextRootStart = indexData.end + messageData.end;
    const messageStart = nextRootStart + curl_1.Curl.HASH_LENGTH;
    const messageEnd = messageStart + messageLength;
    // Hash the key, root and payload
    const sponge = new curl_1.Curl(27);
    sponge.absorb(channelKeyTrits, 0, channelKeyTrits.length);
    sponge.absorb(rootTrits, 0, rootTrits.length);
    sponge.absorb(payloadTrits, 0, nextRootStart);
    // Decrypt the metadata
    const nextRoot = mask_1.unmask(payloadTrits.slice(nextRootStart, nextRootStart + curl_1.Curl.HASH_LENGTH), sponge);
    const message = mask_1.unmask(payloadTrits.slice(messageStart, messageStart + messageLength), sponge);
    const nonce = mask_1.unmask(payloadTrits.slice(messageEnd, messageEnd + curl_1.Curl.HASH_LENGTH / 3), sponge);
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
        const siblings = decryptedMetadata.slice(siblingsStart, siblingsStart + (siblingsCount * curl_1.Curl.HASH_LENGTH));
        recalculatedRoot = merkleTree_1.MerkleTree.root(recalculatedRoot, siblings, index);
    }
    // Make sure the root matches the calculated one
    if (converter_1.trytes(recalculatedRoot) !== root) {
        throw new Error("Signature did not match expected root");
    }
    return {
        nextRoot: converter_1.trytes(nextRoot),
        message: converter_1.trytes(message)
    };
}
exports.parseMessage = parseMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0NBQWdEO0FBQ2hELHFEQUFrRDtBQUNsRCwwQ0FBdUM7QUFDdkMsZ0RBQXdHO0FBQ3hHLHdDQUF1QztBQUN2Qyw0Q0FBK0M7QUFFL0M7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsWUFBWSxDQUFDLE9BQWUsRUFBRSxJQUFZLEVBQUUsVUFBbUI7SUFVM0UsTUFBTSxZQUFZLEdBQUcsaUJBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwQyxNQUFNLFNBQVMsR0FBRyxpQkFBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLE1BQU0sZUFBZSxHQUFHLGlCQUFLLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUU1RCxnQ0FBZ0M7SUFDaEMsTUFBTSxTQUFTLEdBQUcscUJBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3QyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO0lBQzlCLE1BQU0sV0FBVyxHQUFHLHFCQUFZLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwRSxNQUFNLGFBQWEsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO0lBQ3hDLE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQztJQUN0RCxNQUFNLFlBQVksR0FBRyxhQUFhLEdBQUcsV0FBSSxDQUFDLFdBQVcsQ0FBQztJQUN0RCxNQUFNLFVBQVUsR0FBRyxZQUFZLEdBQUcsYUFBYSxDQUFDO0lBRWhELGlDQUFpQztJQUNqQyxNQUFNLE1BQU0sR0FBRyxJQUFJLFdBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QixNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUs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