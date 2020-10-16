/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import { auth } from "../auth";
import { HttpStatusCodes } from "../errors/httpStatusCodes";
import { initServices } from "../initServices";
import { IHttpRequest } from "../models/app/IHttpRequest";
import { IHttpResponse } from "../models/app/IHttpResponse";
import { IConfiguration } from "../models/configuration/IConfiguration";
import { routes } from "../routes";
import { cors, executeRoute, findRoute } from "../utils/apiHelper";

/**
 * Handle an incoming REST request.
 * @param req Request The request.
 * @param res Response The response.
 * @returns Nothing
 */
export default async function handler(req: IHttpRequest, res: IHttpResponse): Promise<void> {
    try {
        const config: IConfiguration = require(`../data/config.${process.env.CONFIG_ID}.json`);

        cors(
            req,
            res,
            process.env.CORS_ALLOW_ORIGINS ?? config.allowedDomains,
            process.env.CORS_ALLOW_METHODS,
            process.env.CORS_ALLOW_HEADERS
        );

        if (req.method === "OPTIONS") {
            res.status(HttpStatusCodes.SUCCESS).send("OK");
        } else if (!req.url || !req.method) {
            res.status(HttpStatusCodes.BAD_REQUEST).send("Bad request");
        } else {
            const found = findRoute(routes, req.url.split("?")[0], req.method.toLowerCase());

            if (!found) {
                res.status(HttpStatusCodes.NOT_FOUND).send("Not found");
            } else {
                await initServices(config);
                let hasAuth = true;
                if (!found?.route.skipAuth) {
                    hasAuth = await auth(req, res);
                }
                if (hasAuth) {
                    await executeRoute(
                        req, res, config, found?.route, found?.params, config.verboseLogging);
                }
            }
        }
    } catch (err) {
        console.error(err);
        res.status(HttpStatusCodes.BAD_REQUEST).send("Bad request");
    }
}
