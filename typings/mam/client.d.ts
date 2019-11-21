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
 * @returns The decoded message and the nextRoot if successful, undefined if no message.
 */
export declare function mamFetch(api: API, root: string, mode: MamMode, sideKey?: string): Promise<IMamFetchedMessage | undefined>;
/**
 * Fetch all the mam message from a channel.
 * @param api The api to use for fetching.
 * @param root The root within the mam channel to fetch the message.
 * @param mode The mode to use for fetching.
 * @param sideKey The sideKey if mode is restricted.
 * @param limit Limit the number of messages retrieved.
 * @returns The array of retrieved messages.
 */
export declare function mamFetchAll(api: API, root: string, mode: MamMode, sideKey?: string, limit?: number): Promise<IMamFetchedMessage[]>;
