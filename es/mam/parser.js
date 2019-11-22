"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const converter_1 = require("@iota/converter");
const curl_1 = __importDefault(require("@iota/curl"));
const merkleTree_1 = require("../merkle/merkleTree");
const iss_p27_1 = require("../signing/iss-p27");
const curlHelper_1 = require("../utils/curlHelper");
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
    const messageStart = nextRootStart + curl_1.default.HASH_LENGTH;
    const messageEnd = messageStart + messageLength;
    const sponge = new curl_1.default(27);
    // Hash the key, root and payload
    sponge.reset();
    sponge.absorb(channelKeyTrits, 0, channelKeyTrits.length);
    sponge.absorb(rootTrits, 0, rootTrits.length);
    sponge.absorb(payloadTrits, 0, nextRootStart);
    // Decrypt the metadata
    const nextRoot = mask_1.unmask(payloadTrits.slice(nextRootStart, nextRootStart + curl_1.default.HASH_LENGTH), sponge);
    const message = mask_1.unmask(payloadTrits.slice(messageStart, messageStart + messageLength), sponge);
    const nonce = mask_1.unmask(payloadTrits.slice(messageEnd, messageEnd + curl_1.default.HASH_LENGTH / 3), sponge);
    const hmac = curlHelper_1.curlRate(sponge);
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
    let recalculatedRoot = curlHelper_1.curlRate(sponge);
    if (siblingsCount !== 0) {
        const siblingsStart = (securityLevel * iss_p27_1.PRIVATE_KEY_FRAGMENT_LENGTH) + siblingsCountData.end;
        const siblings = decryptedMetadata.slice(siblingsStart, siblingsStart + (siblingsCount * curl_1.default.HASH_LENGTH));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrQ0FBZ0Q7QUFDaEQsc0RBQThCO0FBQzlCLHFEQUFrRDtBQUNsRCxnREFBd0c7QUFDeEcsb0RBQStDO0FBQy9DLHdDQUF1QztBQUN2Qyw0Q0FBK0M7QUFFL0M7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsWUFBWSxDQUFDLE9BQWUsRUFBRSxJQUFZLEVBQUUsVUFBbUI7SUFVM0UsTUFBTSxZQUFZLEdBQUcsaUJBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwQyxNQUFNLFNBQVMsR0FBRyxpQkFBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLE1BQU0sZUFBZSxHQUFHLGlCQUFLLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUU1RCxnQ0FBZ0M7SUFDaEMsTUFBTSxTQUFTLEdBQUcscUJBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3QyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO0lBQzlCLE1BQU0sV0FBVyxHQUFHLHFCQUFZLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwRSxNQUFNLGFBQWEsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO0lBQ3hDLE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQztJQUN0RCxNQUFNLFlBQVksR0FBRyxhQUFhLEdBQUcsY0FBSSxDQUFDLFdBQVcsQ0FBQztJQUN0RCxNQUFNLFVBQVUsR0FBRyxZQUFZLEdBQUcsYUFBYSxDQUFDO0lBRWhELE1BQU0sTUFBTSxHQUFHLElBQUksY0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTVCLGlDQUFpQztJQUNqQyxNQUFNLENBQUMs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