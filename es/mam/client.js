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
                tag: tag
            }
        ];
        const preparedTrytes = yield api.prepareTransfers("9".repeat(81), transfers);
        return yield api.sendTrytes(preparedTrytes, depth, mwm);
    });
}
exports.mamAttach = mamAttach;
/**
 * Fetch a mam message from a channel.
 * @param api The api to use for fetching.
 * @param root The root within the mam channel to fetch the message.
 * @param mode The mode to use for fetching.
 * @param sideKey The sideKey if mode is restricted.
 * @returns The decoded message and the nextRoot if successful, undefined if no message.
 */
function mamFetch(api, root, mode, sideKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const messageAddress = rootToAddress(root, mode);
        const txObjects = yield api.findTransactionObjects({ addresses: [messageAddress] });
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
                        const parsed = parser_1.parseMessage(msg, root, sideKey);
                        if (parsed) {
                            return Object.assign(Object.assign({}, parsed), { tag: tails[i].tag });
                        }
                    }
                    catch (_a) {
                    }
                }
            }
        }
        return;
    });
}
exports.mamFetch = mamFetch;
/**
 * Fetch all the mam message from a channel.
 * @param api The api to use for fetching.
 * @param root The root within the mam channel to fetch the message.
 * @param mode The mode to use for fetching.
 * @param sideKey The sideKey if mode is restricted.
 * @param limit Limit the number of messages retrieved.
 * @returns The array of retrieved messages.
 */
function mamFetchAll(api, root, mode, sideKey, limit) {
    return __awaiter(this, void 0, void 0, function* () {
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
 * Convert the root to an address for fetching.
 * @param root The root within the mam channel to fetch the message.
 * @param mode The mode to use for fetching.
 * @returns The address based on the root and mode.
 */
function rootToAddress(root, mode) {
    if (mode === "public") {
        return root;
    }
    return converter_1.trytes(mask_1.maskHash(converter_1.trits(root)));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBZ0Q7QUFLaEQsd0NBQXlDO0FBQ3pDLHFDQUF3QztBQUV4Qzs7Ozs7Ozs7R0FRRztBQUNILFNBQXNCLFNBQVMsQ0FDM0IsR0FBUSxFQUNSLFVBQXVCLEVBQ3ZCLEtBQWEsRUFDYixHQUFXLEVBQ1gsR0FBWTs7UUFDWixNQUFNLFNBQVMsR0FBRztZQUNkO2dCQUNJLE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTztnQkFDM0IsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsT0FBTyxFQUFFLFVBQVUsQ0FBQyxPQUFPO2dCQUMzQixHQUFHLEVBQUUsR0FBRzthQUNYO1NBQ0osQ0FBQztRQUNGLE1BQU0sY0FBYyxHQUFHLE1BQU0sR0FBRyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFN0UsT0FBTyxNQUFNLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM1RCxDQUFDO0NBQUE7QUFqQkQsOEJBaUJDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILFNBQXNCLFFBQVEsQ0FDMUIsR0FBUSxFQUNSLElBQVksRUFDWixJQUFhLEVBQ2IsT0FBZ0I7O1FBQ2hCLE1BQU0sY0FBYyxHQUFHLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFakQsTUFBTSxTQUFTLEdBQUcsTUFBTSxHQUFHLENBQUMsc0JBQXNCLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFcEYsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN4QixPQUFPO1NBQ1Y7UUFFRCxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMs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