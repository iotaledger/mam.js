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
        if (tagLength > 27) {
            throw new Error("The tag length is too long");
        }
        const data = new Uint8Array(1 + tagLength + mamMessage.payload.length);
        data[0] = tagLength;
        if (tag) {
            data.set(iota_js_1.Converter.asciiToBytes(tag), 1);
        }
        data.set(iota_js_1.Converter.asciiToBytes(mamMessage.payload), 1 + tagLength);
        const hashedAddress = iota_js_1.Converter.bytesToHex(iota_js_1.Blake2b.sum256(iota_js_1.Converter.asciiToBytes(mamMessage.address)));
        const indexationPayload = {
            type: 2,
            index: hashedAddress,
            data: iota_js_1.Converter.bytesToHex(data)
        };
        const message = {
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
        const hashedAddress = iota_js_1.Converter.bytesToHex(iota_js_1.Blake2b.sum256(iota_js_1.Converter.asciiToBytes(messageAddress)));
        try {
            const messagesResponse = yield client.messagesFind(hashedAddress);
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
                    const tag = iota_js_1.Converter.bytesToAscii(data.slice(1, 1 + tagLength));
                    const msg = iota_js_1.Converter.bytesToAscii(data.slice(1 + tagLength));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXNJO0FBSXRJLDRDQUFrRDtBQUNsRCx3Q0FBeUM7QUFDekMsd0RBQXFEO0FBQ3JELHFDQUF3QztBQUV4Qzs7Ozs7O0dBTUc7QUFDSCxTQUFzQixTQUFTLENBQzNCLE1BQWUsRUFDZixVQUF1QixFQUN2QixHQUFZOztRQUlaLElBQUksR0FBRyxLQUFLLFNBQVMsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDOUMsTUFBTSxJQUFJLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1NBQ2hGO1FBQ0QsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxTQUFTLEdBQUcsRUFBRSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUNqRDtRQUNELE1BQU0sSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsR0FBRyxTQUFTLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQ3BCLElBQUksR0FBRyxFQUFFO1lBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBUyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM1QztRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztRQUVwRSxNQUFNLGFBQWEsR0FBRyxtQkFBUyxDQUFDLFVBQVUsQ0FBQyxpQkFBTyxDQUFDLE1B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