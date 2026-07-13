import { pinoHttp } from "pino-http";
import { logger } from "../utils/logger.js";
import { Request } from "express";

export const httpLogger = pinoHttp({
    logger,
    redact: {
        paths: [
            "req.headers.x-api-key",
            'req.headers.authorization',
            'req.headers.cookie',
            'req.headers["set-cookie"]',
            "postman-token"
        ],
        remove: true
    },
    customProps: (req: Request) => ({
        reqId: (req.ctx.requestId),
        userId: (req.ctx.auth.userId),
        apiKeyId: req.ctx.auth.apiKeyId
    }),

    serializers: {
        req(req) {
        return {
            id: req.id,
            method: req.method,
            url: req.url,
            remoteAddress: req.remoteAddress,
        };
        },
        res(res) {
        return {
            statusCode: res.statusCode,
        };
        },
    }
})