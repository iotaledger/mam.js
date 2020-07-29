import { trits, trytes } from "@iota/converter";
import { API, Transaction } from "@iota/core";
import { IMamFetchedMessage } from "../models/IMamFetchedMessage";
import { IMamMessage } from "../models/IMamMessage";
import { MamMode } from "../models/mamMode";
import { validateModeKey } from "../utils/guards";
import { maskHash } from "../utils/mask";
import { parseMessage } from "./parser";

/**
 * Attach the mam message to the tangle.
 * @param api The api to use for attaching.
 * @param mamMessage The message to attach.
 * @param depth The depth to perform the attach.
 * @param mwm The mwm to perform the attach.
 * @param tag Optional tag for the transactions.
 * @returns The transactions that were attached.
 */
export async function mamAttach(
    api: API,
    mamMessage: IMamMessage,
    depth: number,
    mwm: number,
    tag?: string): Promise<Readonly<Transaction[]>> {
    const transfers = [
        {
            address: mamMessage.address,
            value: 0,
            message: mamMessage.payload,
            tag
        }
    ];
    const preparedTrytes = await api.prepareTransfers("9".repeat(81), transfers);

    return api.sendTrytes(preparedTrytes, depth, mwm);
}

/**
 * Fetch a mam message from a channel.
 * @param api The api to use for fetching.
 * @param root The root within the mam channel to fetch the message.
 * @param mode The mode to use for fetching.
 * @param sideKey The sideKey if mode is restricted.
 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
 * throws exception if transactions found on address are invalid.
 */
export async function mamFetch(
    api: API,
    root: string,
    mode: MamMode,
    sideKey?: string): Promise<IMamFetchedMessage | undefined> {
    validateModeKey(mode, sideKey);

    const messageAddress = decodeAddress(root, mode);

    const txObjects = await api.findTransactionObjects({ addresses: [messageAddress] });

    return decodeTransactions(txObjects, messageAddress, root, sideKey);
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
        : trytes(maskHash(trits(root)));
}

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
export async function mamFetchAll(
    api: API,
    root: string,
    mode: MamMode,
    sideKey?: string,
    limit?: number): Promise<IMamFetchedMessage[]> {
    validateModeKey(mode, sideKey);

    const localLimit = limit === undefined ? Number.MAX_VALUE : limit;
    const messages: IMamFetchedMessage[] = [];

    let fetchRoot: string | undefined = root;

    do {
        const fetched: IMamFetchedMessage | undefined = await mamFetch(api, fetchRoot, mode, sideKey);
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
 * Fetch the next message from a list of channels.
 * @param {API} api - The api to use for fetching.
 * @param {Object[]} channels - The list of channel details to check for new messages.
 * @param {string} channels[].root - The root within the mam channel to fetch the message.
 * @param {MamMode} channels[].mode - The mode to use for fetching.
 * @param {string=} channels[].sideKey - The sideKey if mode is restricted.
 * @returns The decoded messages and the nextRoot if successful for each channel, undefined if no messages found,
 * throws exception if transactions found on address are invalid.
 */
export async function mamFetchCombined(
    api: API,
    channels: {
        /**
         * The root within the mam channel to fetch the message.
         */
        root: string,
        /**
         * The mode to use for fetching.
         */
        mode: MamMode,
        /**
         * The sideKey if mode is restricted.
         */
        sideKey?: string
    }[]): Promise<(IMamFetchedMessage | undefined)[]> {

    const addresses: string[] = channels.map(c =>
        c.mode === "public"
            ? c.root
            : trytes(maskHash(trits(c.root))));

    const txObjects = await api.findTransactionObjects({ addresses });
    const messages: (IMamFetchedMessage | undefined)[] = [];

    for (let i = 0; i < addresses.length; i++) {
        messages.push(
            await decodeTransactions(
                txObjects.filter(t => t.address === addresses[i]),
                addresses[i],
                channels[i].root,
                channels[i].sideKey)
        );
    }

    return messages;
}

/**
 * Decode transactions from an address to try and find a MAM message.
 * @param txObjects The objects returned from the fetch.
 * @param address The address that the data was fetched from.
 * @param root The root within the mam channel to fetch the message.
 * @param sideKey The sideKey if mode is restricted.
 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
 * throws exception if transactions found on address are invalid.
 */
export async function decodeTransactions(
    txObjects: Readonly<Transaction[]>,
    address: string,
    root: string,
    sideKey?: string):
    Promise<IMamFetchedMessage | undefined> {
    if (!txObjects || txObjects.length === 0) {
        return;
    }

    const tails = txObjects.filter(tx => tx.currentIndex === 0);
    const notTails = txObjects.filter(tx => tx.currentIndex !== 0);

    for (let i = 0; i < tails.length; i++) {
        let msg = tails[i].signatureMessageFragment;

        let currentTx = tails[i];
        for (let j = 0; j < tails[i].lastIndex; j++) {
            const nextTx = notTails.find(tx => tx.hash === currentTx.trunkTransaction);
            if (!nextTx) {
                // This is an incomplete transaction chain so move onto
                // the next tail
                break;
            }

            msg += nextTx.signatureMessageFragment;
            currentTx = nextTx;

            // If we now have all the transactions which make up this message
            // try and parse the message
            if (j === tails[i].lastIndex - 1) {
                try {
                    const parsed = parseMessage(msg, root, sideKey);
                    return {
                        root,
                        ...parsed,
                        tag: tails[i].tag
                    };
                } catch (err) {
                    throw new Error(`Failed while trying to read MAM channel from address ${address}.\n${err.message}`);
                }
            }
        }
    }
}
