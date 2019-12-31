import { trits, trytes } from "@iota/converter";
import { isTrytes, isTrytesOfExactLength } from "@iota/validators";
import { MerkleTree } from "../merkle/merkleTree";
import { IMamChannelState } from "../models/IMamChannelState";
import { IMamMessage } from "../models/IMamMessage";
import { MamMode } from "../models/mamMode";
import { HammingDiver } from "../pearlDiver/hammingDiver";
import { Curl } from "../signing/curl";
import { signature } from "../signing/iss-p27";
import { concatenate } from "../utils/arrayHelper";
import { validateModeKey } from "../utils/guards";
import { mask, maskHash } from "../utils/mask";
import { pascalEncode } from "../utils/pascal";

/**
 * Create a new channel object.
 * @param seed The seed for the channel.
 * @param security The security level for the channel.
 * @param mode The mode for the channel.
 * @param sideKey The side key to use for restricted mode.
 * @returns The new channel state.
 */
export function createChannel(seed: string, security: number, mode: MamMode, sideKey?: string): IMamChannelState {
    if (!isTrytesOfExactLength(seed, 81)) {
        throw new Error(`The seed must be 81 trytes long`);
    }
    if (security < 1 || security > 3) {
        throw new Error(`Security must be between 1 and 3, it is ${security}`);
    }
    validateModeKey(mode, sideKey);

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

/**
 * Get the root of the channel.
 * @param channelState The channel state to get the root.
 * @returns The root.
 */
export function channelRoot(channelState: IMamChannelState): string {
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

    const tree = new MerkleTree(
        channelState.seed,
        channelState.start,
        channelState.count,
        channelState.security);

    return trytes(tree.root.addressTrits);
}

/**
 * Prepare a message on the mam channel.
 * @param channelState The channel to prepare the message for.
 * @param message The trytes to include in the message.
 * @returns The prepared message, the channel state will also be updated.
 */
export function createMessage(channelState: IMamChannelState, message: string): IMamMessage {
    if (!isTrytes(message)) {
        throw new Error(`The message must be in trytes`);
    }
    const tree = new MerkleTree(
        channelState.seed,
        channelState.start,
        channelState.count,
        channelState.security);
    const nextRootTree = new MerkleTree(
        channelState.seed,
        channelState.start + channelState.count,
        channelState.nextCount,
        channelState.security);

    const nextRootTrits = nextRootTree.root.addressTrits;

    const messageTrits = trits(message);
    const indexTrits = pascalEncode(channelState.index);
    const messageLengthTrits = pascalEncode(messageTrits.length);

    const subtree = tree.getSubtree(channelState.index);

    const sponge = new Curl(27);

    const sideKeyTrits = trits(channelState.sideKey || "9".repeat(81));
    sponge.absorb(sideKeyTrits, 0, sideKeyTrits.length);
    sponge.absorb(tree.root.addressTrits, 0, tree.root.addressTrits.length);

    let payload = concatenate([indexTrits, messageLengthTrits]);

    sponge.absorb(payload, 0, payload.length);

    // Encrypt the next root along with the message
    const maskedNextRoot = mask(concatenate([nextRootTrits, messageTrits]), sponge);
    payload = concatenate([payload, maskedNextRoot]);

    // Calculate the nonce for the message so far
    const hammingDiver = new HammingDiver();
    const nonceTrits = hammingDiver.search(
        sponge.rate(Curl.STATE_LENGTH),
        channelState.security,
        Curl.HASH_LENGTH / 3, 0
    );
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

    const messageAddress = channelState.mode === "public" ?
        tree.root.addressTrits : maskHash(tree.root.addressTrits);

    const maskedAuthenticatedMessage: IMamMessage = {
        payload: trytes(payload),
        root: trytes(tree.root.addressTrits),
        address: trytes(messageAddress)
    };

    if (channelState.index === channelState.count - 1) {
        channelState.start = channelState.nextCount + channelState.start;
        channelState.index = 0;
    } else {
        channelState.index++;
    }

    channelState.nextRoot = trytes(nextRootTrits);

    return maskedAuthenticatedMessage;
}
