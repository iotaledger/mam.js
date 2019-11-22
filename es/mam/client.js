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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBZ0Q7QUFLaEQsd0NBQXlDO0FBQ3pDLHFDQUF3QztBQUV4Qzs7Ozs7Ozs7R0FRRztBQUNILFNBQXNCLFNBQVMsQ0FDM0IsR0FBUSxFQUNSLFVBQXVCLEVBQ3ZCLEtBQWEsRUFDYixHQUFXLEVBQ1gsR0FBWTs7UUFDWixNQUFNLFNBQVMsR0FBRztZQUNkO2dCQUNJLE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTztnQkFDM0IsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsT0FBTyxFQUFFLFVBQVUsQ0FBQyxPQUFPO2dCQUMzQixHQUFHLEVBQUUsR0FBRzthQUNYO1NBQ0osQ0FBQztRQUNGLE1BQU0sY0FBYyxHQUFHLE1BQU0sR0FBRyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFN0UsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEQsQ0FBQztDQUFBO0FBakJELDhCQWlCQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxTQUFzQixRQUFRLENBQzFCLEdBQVEsRUFDUixJQUFZLEVBQ1osSUFBYSxFQUNiLE9BQWdCOztRQUNoQixNQUFNLGNBQWMsR0FBRyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWpELE1BQU0sU0FBUyxHQUFHLE1BQU0sR0FBRyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXBGLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDeEIsT0FBTztTQUNWO1FBRUQsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLE1BQU0s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