// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Blake2b, Converter, INDEXATION_PAYLOAD_TYPE, SingleNodeClient } from "@iota/iota.js";
import { validateModeKey } from "../utils/guards";
import { maskHash } from "../utils/mask";
import { TrytesHelper } from "../utils/trytesHelper";
import { parseMessage } from "./parser";
/**
 * Attach the mam message to the tangle.
 * @param client The client or node endpoint to use for sending.
 * @param mamMessage The message to attach.
 * @param tag Optional tag for the transactions.
 * @returns The transactions that were attached.
 */
export async function mamAttach(client, mamMessage, tag) {
    if (tag !== undefined && typeof tag !== "string") {
        throw new Error("MWM and depth are no longer needed when calling mamAttach");
    }
    const tagLength = tag ? tag.length : 0;
    if (tagLength > 27) {
        throw new Error("The tag length is too long");
    }
    const packedTag = tag ? TrytesHelper.packTrytes(tag) : undefined;
    const packedTaglength = packedTag ? packedTag.length : 0;
    const packedData = TrytesHelper.packTrytes(mamMessage.payload);
    const data = new Uint8Array(1 + packedTaglength + packedData.length);
    data[0] = packedTaglength;
    if (packedTag) {
        data.set(packedTag, 1);
    }
    data.set(packedData, 1 + packedTaglength);
    const hashedAddress = Blake2b.sum256(Converter.utf8ToBytes(mamMessage.address));
    const indexationPayload = {
        type: INDEXATION_PAYLOAD_TYPE,
        index: Converter.bytesToHex(hashedAddress),
        data: Converter.bytesToHex(data)
    };
    const message = {
        payload: indexationPayload
    };
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
    const messageId = await localClient.messageSubmit(message);
    return {
        message,
        messageId
    };
}
/**
 * Fetch a mam message from a channel.
 * @param client The client or node endpoint to use for fetching.
 * @param root The root within the mam channel to fetch the message.
 * @param mode The mode to use for fetching.
 * @param sideKey The sideKey if mode is restricted.
 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
 * throws exception if transactions found on address are invalid.
 */
export async function mamFetch(client, root, mode, sideKey) {
    validateModeKey(mode, sideKey);
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
    const messageAddress = decodeAddress(root, mode);
    const hashedAddress = Blake2b.sum256(Converter.utf8ToBytes(messageAddress));
    try {
        const messagesResponse = await localClient.messagesFind(hashedAddress);
        const messages = [];
        for (const messageId of messagesResponse.messageIds) {
            try {
                const message = await localClient.message(messageId);
                messages.push(message);
            }
            catch { }
        }
        return await decodeMessages(messages, root, sideKey);
    }
    catch { }
}
/**
 * Decodes the root to its associated address.
 * @param root The root to device.
 * @param mode The mode for the channel.
 * @returns The decoded address.
 */
export function decodeAddress(root, mode) {
    return mode === "public"
        ? root
        : TrytesHelper.fromTrits(maskHash(TrytesHelper.toTrits(root)));
}
/**
 * Fetch all the mam message from a channel.
 * If limit is undefined we use Number.MAX_VALUE, this could potentially take a long time to complete.
 * It is preferable to specify the limit so you read the data in chunks, then if you read and get the
 * same amount of messages as your limit you should probably read again.
 * @param client The client or node endpoint to use for fetching.
 * @param root The root within the mam channel to fetch the message.
 * @param mode The mode to use for fetching.
 * @param sideKey The sideKey if mode is restricted.
 * @param limit Limit the number of messages retrieved.
 * @returns The array of retrieved messages.
 */
export async function mamFetchAll(client, root, mode, sideKey, limit) {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
    validateModeKey(mode, sideKey);
    const localLimit = limit === undefined ? Number.MAX_VALUE : limit;
    const messages = [];
    let fetchRoot = root;
    do {
        const fetched = await mamFetch(localClient, fetchRoot, mode, sideKey);
        if (fetched) {
            messages.push(fetched);
            fetchRoot = fetched.nextRoot;
        }
        else {
            fetchRoot = undefined;
        }
    } while (fetchRoot && messages.length < localLimit);
    return messages;
}
/**
 * Decode messages from an address to try and find a MAM message.
 * @param messages The objects returned from the fetch.
 * @param root The root within the mam channel to fetch the message.
 * @param sideKey The sideKey if mode is restricted.
 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
 * throws exception if transactions found on address are invalid.
 */
export async function decodeMessages(messages, root, sideKey) {
    var _a;
    if (!messages || messages.length === 0) {
        return;
    }
    for (const message of messages) {
        // We only use indexation payload for storing mam messages
        if (((_a = message.payload) === null || _a === void 0 ? void 0 : _a.type) === INDEXATION_PAYLOAD_TYPE && message.payload.data) {
            const payloadBytes = Converter.hexToBytes(message.payload.data);
            // We have a minimum size for the message payload
            if (payloadBytes.length > 100) {
                const packedTagLength = payloadBytes[0];
                const packedTag = packedTagLength > 0 ? payloadBytes.slice(1, 1 + packedTagLength) : undefined;
                const packedData = payloadBytes.slice(1 + packedTagLength);
                const tag = packedTag ? TrytesHelper.unpackTrytes(packedTag) : "";
                const data = TrytesHelper.unpackTrytes(packedData);
                try {
                    const parsed = parseMessage(data, root, sideKey);
                    return {
                        root,
                        ...parsed,
                        tag
                    };
                }
                catch { }
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QyxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBNEQsdUJBQXVCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJeEosT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFeEM7Ozs7OztHQU1HO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxTQUFTLENBQzNCLE1BQXdCLEVBQ3hCLFVBQXVCLEVBQ3ZCLEdBQVk7SUFJWixJQUFJLEdBQUcsS0FBSyxTQUFTLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1FBQzlDLE1BQU0sSUFBSSxLQUFLLENBQUMsMkRBQTJELENBQUMsQ0FBQztLQUNoRjtJQUNELE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLElBQUksU0FBUyxHQUFHLEVBQUUsRUFBRTtRQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7S0FDakQ7SUFFRCxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNqRSxNQUFNLGVBQWUsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJ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