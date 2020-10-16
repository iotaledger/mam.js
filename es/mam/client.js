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
const blake2b_1 = require("../crypto/blake2b");
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
        const data = Buffer.alloc(1 + tagLength + mamMessage.payload.length);
        data.writeUInt8(tagLength, 0);
        if (tag) {
            data.write(tag, 1, "ascii");
        }
        data.write(mamMessage.payload, 1 + tagLength, "ascii");
        const indexationPayload = {
            type: 2,
            index: blake2b_1.Blake2b.sum256(Buffer.from(mamMessage.address)).toString("hex"),
            data: data.toString("hex")
        };
        const tips = yield client.tips();
        const message = {
            version: 1,
            parent1MessageId: tips.tip1MessageId,
            parent2MessageId: tips.tip2MessageId,
            payload: indexationPayload,
            nonce: 0
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
        const messagesResponse = yield client.messagesFind(blake2b_1.Blake2b.sum256(Buffer.from(messageAddress)).toString("hex"));
        const messages = [];
        for (const messageId of messagesResponse.messageIds) {
            const message = yield client.message(messageId);
            if (message) {
                messages.push(message);
            }
        }
        return decodeMessages(messages, root, sideKey);
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
                const data = Buffer.from(message.payload.data, "hex");
                // We have a minimum size for the message payload
                if (data.length > 100) {
                    const tagLength = data.readUInt8(0);
                    if (tagLength === 0 || tagLength > 27) {
                        return;
                    }
                    const tag = data.slice(1, 1 + tagLength).toString();
                    const msg = data.slice(1 + tagLength).toString();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbS9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsK0NBQTRDO0FBSTVDLDRDQUFrRDtBQUNsRCx3Q0FBeUM7QUFDekMsd0RBQXFEO0FBQ3JELHFDQUF3QztBQUV4Qzs7Ozs7O0dBTUc7QUFDSCxTQUFzQixTQUFTLENBQzNCLE1BQWUsRUFDZixVQUF1QixFQUN2QixHQUFZOztRQUlaLElBQUksR0FBRyxLQUFLLFNBQVMsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDOUMsTUFBTSxJQUFJLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1NBQ2hGO1FBQ0QsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsU0FBUyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUIsSUFBSSxHQUFHLEVBQUU7WUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV2RCxNQUFNLGlCQUFpQixHQUF1QjtZQUMxQyxJQUFJLEVBQUUsQ0FBQztZQUNQLEtBQUssRUFBRSxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7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