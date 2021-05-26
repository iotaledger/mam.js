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
// Copyright 2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
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
 * @param client The client or node endpoint to use for fetching.
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
 * @param client The client or node endpoint to use for fetching.
 * @param root The root within the mam channel to fetch the message.
 * @param mode The mode to use for fetching.
 * @param sideKey The sideKey if mode is restricted.
 * @param limit Limit the number of messages retrieved.
 * @returns The array of retrieved messages.
 */
function mamFetchAll(client, root, mode, sideKey, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const localClient = typeof client === "string" ? new iota_js_1.SingleNodeClient(client) : client;
        guards_1.validateModeKey(mode, sideKey);
        const localLimit = limit === undefined ? Number.MAX_VALUE : limit;
        const messages = [];
        let fetchRoot = root;
        do {
            const fetched = yield mamFetch(localClient, fetchRoot, mode, sideKey);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QywyQ0FBd0o7QUFJeEosNENBQWtEO0FBQ2xELHdDQUF5QztBQUN6Qyx3REFBcUQ7QUFDckQscUNBQXdDO0FBRXhDOzs7Ozs7R0FNRztBQUNILFNBQXNCLFNBQVMsQ0FDM0IsTUFBd0IsRUFDeEIsVUFBdUIsRUFDdkIsR0FBWTs7UUFJWixJQUFJLEdBQUcsS0FBSyxTQUFTLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQzlDLE1BQU0sSUFBSSxLQUFLLENBQUMsMkRBQTJELENBQUMsQ0FBQztTQUNoRjtRQUNELE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksU0FBUyxHQUFHLEVBQUUsRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7U0FDakQ7UUFFRCxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLDJCQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDakUsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekQsTUFBTSxVQUFVLEdBQUcsMkJBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRS9ELE1BQU0sSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsR0FBRyxlQUFlLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxl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