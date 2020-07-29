"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeTransactions = exports.mamFetchCombined = exports.mamFetchAll = exports.decodeAddress = exports.mamFetch = exports.mamAttach = void 0;
const converter_1 = require("@iota/converter");
const guards_1 = require("../utils/guards");
const mask_1 = require("../utils/mask");
const parser_1 = require("./parser");
/**
 * Attach the mam message to the tangle.
 * @param api The api to use for attaching.
 * @param mamMessage The message to attach.
 * @param depth The depth to perform the attach.
 * @param mwm The mwm to perform the attach.
 * @param tag Optional tag for the transactions.
 * @returns The transactions that were attached.
 */
function mamAttach(api, mamMessage, depth, mwm, tag) {
    return __awaiter(this, void 0, void 0, function* () {
        const transfers = [
            {
                address: mamMessage.address,
                value: 0,
                message: mamMessage.payload,
                tag
            }
        ];
        const preparedTrytes = yield api.prepareTransfers("9".repeat(81), transfers);
        return api.sendTrytes(preparedTrytes, depth, mwm);
    });
}
exports.mamAttach = mamAttach;
/**
 * Fetch a mam message from a channel.
 * @param api The api to use for fetching.
 * @param root The root within the mam channel to fetch the message.
 * @param mode The mode to use for fetching.
 * @param sideKey The sideKey if mode is restricted.
 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
 * throws exception if transactions found on address are invalid.
 */
function mamFetch(api, root, mode, sideKey) {
    return __awaiter(this, void 0, void 0, function* () {
        guards_1.validateModeKey(mode, sideKey);
        const messageAddress = decodeAddress(root, mode);
        const txObjects = yield api.findTransactionObjects({ addresses: [messageAddress] });
        return decodeTransactions(txObjects, messageAddress, root, sideKey);
    });
}
exports.mamFetch = mamFetch;
/**
 * Decodes the root to its associated address.
 * @param root The root to device.
 * @param mode The mode for the channel.
 * @returns The decoded address.
 */
function decodeAddress(root, mode) {
    return mode === "public"
        ? root
        : converter_1.trytes(mask_1.maskHash(converter_1.trits(root)));
}
exports.decodeAddress = decodeAddress;
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
function mamFetchAll(api, root, mode, sideKey, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        guards_1.validateModeKey(mode, sideKey);
        const localLimit = limit === undefined ? Number.MAX_VALUE : limit;
        const messages = [];
        let fetchRoot = root;
        do {
            const fetched = yield mamFetch(api, fetchRoot, mode, sideKey);
            if (fetched) {
                messages.push(fetched);
                fetchRoot = fetched.nextRoot;
            }
            else {
                fetchRoot = undefined;
            }
        } while (fetchRoot && messages.length < localLimit);
        return messages;
    });
}
exports.mamFetchAll = mamFetchAll;
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
function mamFetchCombined(api, channels) {
    return __awaiter(this, void 0, void 0, function* () {
        const addresses = channels.map(c => c.mode === "public"
            ? c.root
            : converter_1.trytes(mask_1.maskHash(converter_1.trits(c.root))));
        const txObjects = yield api.findTransactionObjects({ addresses });
        const messages = [];
        for (let i = 0; i < addresses.length; i++) {
            messages.push(yield decodeTransactions(txObjects.filter(t => t.address === addresses[i]), addresses[i], channels[i].root, channels[i].sideKey));
        }
        return messages;
    });
}
exports.mamFetchCombined = mamFetchCombined;
/**
 * Decode transactions from an address to try and find a MAM message.
 * @param txObjects The objects returned from the fetch.
 * @param address The address that the data was fetched from.
 * @param root The root within the mam channel to fetch the message.
 * @param sideKey The sideKey if mode is restricted.
 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
 * throws exception if transactions found on address are invalid.
 */
function decodeTransactions(txObjects, address, root, sideKey) {
    return __awaiter(this, void 0, void 0, function* () {
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
                        const parsed = parser_1.parseMessage(msg, root, sideKey);
                        return Object.assign(Object.assign({ root }, parsed), { tag: tails[i].tag });
                    }
                    catch (err) {
                        throw new Error(`Failed while trying to read MAM channel from address ${address}.\n${err.message}`);
                    }
                }
            }
        }
    });
}
exports.decodeTransactions = decodeTransactions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQWdEO0FBS2hELDRDQUFrRDtBQUNsRCx3Q0FBeUM7QUFDekMscUNBQXdDO0FBRXhDOzs7Ozs7OztHQVFHO0FBQ0gsU0FBc0IsU0FBUyxDQUMzQixHQUFRLEVBQ1IsVUFBdUIsRUFDdkIsS0FBYSxFQUNiLEdBQVcsRUFDWCxHQUFZOztRQUNaLE1BQU0sU0FBUyxHQUFHO1lBQ2Q7Z0JBQ0ksT0FBTyxFQUFFLFVBQVUsQ0FBQyxPQUFPO2dCQUMzQixLQUFLLEVBQUUsQ0FBQztnQkFDUixPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU87Z0JBQzNCLEdBQUc7YUFDTjtTQUNKLENBQUM7UUFDRixNQUFNLGNBQWMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRTdFLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FBQTtBQWpCRCw4QkFpQkM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILFNBQXNCLFFBQVEsQ0FDMUIsR0FBUSxFQUNSLElBQVksRUFDWixJQUFhLEVBQ2IsT0FBZ0I7O1FBQ2hCLHdCQUFlLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRS9CLE1BQU0sY0FBYyxHQUFHLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFakQsTUFBTSxTQUFTLEdBQUcsTUFBTSxHQUFHLENBQUMsc0JBQXNCLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFcEYsT0FBTyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLElB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