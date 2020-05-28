import { readFileSync } from "fs";
import { join } from "path";
import { IRoute } from "./models/app/IRoute";

export const routes: IRoute[] = [
    {
        path: "/",
        method: "get",
        inline: async () => {
            // tslint:disable-next-line: no-require-imports
            const packageJson = require("../package.json");
            return {
                name: packageJson.name,
                version: packageJson.version
            };
        }
    },
    { path: "/v0/publish", method: "post", folder: "v0", func: "publish" },
    { path: "/v0/fetch", method: "get", folder: "v0", func: "fetch" },
    {
        path: "/docs", method: "get", dataResponse: true, inline: async () => {
            return {
                success: true,
                data: readFileSync(join(__dirname, "docs", "index.html")),
                inline: true,
                contentType: "text/html"
            };
        }
    }
];
