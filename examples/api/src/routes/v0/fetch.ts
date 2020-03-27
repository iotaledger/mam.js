import { composeAPI, LoadBalancerSettings } from "@iota/client-load-balancer";
import { composeAPI as composeAPICore } from "@iota/core";
import { mamFetch } from "@iota/mam.js";
import { isTrytesOfExactLength } from "@iota/validators";
import { HttpError } from "../../errors/httpError";
import { ServiceFactory } from "../../factories/serviceFactory";
import { IFetchRequest } from "../../models/api/v0/IFetchRequest";
import { IFetchResponse } from "../../models/api/v0/IFetchResponse";
import { IConfiguration } from "../../models/configuration/IConfiguration";
import { TrytesHelper } from "../../utils/trytesHelper";
import { ValidationHelper } from "../../utils/validationHelper";

/**
 * Fetch a MAM message.
 * @param config The configuration.
 * @param request The request object.
 * @returns The response.
 */
export async function fetch(config: IConfiguration, request: IFetchRequest): Promise<IFetchResponse> {
    ValidationHelper.string("provider", request.provider);

    if (request.provider !== "devnet" &&
        request.provider !== "mainnet" &&
        !request.provider.startsWith("http")) {
        throw new Error("The provider must be either mainnet, devnet or the url for a node starting http/https.");
    }

    ValidationHelper.oneOf("mode", request.mode, ["public", "private", "restricted"]);

    if (request.mode === "restricted") {
        ValidationHelper.string("key", request.key);
    } else {
        if (request.key) {
            throw new Error("The key is only used in restricted mode.");
        }
    }

    ValidationHelper.string("root", request.root);
    if (!isTrytesOfExactLength(request.root, 81)) {
        throw new Error(`The root field must only contain trytes, and be 81 characters long, its is ${request.root.length}.`);
    }

    ValidationHelper.oneOf("dataType", request.dataType, ["trytes", "text", "json"]);

    let api;

    if (request.provider.startsWith("http")) {
        api = composeAPICore({
            provider: request.provider
        });
    } else {
        const loadBalancerSettings = ServiceFactory.get<LoadBalancerSettings>(
            `${request.provider}-load-balancer-settings`
        );

        api = composeAPI(loadBalancerSettings);
    }

    const response = await mamFetch(api, request.root, request.mode, request.key);

    if (response) {
        let data;
        if (request.dataType === "json") {
            data = TrytesHelper.objectFromTrytes(response.message);
        } else if (request.dataType === "text") {
            data = TrytesHelper.stringFromTrytes(response.message);
        } else {
            data = response.message;
        }

        return {
            success: true,
            message: "OK",
            data,
            nextRoot: response.nextRoot,
            tag: response.tag
        };
    } else {
        throw new HttpError("No data found on root", 404);
    }
}
