// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Curl } from "@iota/crypto.js";
import { MerkleTree } from "../merkle/merkleTree";
import { HammingDiver } from "../pearlDiver/hammingDiver";
import { signature } from "../signing/iss-p27";
import { concatenate } from "../utils/arrayHelper";
import { validateModeKey } from "../utils/guards";
import { mask, maskHash } from "../utils/mask";
import { pascalEncode } from "../utils/pascal";
import { TrytesHelper } from "../utils/trytesHelper";
/**
 * Create a new channel object.
 * @param seed The seed for the channel.
 * @param security The security level for the channel.
 * @param mode The mode for the channel.
 * @param sideKey The side key to use for restricted mode.
 * @returns The new channel state.
 */
export function createChannel(seed, security, mode, sideKey) {
    if (!TrytesHelper.isHash(seed)) {
        throw new Error("The seed must be 81 trytes long");
    }
    if (security < 1 || security > 3) {
        throw new Error(`Security must be between 1 and 3, it is ${security}`);
    }
    validateModeKey(mode, sideKey);
    return {
        seed,
        mode,
        sideKey: mode === "restricted" ? (sideKey !== null && sideKey !== void 0 ? sideKey : "").padEnd(81, "9") : undefined,
        security,
        start: 0,
        count: 1,
        nextCount: 1,
        index: 0
    };
}
/**
 * Get the root of the channel.
 * @param channelState The channel state to get the root.
 * @returns The root.
 */
export function channelRoot(channelState) {
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
    const tree = new MerkleTree(channelState.seed, channelState.start, channelState.count, channelState.security);
    return TrytesHelper.fromTrits(tree.root.addressTrits);
}
/**
 * Prepare a message on the mam channel.
 * @param channelState The channel to prepare the message for.
 * @param message The trytes to include in the message.
 * @returns The prepared message, the channel state will also be updated.
 */
export function createMessage(channelState, message) {
    var _a;
    if (!TrytesHelper.isTrytes(message)) {
        throw new Error("The message must be in trytes");
    }
    const tree = new MerkleTree(channelState.seed, channelState.start, channelState.count, channelState.security);
    const nextRootTree = new MerkleTree(channelState.seed, channelState.start + channelState.count, channelState.nextCount, channelState.security);
    const nextRootTrits = nextRootTree.root.addressTrits;
    const messageTrits = TrytesHelper.toTrits(message);
    const indexTrits = pascalEncode(channelState.index);
    const messageLengthTrits = pascalEncode(messageTrits.length);
    const subtree = tree.getSubtree(channelState.index);
    const sponge = new Curl(27);
    const sideKeyTrits = TrytesHelper.toTrits((_a = channelState.sideKey) !== null && _a !== void 0 ? _a : "9".repeat(81));
    sponge.absorb(sideKeyTrits, 0, sideKeyTrits.length);
    sponge.absorb(tree.root.addressTrits, 0, tree.root.addressTrits.length);
    let payload = concatenate([indexTrits, messageLengthTrits]);
    sponge.absorb(payload, 0, payload.length);
    // Encrypt the next root along with the message
    const maskedNextRoot = mask(concatenate([nextRootTrits, messageTrits]), sponge);
    payload = concatenate([payload, maskedNextRoot]);
    // Calculate the nonce for the message so far
    const hammingDiver = new HammingDiver();
    const nonceTrits = hammingDiver.search(sponge.rate(Curl.STATE_LENGTH), channelState.security, Curl.HASH_LENGTH / 3, 0);
    mask(nonceTrits, sponge);
    payload = concatenate([payload, nonceTrits]);
    // Create the signature and add the sibling information
    const sig = signature(sponge.rate(), subtree.key);
    const subtreeTrits = concatenate(subtree.leaves.map(l => l.addressTrits));
    const siblingsCount = subtreeTrits.length / Curl.HASH_LENGTH;
    const encryptedSignature = mask(concatenate([sig, pascalEncode(siblingsCount), subtreeTrits]), sponge);
    // Insert the signature and pad if necessary
    payload = concatenate([payload, encryptedSignature]);
    const nextThird = payload.length % 3;
    if (nextThird !== 0) {
        payload = concatenate([payload, new Int8Array(3 - nextThird).fill(0)]);
    }
    const messageAddress = channelState.mode === "public"
        ? tree.root.addressTrits : maskHash(tree.root.addressTrits);
    const maskedAuthenticatedMessage = {
        payload: TrytesHelper.fromTrits(payload),
        root: TrytesHelper.fromTrits(tree.root.addressTrits),
        address: TrytesHelper.fromTrits(messageAddress)
    };
    if (channelState.index === channelState.count - 1) {
        channelState.start = channelState.nextCount + channelState.start;
        channelState.index = 0;
    }
    else {
        channelState.index++;
    }
    channelState.nextRoot = TrytesHelper.fromTrits(nextRootTrits);
    return maskedAuthenticatedMessage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYW0vY2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFJbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFckQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQUMsSUFBWSxFQUFFLFFBQWdCLEVBQUUsSUFBYSxFQUFFLE9BQWdCO0lBQ3pGLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztLQUN0RDtJQUNELElBQUksUUFBUSxHQUFHLENBQUMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFO1FBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDMUU7SUFDRCxlQUFlLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRS9CLE9BQU87UUFDSCxJQUFJO1FBQ0osSUFBSTtRQUNKLE9BQU8s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