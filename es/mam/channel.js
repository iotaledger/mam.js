"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const converter_1 = require("@iota/converter");
const curl_1 = __importDefault(require("@iota/curl"));
const validators_1 = require("@iota/validators");
const merkleTree_1 = require("../merkle/merkleTree");
const hammingDiver_1 = require("../pearlDiver/hammingDiver");
const iss_p27_1 = require("../signing/iss-p27");
const arrayHelper_1 = require("../utils/arrayHelper");
const curlHelper_1 = require("../utils/curlHelper");
const mask_1 = require("../utils/mask");
const pascal_1 = require("../utils/pascal");
/**
 * Create a new channel object.
 * @param seed The seed for the channel.
 * @param security The security level for the channel.
 * @param mode The mode for the channel.
 * @param sideKey The side key to use for restricted mode.
 * @returns The new channel state.
 */
function createChannel(seed, security, mode, sideKey) {
    if (!validators_1.isTrytesOfExactLength(seed, 81)) {
        throw new Error(`The seed must be 81 trytes long`);
    }
    if (security < 1 || security > 3) {
        throw new Error(`Security must be between 1 and 3, it is ${security}`);
    }
    if (mode !== "public" && mode !== "private" && mode !== "restricted") {
        throw new Error(`The mode must be public, private or restricted, it is '${mode}'`);
    }
    if (mode === "restricted") {
        if (!sideKey) {
            throw new Error(`You must provide a sideKey for restricted mode`);
        }
        if (!validators_1.isTrytes(sideKey)) {
            throw new Error(`The sideKey must be in trytes`);
        }
        if (sideKey.length > 81) {
            throw new Error(`The sideKey must be maximum length 81 trytes`);
        }
    }
    if (mode !== "restricted" && sideKey) {
        throw new Error(`Sidekey is only used in restricted mode`);
    }
    return {
        seed,
        mode,
        sideKey: mode === "restricted" ? (sideKey || "").padEnd(81, "9") : undefined,
        security,
        start: 0,
        count: 1,
        nextCount: 1,
        index: 0
    };
}
exports.createChannel = createChannel;
/**
 * Get the root of the channel.
 * @param channelState The channel state to get the root.
 * @returns The root.
 */
function channelRoot(channelState) {
    const tree = new merkleTree_1.MerkleTree(channelState.seed, channelState.start, channelState.count, channelState.security);
    return converter_1.trytes(tree.root.addressTrits);
}
exports.channelRoot = channelRoot;
/**
 * Prepare a message on the mam channel.
 * @param channelState The channel to prepare the message for.
 * @param message The trytes to include in the message.
 * @returns The prepared message, the channel state will also be updated.
 */
function createMessage(channelState, message) {
    if (!validators_1.isTrytes(message)) {
        throw new Error(`The message must be in trytes`);
    }
    const tree = new merkleTree_1.MerkleTree(channelState.seed, channelState.start, channelState.count, channelState.security);
    const nextRootTree = new merkleTree_1.MerkleTree(channelState.seed, channelState.start + channelState.count, channelState.nextCount, channelState.security);
    const nextRootTrits = nextRootTree.root.addressTrits;
    const messageTrits = converter_1.trits(message);
    const indexTrits = pascal_1.pascalEncode(channelState.index);
    const messageLengthTrits = pascal_1.pascalEncode(messageTrits.length);
    const subtree = tree.getSubtree(channelState.index);
    const sponge = new curl_1.default(27);
    sponge.reset();
    const sideKeyTrits = converter_1.trits(channelState.sideKey || "9".repeat(81));
    sponge.absorb(sideKeyTrits, 0, sideKeyTrits.length);
    sponge.absorb(tree.root.addressTrits, 0, tree.root.addressTrits.length);
    let payload = arrayHelper_1.concatenate([indexTrits, messageLengthTrits]);
    sponge.absorb(payload, 0, payload.length);
    // Encrypt the next root along with the message
    const maskedNextRoot = mask_1.mask(arrayHelper_1.concatenate([nextRootTrits, messageTrits]), sponge);
    payload = arrayHelper_1.concatenate([payload, maskedNextRoot]);
    // Calculate the nonce for the message so far
    const hammingDiver = new hammingDiver_1.HammingDiver();
    const nonceTrits = hammingDiver.search(curlHelper_1.curlRate(sponge, curlHelper_1.STATE_LENGTH), channelState.security, curl_1.default.HASH_LENGTH / 3, 0);
    mask_1.mask(nonceTrits, sponge);
    payload = arrayHelper_1.concatenate([payload, nonceTrits]);
    // Create the signature and add the sibling information
    const sig = iss_p27_1.signature(curlHelper_1.curlRate(sponge), subtree.key);
    const subtreeTrits = arrayHelper_1.concatenate(subtree.leaves.map(l => l.addressTrits));
    const siblingsCount = subtreeTrits.length / curl_1.default.HASH_LENGTH;
    const encryptedSignature = mask_1.mask(arrayHelper_1.concatenate([sig, pascal_1.pascalEncode(siblingsCount), subtreeTrits]), sponge);
    // Insert the signature and pad if necessary
    payload = arrayHelper_1.concatenate([payload, encryptedSignature]);
    const nextThird = payload.length % 3;
    if (nextThird !== 0) {
        payload = arrayHelper_1.concatenate([payload, new Int8Array(3 - nextThird).fill(0)]);
    }
    sponge.reset();
    let messageAddress = tree.root.addressTrits;
    if (channelState.mode !== "public") {
        messageAddress = mask_1.maskHash(tree.root.addressTrits);
    }
    const maskedAuthenticatedMessage = {
        payload: converter_1.trytes(payload),
        root: converter_1.trytes(tree.root.addressTrits),
        address: converter_1.trytes(messageAddress)
    };
    if (channelState.index === channelState.count - 1) {
        channelState.start = channelState.nextCount + channelState.start;
        channelState.index = 0;
    }
    else {
        channelState.index++;
    }
    channelState.nextRoot = converter_1.trytes(nextRootTrits);
    return maskedAuthenticatedMessage;
}
exports.createMessage = createMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYW0vY2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtDQUFnRDtBQUNoRCxzREFBOEI7QUFDOUIsaURBQW1FO0FBQ25FLHFEQUFrRDtBQUlsRCw2REFBMEQ7QUFDMUQsZ0RBQStDO0FBQy9DLHNEQUFtRDtBQUNuRCxvREFBNkQ7QUFDN0Qsd0NBQStDO0FBQy9DLDRDQUErQztBQUUvQzs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsYUFBYSxDQUFDLElBQVksRUFBRSxRQUFnQixFQUFFLElBQWEsRUFBRSxPQUFnQjtJQUN6RixJQUFJLENBQUMsa0NBQXFCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1FBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztLQUN0RDtJQUNELElBQUksUUFBUSxHQUFHLENBQUMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFO1FBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDMUU7SUFDRCxJQUFJLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxLQUFLLFNBQVMsSUFBSSxJQUFJLEtBQUssWUFBWSxFQUFFO1FBQ2xFLE1BQU0sSUFBSSxLQUFLLENBQUMsMERBQTBELElBQUksR0FBRyxDQUFDLENBQUM7S0FDdEY7SUFDRCxJQUFJLElBQUksS0FBSyxZQUFZLEVBQUU7UUFDdkIsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztTQUNyRTtRQUNELElBQUksQ0FBQyxxQkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUU7WUFDckIs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