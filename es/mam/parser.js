"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBZ0Q7QUFDaEQscURBQWtEO0FBQ2xELDBDQUF1QztBQUN2QyxnREFBd0c7QUFDeEcsd0NBQXVDO0FBQ3ZDLDRDQUErQztBQUUvQzs7Ozs7O0dBTUc7QUFDSCxTQUFnQixZQUFZLENBQUMsT0FBZSxFQUFFLElBQVksRUFBRSxVQUFtQjtJQVUzRSxNQUFNLFlBQVksR0FBRyxpQkFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sU0FBUyxHQUFHLGlCQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsTUFBTSxlQUFlLEdBQUcsaUJBQUssQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRTVELGdDQUFnQztJQUNoQyxNQUFNLFNBQVMsR0FBRyxxQkFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzdDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7SUFDOUIsTUFBTSxXQUFXLEdBQUcscUJBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFDeEMsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDO0lBQ3RELE1BQU0sWUFBWSxHQUFHLGFBQWEsR0FBRyxXQUFJLENBQUMsV0FBVyxDQUFDO0lBQ3RELE1BQU0sVUFBVSxHQUFHLFlBQVksR0FBRyxhQUFhLENBQUM7SUFFaEQsaUNBQWlDO0lBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUksV0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxF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