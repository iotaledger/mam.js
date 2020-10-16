import { IHttpRequest } from "./models/app/IHttpRequest";
import { IHttpResponse } from "./models/app/IHttpResponse";

/**
 * Perform authorization
 * @param req The request.
 * @param res The response.
 * @returns True if the auth was successful.
 */
export async function auth(req: IHttpRequest, res: IHttpResponse): Promise<boolean> {
    return true;
}
