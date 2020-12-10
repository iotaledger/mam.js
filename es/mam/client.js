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
exports.decodeMessages = exports.mamFetchAll = exports.decodeAddress = exports.mamFetch = exports.mamAttach = void 0;
const iota_js_1 = require("@iota/iota.js");
const guards_1 = require("../utils/guards");
const mask_1 = require("../utils/mask");
const trytesHelper_1 = require("../utils/trytesHelper");
const parser_1 = require("./parser");
/**
 * Attach the mam message to the tangle.
 * @param client The client to use for sending.
 * @param mamMessage The message to attach.
 * @param tag Optional tag for the transactions.
 * @returns The transactions that were attached.
 */
function mamAttach(client, mamMessage, tag) {
    return __awaiter(this, void 0, void 0, function* () {
        if (tag !== undefined && typeof tag !== "string") {
            throw new Error("MWM and depth are no longer needed when calling mamAttach");
        }
        const tagLength = tag ? tag.length : 0;
        const data = new Uint8Array(1 + tagLength + mamMessage.payload.length);
        data[0] = tagLength;
        if (tag) {
            data.set(iota_js_1.Converter.asciiToBytes(tag), 1);
        }
        data.set(iota_js_1.Converter.asciiToBytes(mamMessage.payload), 1 + tagLength);
        const indexationPayload = {
            type: 2,
            index: mamMessage.address,
            data: iota_js_1.Converter.bytesToHex(data)
        };
        const tips = yield client.tips();
        const message = {
            parent1MessageId: tips.tip1MessageId,
            parent2MessageId: tips.tip2MessageId,
            payload: indexationPayload
        };
        const messageId = yield client.messageSubmit(message);
        return {
            message,
            messageId
        };
    });
}
exports.mamAttach = mamAttach;
/**
 * Fetch a mam message from a channel.
 * @param client The client to use for fetching.
 * @param root The root within the mam channel to fetch the message.
 * @param mode The mode to use for fetching.
 * @param sideKey The sideKey if mode is restricted.
 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
 * throws exception if transactions found on address are invalid.
 */
function mamFetch(client, root, mode, sideKey) {
    return __awaiter(this, void 0, void 0, function* () {
        guards_1.validateModeKey(mode, sideKey);
        const messageAddress = decodeAddress(root, mode);
        try {
            const messagesResponse = yield client.messagesFind(messageAddress);
            const messages = [];
            for (const messageId of messagesResponse.messageIds) {
                try {
                    const message = yield client.message(messageId);
                    messages.push(message);
                }
                catch (_a) { }
            }
            return yield decodeMessages(messages, root, sideKey);
        }
        catch (_b) { }
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
        : trytesHelper_1.TrytesHelper.fromTrits(mask_1.maskHash(trytesHelper_1.TrytesHelper.toTrits(root)));
}
exports.decodeAddress = decodeAddress;
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
function mamFetchAll(client, root, mode, sideKey, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        guards_1.validateModeKey(mode, sideKey);
        const localLimit = limit === undefined ? Number.MAX_VALUE : limit;
        const messages = [];
        let fetchRoot = root;
        do {
            const fetched = yield mamFetch(client, fetchRoot, mode, sideKey);
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
 * Decode messages from an address to try and find a MAM message.
 * @param messages The objects returned from the fetch.
 * @param root The root within the mam channel to fetch the message.
 * @param sideKey The sideKey if mode is restricted.
 * @returns The decoded message and the nextRoot if successful, undefined if no messages found,
 * throws exception if transactions found on address are invalid.
 */
function decodeMessages(messages, root, sideKey) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!messages || messages.length === 0) {
            return;
        }
        for (const message of messages) {
            // We only use indexation payload for storing mam messages
            if (message.payload && message.payload.type === 2) {
                const data = iota_js_1.Converter.hexToBytes(message.payload.data);
                // We have a minimum size for the message payload
                if (data.length > 100) {
                    const tagLength = data[0];
                    if (tagLength === 0 || tagLength > 27) {
                        return;
                    }
                    const tag = iota_js_1.Converter.bytesToAscii(data.slice(1, 1 + tagLength));
                    const msg = iota_js_1.Converter.bytesToAscii(data.slice(1 + tagLength));
                    try {
                        const parsed = parser_1.parseMessage(msg, root, sideKey);
                        return Object.assign(Object.assign({ root }, parsed), { tag });
                    }
                    catch (_a) {
                    }
                }
            }
        }
    });
}
exports.decodeMessages = decodeMessages;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQW9HO0FBSXBHLDRDQUFrRDtBQUNsRCx3Q0FBeUM7QUFDekMsd0RBQXFEO0FBQ3JELHFDQUF3QztBQUV4Qzs7Ozs7O0dBTUc7QUFDSCxTQUFzQixTQUFTLENBQzNCLE1BQWUsRUFDZixVQUF1QixFQUN2QixHQUFZOztRQUlaLElBQUksR0FBRyxLQUFLLFNBQVMsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDOUMsTUFBTSxJQUFJLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1NBQ2hGO1FBQ0QsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDcEIsSUFBSSxHQUFHLEVBQUU7WUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFTLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBUyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO1FBRXBFLE1BQU0saUJBQWlCLEdBQXVCO1lBQzFDLElBQUksRUFBRSxDQUFDO1lBQ1AsS0FBSyxFQUFFLFVBQVUsQ0FBQyxPQUFPO1lBQ3pCLElBQUksRUFBRSxtQkFBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7U0FDbkMsQ0FBQztR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