import { SingleNodeClient } from "@iota/iota.js";
import { createChannel, createMessage, mamAttach, TrytesHelper } from "@iota/mam-chrysalis.js";
import { IPublishRequest } from "../../models/api/v0/IPublishRequest";
import { IPublishResponse } from "../../models/api/v0/IPublishResponse";
import { IConfiguration } from "../../models/configuration/IConfiguration";
import { ValidationHelper } from "../../utils/validationHelper";

/**
 * Publish a MAM message.
 * @param config The configuration.
 * @param request The request object.
 * @returns The response.
 */
export async function publish(config: IConfiguration, request: IPublishRequest): Promise<IPublishResponse> {
    ValidationHelper.string("provider", request.provider);

    if (request.provider !== "devnet" &&
        request.provider !== "mainnet" &&
        !request.provider.startsWith("http")) {
        throw new Error("The provider must be either mainnet, devnet or the url for a node starting http/https.");
    }

    if (request.provider.startsWith("http")) {
        if (request.depth === undefined || request.depth === null) {
            throw new Error("The depth must be provided if you are using a url for provider.");
        }
        ValidationHelper.number("depth", request.depth);

        if (request.mwm === undefined || request.mwm === null) {
            throw new Error("The mwm must be provided if you are using a url for provider.");
        }
        ValidationHelper.number("mwm", request.mwm);
    }

    ValidationHelper.oneOf("mode", request.mode, ["public", "private", "restricted"]);

    if (request.mode === "restricted") {
        ValidationHelper.string("key", request.key);
    } else if (request.key) {
        throw new Error("The key is only used in restricted mode.");
    }

    ValidationHelper.string("seed", request.seed);
    if (!TrytesHelper.isHash(request.seed)) {
        throw new Error(
            `The seed field must only contain trytes, and be 81 characters long, its is ${request.seed.length}.`);
    }

    if (request.index !== undefined && request.index !== null) {
        ValidationHelper.number("index", request.index);
    }

    ValidationHelper.oneOf("dataType", request.dataType, ["trytes", "text", "json"]);
    ValidationHelper.isEmpty("data", request.data);

    if (request.dataType === "trytes" && !TrytesHelper.isTrytes(request.data as string)) {
        throw new Error("The data field must only contain trytes.");
    }

    if (request.tag && !TrytesHelper.isTag(request.tag)) {
        throw new Error("The tag field must only contain trytes.");
    }

    const client = new SingleNodeClient(
        request.provider.startsWith("http") ? request.provider : config.nodes[request.provider]
    );

    const channelState = createChannel(request.seed, 2, request.mode, request.key);

    if (request.index !== undefined && request.index !== null) {
        channelState.start = request.index;
    }

    let data;
    if (request.dataType === "json") {
        data = TrytesHelper.objectToTrytes(request.data);
    } else if (request.dataType === "text") {
        data = TrytesHelper.stringToTrytes(request.data as string);
    } else {
        data = request.data;
    }

    const mamMessage = createMessage(channelState, data);

    await mamAttach(client, mamMessage, request.tag);

    return {
        nextIndex: channelState.start,
        publishedRoot: mamMessage.root
    };
}
