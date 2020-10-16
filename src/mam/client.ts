import { IClient, IIndexationPayload, IMessage, IMessages } from "@iota/iota2.js";
import { Blake2b } from "../crypto/blake2b";
import { IMamFetchedMessage } from "../models/IMamFetchedMessage";
import { IMamMessage } from "../models/IMamMessage";
import { MamMode } from "../models/mamMode";
import { validateModeKey } from "../utils/guards";
import { maskHash } from "../utils/mask";
import { TrytesHelper } from "../utils/trytesHelper";
import { parseMessage } from "./parser";

/**
 * Attach the mam message to the tangle.
 * @param client The client to use for sending.
 * @param mamMessage The message to attach.
 * @param tag Optional tag for the transactions.
 * @returns The transactions that were attached.
 */
export async function mamAttach(
    client: IClient,
    mamMessage: IMamMessage,
    tag?: string): Promise<{
        messageId: string;
        message: IMessage;
    }> {
    if (tag !== undefined && typeof tag !== "string") {
        throw new Error("MWM and depth are no longer needed when calling mamAttach");
    }
    const tagLength = tag ? tag.length : 0;
    const data = Buffer.alloc(1 + tagLength + mamMessage.payload.length);
    data.writeUInt8(tagLength, 0);
    if (tag) {
        data.write(tag, 1, "ascii");
    }
    data.write(mamMessage.payload, 1 + tagLength, "ascii");

    const indexationPayload: IIndexationPayload = {
        type: 2,
        index: Blake2b.sum256(Buffer.from(mamMessage.address)).toString("hex"),
        data: data.toString("hex")
    };

    const tips = await client.tips();

    const message: IMessage = {
        version: 1,
        parent1MessageId: tips.tip1MessageId,
        parent2MessageId: tips.tip2MessageId,
        payload: indexationPayload,
        nonce: 0
    };

    const messageId = await client.messageSubmit(message);

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
    client: IClient,
    root: string,
    mode: MamMode,
    sideKey?: string): Promise<IMamFetchedMessage | undefined> {
    validateModeKey(mode, sideKey);

    const messageAddress = decodeAddress(root, mode);

    const messagesResponse: IMessages = await client.messagesFind(
        Blake2b.sum256(Buffer.from(messageAddress)).toString("hex"));

    const messages: IMessage[] = [];

    for (const messageId of messagesResponse.messageIds) {
        const message = await client.message(messageId);
        if (message) {
            messages.push(message);
        }
    }

    return decodeMessages(messages, root, sideKey);
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
        if (message.payload && message.payload.type === 2) {
            const data = Buffer.from(message.payload.data, "hex");

            // We have a minimum size for the message payload
            if (data.length > 100) {
                const tagLength = data.readUInt8(0);
                if (tagLength === 0 || tagLength > 27) {
                    return;
                }
                const tag = data.slice(1, 1 + tagLength).toString();
                const msg = data.slice(1 + tagLength).toString();

                try {
                    const parsed = parseMessage(msg, root, sideKey);
                    return {
                        root,
                        ...parsed,
                        tag
                    };
                } catch {
                }
            }
        }
    }
}

