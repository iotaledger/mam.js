import { IClient, IMessage } from "@iota/iota.js";
import { IMamFetchedMessage } from "../models/IMamFetchedMessage";
import { IMamMessage } from "../models/IMamMessage";
import { MamMode } from "../models/mamMode";
/**
 * Attach the mam message to the tangle.
 * @param client The client or node endpoint to use for sending.
 * @param mamMessage The message to attach.
 * @param tag Optional tag for the transactions.
 * @returns The transactions that were attached.
 */
export declare function mamAttach(client: IClient | string, mamMessage: IMamMessage, tag?: string): Promise<{
    messageId: string;
    message: IMessage;
}>;
/**
 * Fetch a mam message from a channel.
 * @param client The client or node endpoint to use for fetching.
 * @param root The root within the mam channel to fetch the message.
 * @param mode The mode to use for fetching.
 * @param sideKey The sideKey if mode is restricted.
 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
 * throws exception if transactions found on address are invalid.
 */
export declare function mamFetch(client: IClient | string, root: string, mode: MamMode, sideKey?: string): Promise<IMamFetchedMessage | undefined>;
/**
 * Decodes the root to its associated address.
 * @param root The root to device.
 * @param mode The mode for the channel.
 * @returns The decoded address.
 */
export declare function decodeAddress(root: string, mode: MamMode): string;
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
export declare function mamFetchAll(client: IClient | string, root: string, mode: MamMode, sideKey?: string, limit?: number): Promise<IMamFetchedMessage[]>;
/**
 * Decode messages from an address to try and find a MAM message.
 * @param messages The objects returned from the fetch.
 * @param root The root within the mam channel to fetch the message.
 * @param sideKey The sideKey if mode is restricted.
 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
 * throws exception if transactions found on address are invalid.
 */
export declare function decodeMessages(messages: IMessage[], root: string, sideKey?: string): Promise<IMamFetchedMessage | undefined>;
