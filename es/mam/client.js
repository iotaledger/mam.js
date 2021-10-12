// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Blake2b } from "@iota/crypto.js";
import { INDEXATION_PAYLOAD_TYPE, SingleNodeClient } from "@iota/iota.js";
import { Converter } from "@iota/util.js";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDMUMsT0FBTyxFQUE0RCx1QkFBdUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXhDOzs7Ozs7R0FNRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsU0FBUyxDQUMzQixNQUF3QixFQUN4QixVQUF1QixFQUN2QixHQUFZO0lBSVosSUFBSSxHQUFHLEtBQUssU0FBUyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtRQUM5QyxNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7S0FDaEY7SUFDRCxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QyxJQUFJLFNBQVMsR0FBRyxFQUFFLEVBQUU7UUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0tBQ2pEO0lBRUQsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDakUsTUFBTSxlQUFlLEdB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