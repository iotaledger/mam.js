import { readFileSync } from "fs";
import path from "path";
import { IResponse } from "./models/api/IResponse";
import { IRoute } from "./models/app/IRoute";

export const routes: IRoute[] = [
    {
        path: "/",
        method: "get",
        inline: async () => {
            // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
            const packageJson = require("../package.json");
            return {
                name: packageJson.name,
                version: packageJson.version
            } as IResponse;
        }
    },
    { path: "/v0/publish", method: "post", folder: "v0", func: "publish" },
    { path: "/v0/fetch", method: "get", folder: "v0", func: "fetch" },
    {
        path: "/docs", method: "get", dataResponse: true, inline: async () => ({
                data: readFileSync(path.join(__dirname, "docs", "index.html")),
                inline: true,
                contentType: "text/html"
            } as IResponse)
    }
];
