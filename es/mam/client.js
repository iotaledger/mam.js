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
 * @param client The client or node endpoint to use for sending.
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
        if (tagLength > 27) {
            throw new Error("The tag length is too long");
        }
        const data = new Uint8Array(1 + tagLength + mamMessage.payload.length);
        data[0] = tagLength;
        if (tag) {
            data.set(iota_js_1.Converter.utf8ToBytes(tag), 1);
        }
        data.set(iota_js_1.Converter.utf8ToBytes(mamMessage.payload), 1 + tagLength);
        const hashedAddress = iota_js_1.Blake2b.sum256(iota_js_1.Converter.utf8ToBytes(mamMessage.address));
        const indexationPayload = {
            type: iota_js_1.INDEXATION_PAYLOAD_TYPE,
            index: iota_js_1.Converter.bytesToHex(hashedAddress),
            data: iota_js_1.Converter.bytesToHex(data)
        };
        const message = {
            payload: indexationPayload
        };
        const localClient = typeof client === "string" ? new iota_js_1.SingleNodeClient(client) : client;
        const messageId = yield localClient.messageSubmit(message);
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
        const localClient = typeof client === "string" ? new iota_js_1.SingleNodeClient(client) : client;
        const messageAddress = decodeAddress(root, mode);
        const hashedAddress = iota_js_1.Blake2b.sum256(iota_js_1.Converter.utf8ToBytes(messageAddress));
        try {
            const messagesResponse = yield localClient.messagesFind(hashedAddress);
            const messages = [];
            for (const messageId of messagesResponse.messageIds) {
                try {
                    const message = yield localClient.message(messageId);
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
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!messages || messages.length === 0) {
            return;
        }
        for (const message of messages) {
            // We only use indexation payload for storing mam messages
            if (((_a = message.payload) === null || _a === void 0 ? void 0 : _a.type) === iota_js_1.INDEXATION_PAYLOAD_TYPE && message.payload.data) {
                const data = iota_js_1.Converter.hexToBytes(message.payload.data);
                // We have a minimum size for the message payload
                if (data.length > 100) {
                    const tagLength = data[0];
                    if (tagLength === 0 || tagLength > 27) {
                        return;
                    }
                    const tag = iota_js_1.Converter.bytesToUtf8(data.slice(1, 1 + tagLength));
                    const msg = iota_js_1.Converter.bytesToUtf8(data.slice(1 + tagLength));
                    try {
                        const parsed = parser_1.parseMessage(msg, root, sideKey);
                        return Object.assign(Object.assign({ root }, parsed), { tag });
                    }
                    catch (_b) { }
                }
            }
        }
    });
}
exports.decodeMessages = decodeMessages;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXdKO0FBSXhKLDRDQUFrRDtBQUNsRCx3Q0FBeUM7QUFDekMsd0RBQXFEO0FBQ3JELHFDQUF3QztBQUV4Qzs7Ozs7O0dBTUc7QUFDSCxTQUFzQixTQUFTLENBQzNCLE1BQXdCLEVBQ3hCLFVBQXVCLEVBQ3ZCLEdBQVk7O1FBSVosSUFBSSxHQUFHLEtBQUssU0FBUyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUM5QyxNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7U0FDaEY7UUFDRCxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLFNBQVMsR0FBRyxFQUFFLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDcEIsSUFBSSxHQUFHLEVBQUU7WUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBUyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO1FBRW5FLE1BQU0sYUFBYSxHQUFHLGlCQUFPLENBQUMsTUFBTSxDQUFDLG1CQUFTLENBQUMs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