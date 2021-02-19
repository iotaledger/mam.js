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
        const packedTag = tag ? trytesHelper_1.TrytesHelper.packTrytes(tag) : undefined;
        const packedTaglength = packedTag ? packedTag.length : 0;
        const packedData = trytesHelper_1.TrytesHelper.packTrytes(mamMessage.payload);
        const data = new Uint8Array(1 + packedTaglength + packedData.length);
        data[0] = packedTaglength;
        if (packedTag) {
            data.set(packedTag, 1);
        }
        data.set(packedData, 1 + packedTaglength);
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
                const payloadBytes = iota_js_1.Converter.hexToBytes(message.payload.data);
                // We have a minimum size for the message payload
                if (payloadBytes.length > 100) {
                    const packedTagLength = payloadBytes[0];
                    const packedTag = packedTagLength > 0 ? payloadBytes.slice(1, 1 + packedTagLength) : undefined;
                    const packedData = payloadBytes.slice(1 + packedTagLength);
                    const tag = packedTag ? trytesHelper_1.TrytesHelper.unpackTrytes(packedTag) : "";
                    const data = trytesHelper_1.TrytesHelper.unpackTrytes(packedData);
                    try {
                        const parsed = parser_1.parseMessage(data, root, sideKey);
                        return Object.assign(Object.assign({ root }, parsed), { tag });
                    }
                    catch (_b) { }
                }
            }
        }
    });
}
exports.decodeMessages = decodeMessages;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXdKO0FBSXhKLDRDQUFrRDtBQUNsRCx3Q0FBeUM7QUFDekMsd0RBQXFEO0FBQ3JELHFDQUF3QztBQUV4Qzs7Ozs7O0dBTUc7QUFDSCxTQUFzQixTQUFTLENBQzNCLE1BQXdCLEVBQ3hCLFVBQXVCLEVBQ3ZCLEdBQVk7O1FBSVosSUFBSSxHQUFHLEtBQUssU0FBUyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUM5QyxNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7U0FDaEY7UUFDRCxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLFNBQVMsR0FBRyxFQUFFLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQywyQkFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2pFLE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sVUFBVSxHQUFHLDJCQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUvRCxNQUFNLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEdBQUcsZUFBZSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDO1FBQzFCLElBQUksU0FBUyxF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