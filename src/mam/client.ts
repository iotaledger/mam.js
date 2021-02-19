import { Blake2b, Converter, IClient, IIndexationPayload, IMessage, IMessagesResponse, INDEXATION_PAYLOAD_TYPE, SingleNodeClient } from "@iota/iota.js";
import { IMamFetchedMessage } from "../models/IMamFetchedMessage";
import { IMamMessage } from "../models/IMamMessage";
import { MamMode } from "../models/mamMode";
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
export async function mamAttach(
    client: IClient | string,
    mamMessage: IMamMessage,
    tag?: string): Promise<{
        messageId: string;
        message: IMessage;
    }> {
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

    const indexationPayload: IIndexationPayload = {
        type: INDEXATION_PAYLOAD_TYPE,
        index: Converter.bytesToHex(hashedAddress),
        data: Converter.bytesToHex(data)
    };

    const message: IMessage = {
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
 * @param client The client to use for fetching.
 * @param root The root within the mam channel to fetch the message.
 * @param mode The mode to use for fetching.
 * @param sideKey The sideKey if mode is restricted.
 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
 * throws exception if transactions found on address are invalid.
 */
export async function mamFetch(
    client: IClient | string,
    root: string,
    mode: MamMode,
    sideKey?: string): Promise<IMamFetchedMessage | undefined> {
    validateModeKey(mode, sideKey);
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    const messageAddress = decodeAddress(root, mode);

    const hashedAddress = Blake2b.sum256(Converter.utf8ToBytes(messageAddress));

    try {
        const messagesResponse: IMessagesResponse = await localClient.messagesFind(hashedAddress);

        const messages: IMessage[] = [];

        for (const messageId of messagesResponse.messageIds) {
            try {
                const message = await localClient.message(messageId);
                messages.push(message);
            } catch { }
        }

        return await decodeMessages(messages, root, sideKey);
    } catch { }
}

/**
 * Decodes the root to its associated address.
 * @param root The root to device.
 * @param mode The mode for the channel.
 * @returns The decoded address.
 */
export function decodeAddress(root: string, mode: MamMode): string {
    return mode === "public"
        ? root
        : TrytesHelper.fromTrits(maskHash(TrytesHelper.toTrits(root)));
}

/**
 * Fetch all the mam message from a channel.
 * If limit is undefined we use Number.MAX_VALUE, this could potentially take a long time to complete.
 * It is preferable to specify the limit so you read the data in chunks, then if you read and get the
 * same amount of messages as your limit you should probably read again.
 * @param client The client to use for fetching.
 * @param root The root within the mam channel to fetch the message.
 * @param mode The mode to use for fetching.
 * @param sideKey The sideKey if mode is restricted.
 * @param limit Limit the number of messages retrieved.
 * @returns The array of retrieved messages.
 */
export async function mamFetchAll(
    client: IClient,
    root: string,
    mode: MamMode,
    sideKey?: string,
    limit?: number): Promise<IMamFetchedMessage[]> {
    validateModeKey(mode, sideKey);

    const localLimit = limit === undefined ? Number.MAX_VALUE : limit;
    const messages: IMamFetchedMessage[] = [];

    let fetchRoot: string | undefined = root;

    do {
        const fetched: IMamFetchedMessage | undefined = await mamFetch(client, fetchRoot, mode, sideKey);
        if (fetched) {
            messages.push(fetched);
            fetchRoot = fetched.nextRoot;
        } else {
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
export async function decodeMessages(
    messages: IMessage[],
    root: string,
    sideKey?: string):
    Promise<IMamFetchedMessage | undefined> {
    if (!messages || messages.length === 0) {
        return;
    }

    for (const message of messages) {
        // We only use indexation payload for storing mam messages
        if (message.payload?.type === INDEXATION_PAYLOAD_TYPE && message.payload.data) {
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
                } catch { }
            }
        }
    }
}

