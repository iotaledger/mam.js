import { API, Transaction } from "@iota/core";
import { IMamFetchedMessage } from "../models/IMamFetchedMessage";
import { IMamMessage } from "../models/IMamMessage";
import { MamMode } from "../models/mamMode";
/**
 * Attach the mam message to the tangle.
 * @param api The api to use for attaching.
 * @param mamMessage The message to attach.
 * @param depth The depth to perform the attach.
 * @param mwm The mwm to perform the attach.
 * @param tag Optional tag for the transactions.
 * @returns The transactions that were attached.
 */
export declare function mamAttach(api: API, mamMessage: IMamMessage, depth: number, mwm: number, tag?: string): Promise<Readonly<Transaction[]>>;
/**
 * Fetch a mam message from a channel.
 * @param api The api to use for fetching.
 * @param root The root within the mam channel to fetch the message.
 * @param mode The mode to use for fetching.
 * @param sideKey The sideKey if mode is restricted.
 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
 * throws exception if transactions found on address are invalid.
 */
export declare function mamFetch(api: API, root: string, mode: MamMode, sideKey?: string): Promise<IMamFetchedMessage | undefined>;
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
 * @param api The api to use for fetching.
 * @param root The root within the mam channel to fetch the message.
 * @param mode The mode to use for fetching.
 * @param sideKey The sideKey if mode is restricted.
 * @param limit Limit the number of messages retrieved.
 * @returns The array of retrieved messages.
 */
export declare function mamFetchAll(api: API, root: string, mode: MamMode, sideKey?: string, limit?: number): Promise<IMamFetchedMessage[]>;
/**
 * Fetch the next message from a list of channels.
 * @param {API} api - The api to use for fetching.
 * @param {Object[]} channels - The list of channel details to check for new messages.
 * @param {string} channels[].root - The root within the mam channel to fetch the message.
 * @param {MamMode} channels[].mode - The mode to use for fetching.
 * @param {string=} channels[].sideKey - The sideKey if mode is restricted.
 * @returns The decoded messages and the nextRoot if successful for each channel, undefined if no messages found,
 * throws exception if transactions found on address are invalid.
 */
export declare function mamFetchCombined(api: API, channels: {
    /**
     * The root within the mam channel to fetch the message.
     */
    root: string;
    /**
     * The mode to use for fetching.
     */
    mode: MamMode;
    /**
     * The sideKey if mode is restricted.
     */
    sideKey?: string;
}[]): Promise<(IMamFetchedMessage | undefined)[]>;
/**
 * Decode transactions from an address to try and find a MAM message.
 * @param txObjects The objects returned from the fetch.
 * @param address The address that the data was fetched from.
 * @param root The root within the mam channel to fetch the message.
 * @param sideKey The sideKey if mode is restricted.
 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
 * throws exception if transactions found on address are invalid.
 */
export declare function decodeTransactions(txObjects: Readonly<Transaction[]>, address: string, root: string, sideKey?: string): Promise<IMamFetchedMessage | undefined>;
