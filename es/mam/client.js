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
        const messageAddress = mode === "public"
            ? root
            : converter_1.trytes(mask_1.maskHash(converter_1.trits(root)));
        const txObjects = yield api.findTransactionObjects({ addresses: [messageAddress] });
        return decodeTransactions(txObjects, messageAddress, root, sideKey);
    });
}
exports.mamFetch = mamFetch;
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
 * @param api The api to use for fetching.
 * @param channels The list of channel details to check for new messages.
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
 * @private
 */
function decodeTransactions(txObjects, address, root, sideKey) {
    return __awaiter(this, void 0, void 0, function* () {
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
                        return Object.assign(Object.assign({}, parsed), { tag: tails[i].tag });
                    }
                    catch (err) {
                        throw new Error(`Failed while trying to read MAM channel from address ${address}.\n${err.message}`);
                    }
                }
            }
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBZ0Q7QUFLaEQsNENBQWtEO0FBQ2xELHdDQUF5QztBQUN6QyxxQ0FBd0M7QUFFeEM7Ozs7Ozs7O0dBUUc7QUFDSCxTQUFzQixTQUFTLENBQzNCLEdBQVEsRUFDUixVQUF1QixFQUN2QixLQUFhLEVBQ2IsR0FBVyxFQUNYLEdBQVk7O1FBQ1osTUFBTSxTQUFTLEdBQUc7WUFDZDtnQkFDSSxPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU87Z0JBQzNCLEtBQUssRUFBRSxDQUFDO2dCQUNSLE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTztnQkFDM0IsR0FBRzthQUNOO1NBQ0osQ0FBQztRQUNGLE1BQU0sY0FBYyxHQUFHLE1BQU0sR0FBRyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFN0UsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEQsQ0FBQztDQUFBO0FBakJELDhCQWlCQztBQUVEOzs7Ozs7OztHQVFHO0FBQ0gsU0FBc0IsUUFBUSxDQUMxQixHQUFRLEVBQ1IsSUFBWSxFQUNaLElBQWEsRUFDYixPQUFnQjs7UUFDaEIsd0JBQWUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFL0IsTUFBTSxjQUFjLEdBQ2hCLElBQUksS0FBSyxRQUFRO1lBQ2IsQ0FBQyxDQUFDLElBQUk7WUFDTixDQUFDLENBQUMsa0JBQU0sQ0FBQyxlQUFRLENBQUMsaUJBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFeEMsTUFBTSxTQUFTLEdBQUcsTUFBTSxHQUFHLENBQUMsc0JBQXNCLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FB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