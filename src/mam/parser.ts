import { trits, trytes } from "@iota/converter";
import { MerkleTree } from "../merkle/merkleTree";
import { Curl } from "../signing/curl";
import { checksumSecurity, digestFromSignature, PRIVATE_KEY_FRAGMENT_LENGTH } from "../signing/iss-p27";
import { unmask } from "../utils/mask";
import { pascalDecode } from "../utils/pascal";

/**
 * Parse the trytes back to the original message.
 * @param payload The trytes to decode.
 * @param root The root for the message.
 * @param channelKey The key used to encode the data.
 * @returns The decoded message.
 */
export function parseMessage(payload: string, root: string, channelKey?: string): {
    /**
     * The next root.
     */
    nextRoot: string;
    /**
     * The decoded message.
     */
    message: string;
} {
    const payloadTrits = trits(payload);
    const rootTrits = trits(root);
    const channelKeyTrits = trits(channelKey || "9".repeat(81));

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
    const nonce = unmask(payloadTrits.slice(messageEnd, messageEnd + Curl.HASH_LENGTH / 3), sponge);
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
    if (trytes(recalculatedRoot) !== root) {
        throw new Error("Signature did not match expected root");
    }

    return {
        nextRoot: trytes(nextRoot),
        message: trytes(message)
    };
}
