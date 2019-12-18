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
    const sponge = new curl_1.default(27);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYW0vY2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtDQUFnRDtBQUNoRCxzREFBOEI7QUFDOUIsaURBQW1FO0FBQ25FLHFEQUFrRDtBQUlsRCw2REFBMEQ7QUFDMUQsZ0RBQStDO0FBQy9DLHNEQUFtRDtBQUNuRCxvREFBNkQ7QUFDN0QsNENBQWtEO0FBQ2xELHdDQUErQztBQUMvQyw0Q0FBK0M7QUFFL0M7Ozs7Ozs7R0FPRztBQUNILFNBQWdCLGFBQWEsQ0FBQyxJQUFZLEVBQUUsUUFBZ0IsRUFBRSxJQUFhLEVBQUUsT0FBZ0I7SUFDekYsSUFBSSxDQUFDLGtDQUFxQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7S0FDdEQ7SUFDRCxJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTtRQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0tBQzFFO0lBQ0Qsd0JBQWUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFL0IsT0FBTztRQUNILElBQUk7UUFDSixJQUFJO1FBQ0osT0FBTyxFQUFFLElBQUksS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFDNUUsUUFBUTtRQUNSLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxFQUFFLENBQUM7UUFDUixTQUFTLEVBQUUsQ0FBQztRQUNaLEtBQUssRUFBRSxDQUFDO0tBQ1gsQ0FBQztBQUNOLENBQUM7QUFuQkQsc0NBbUJDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLFdBQVcsQ0FBQyxZ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