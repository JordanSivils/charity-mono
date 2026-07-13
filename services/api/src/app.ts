import express from "express";
import { contextMiddleware } from "./middleware/context.middleware.js";
import "dotenv/config"
import { requireApiKey } from "./middleware/require-api-key.middleware.js";
import { httpLogger } from "./middleware/pino-http.middleware.js";
import { handleError } from "./middleware/error-handler.middleware.js";
import nearbyRouter from "./api/nearby/nearby.routes.js"
import charityRouter from "./api/charity/charity.routes.js"
import metaDataRouter from "./api/meta-data/meta-data.routes.js"
import docsRouter from "./api/docs/docs.route.js"
import helmet from "helmet";
import cors from "cors";

const app = express()

app.disable("x-powered-by");
app.use(helmet({
    crossOriginResourcePolicy: false
}));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-API-Key"],
    exposedHeaders: ["X-RateLimit-Limit", "X-RateLimit-Remaining", "X-RateLimit-Reset"],
    credentials: false,
    maxAge: 86400,
  })
);

app.get("/health", (_req: express.Request, res: express.Response) => res.status(200).send("ok"))


app.use("/docs", docsRouter)

app.use(contextMiddleware);

app.use(httpLogger)

app.use(requireApiKey);


app.use("/metadata", metaDataRouter);
app.use(nearbyRouter);
app.use(charityRouter);


app.use(handleError)


export default app