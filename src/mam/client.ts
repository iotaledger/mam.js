import { trits, trytes } from "@iota/converter";
import { API, Transaction } from "@iota/core";
import { IMamFetchedMessage } from "../models/IMamFetchedMessage";
import { IMamMessage } from "../models/IMamMessage";
import { MamMode } from "../models/mamMode";
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
            tag: tag
        }
    ];
    const preparedTrytes = await api.prepareTransfers("9".repeat(81), transfers);

    return await api.sendTrytes(preparedTrytes, depth, mwm);
}

/**
 * Fetch a mam message from a channel.
 * @param api The api to use for fetching.
 * @param root The root within the mam channel to fetch the message.
 * @param mode The mode to use for fetching.
 * @param sideKey The sideKey if mode is restricted.
 * @returns The decoded message and the nextRoot if successful, undefined if no message.
 */
export async function mamFetch(
    api: API,
    root: string,
    mode: MamMode,
    sideKey?: string): Promise<IMamFetchedMessage | undefined> {
    const messageAddress = rootToAddress(root, mode);

    const txObjects = await api.findTransactionObjects({ addresses: [messageAddress] });

    if (txObjects.length === 0) {
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
                break;
            }

            msg += nextTx.signatureMessageFragment;
            currentTx = nextTx;

            if (j === tails[i].lastIndex - 1) {
                try {
                    const parsed = parseMessage(msg, root, sideKey);
                    if (parsed) {
                        return {
                            ...parsed,
                            tag: tails[i].tag
                        };
                    }
                } catch {
                }
            }
        }
    }

    return;
}

/**
 * Fetch all the mam message from a channel.
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
    const localLimit = limit === undefined ? Number.MAX_VALUE : limit;
    const messages: IMamFetchedMessage[] = [];

    let fetchRoot: string | undefined = root;

    do {
        const fetched: IMamFetchedMessage | undefined  = await mamFetch(api, fetchRoot, mode, sideKey);
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
 * Convert the root to an address for fetching.
 * @param root The root within the mam channel to fetch the message.
 * @param mode The mode to use for fetching.
 * @returns The address based on the root and mode.
 */
function rootToAddress(root: string, mode: MamMode): string {
    if (mode === "public") {
        return root;
    }

    return trytes(maskHash(trits(root)));
}
