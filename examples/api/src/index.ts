/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import bodyParser from "body-parser";
import compression from "compression";
import express, { Application } from "express";
import { auth } from "./auth";
import { initServices } from "./initServices";
import { IConfiguration } from "./models/configuration/IConfiguration";
import { routes } from "./routes";
import { cors, executeRoute } from "./utils/apiHelper";

const configId = process.env.CONFIG_ID ?? "local";
const config: IConfiguration = require(`./data/config.${configId}.json`);

const app: Application = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(compression());

app.use((req, res, next) => {
    cors(
        req,
        res,
        config.allowedDomains ? config.allowedDomains.join(",") : undefined);
    next();
});

for (const route of routes) {
    app[route.method](route.path, async (req, res) => {
        let hasAuth = true;
        if (!route.skipAuth) {
            hasAuth = await auth(req, res);
        }
        if (hasAuth) {
            await executeRoute(
                req,
                res,
                config,
                route,
                req.params,
                config.verboseLogging);
        }
    });
}

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 4000;
app.listen(port, async () => {
    console.log(`Started API Server on port ${port}`);
    console.log(`Running Config '${configId}'`);

    try {
        await initServices(config);
    } catch (err) {
        console.error("Failed initializing services", err);
    }
});
