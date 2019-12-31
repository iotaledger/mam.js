"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const converter_1 = require("@iota/converter");
const validators_1 = require("@iota/validators");
const merkleTree_1 = require("../merkle/merkleTree");
const hammingDiver_1 = require("../pearlDiver/hammingDiver");
const curl_1 = require("../signing/curl");
const iss_p27_1 = require("../signing/iss-p27");
const arrayHelper_1 = require("../utils/arrayHelper");
const guards_1 = require("../utils/guards");
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
    guards_1.validateModeKey(mode, sideKey);
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
    if (!channelState) {
        throw new Error("channelState must be provided");
    }
    if (channelState.start < 0) {
        throw new Error("channelState.start must be >= 0");
    }
    if (channelState.count <= 0) {
        throw new Error("channelState.count must be > 0");
    }
    if (channelState.security < 1 || channelState.security > 3) {
        throw new Error(`channelState.security must be between 1 and 3, it is ${channelState.security}`);
    }
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
    const sponge = new curl_1.Curl(27);
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
    const nonceTrits = hammingDiver.search(sponge.rate(curl_1.Curl.STATE_LENGTH), channelState.security, curl_1.Curl.HASH_LENGTH / 3, 0);
    mask_1.mask(nonceTrits, sponge);
    payload = arrayHelper_1.concatenate([payload, nonceTrits]);
    // Create the signature and add the sibling information
    const sig = iss_p27_1.signature(sponge.rate(), subtree.key);
    const subtreeTrits = arrayHelper_1.concatenate(subtree.leaves.map(l => l.addressTrits));
    const siblingsCount = subtreeTrits.length / curl_1.Curl.HASH_LENGTH;
    const encryptedSignature = mask_1.mask(arrayHelper_1.concatenate([sig, pascal_1.pascalEncode(siblingsCount), subtreeTrits]), sponge);
    // Insert the signature and pad if necessary
    payload = arrayHelper_1.concatenate([payload, encryptedSignature]);
    const nextThird = payload.length % 3;
    if (nextThird !== 0) {
        payload = arrayHelper_1.concatenate([payload, new Int8Array(3 - nextThird).fill(0)]);
    }
    const messageAddress = channelState.mode === "public" ?
        tree.root.addressTrits : mask_1.maskHash(tree.root.addressTrits);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYW0vY2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUFnRDtBQUNoRCxpREFBbUU7QUFDbkUscURBQWtEO0FBSWxELDZEQUEwRDtBQUMxRCwwQ0FBdUM7QUFDdkMsZ0RBQStDO0FBQy9DLHNEQUFtRDtBQUNuRCw0Q0FBa0Q7QUFDbEQsd0NBQStDO0FBQy9DLDRDQUErQztBQUUvQzs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsYUFBYSxDQUFDLElBQVksRUFBRSxRQUFnQixFQUFFLElBQWEsRUFBRSxPQUFnQjtJQUN6RixJQUFJLENBQUMsa0NBQXFCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1FBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztLQUN0RDtJQUNELElBQUksUUFBUSxHQUFHLENBQUMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFO1FBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDMUU7SUFDRCx3QkFBZSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUUvQixPQUFPO1FBQ0gsSUFBSTtRQUNKLElBQUk7UUFDSixPQUFPLEVBQUUsSUFBSSxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUM1RSxRQUFRO1FBQ1IsS0FBSyxFQUFFLENBQUM7UUFDUixLQUFLLEVBQUUsQ0FBQztRQUNSLFNBQVMsRUFBRSxDQUFDO1FBQ1osS0FBSyxFQUFFLENBQUM7S0FDWCxDQUFDO0FBQ04sQ0FBQztBQW5CRCxzQ0FtQkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsV0FBVyxDQUFDLFlBQThCO0lBQ3RELElBQUks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