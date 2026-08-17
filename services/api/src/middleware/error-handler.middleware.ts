import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "@charity-mono/database/client";
import { logger } from "../utils/logger.js";

export type ErrorCode =
  | "missing_api_key"
  | "invalid_api_key"
  | "rate_limited"
  | "validation_error"
  | "not_found"
  | "internal_error"
  | "invalid_origin_zip"
  | "radius_not_allowed"
  | "limit_not_allowed"
  | "invalid_query"


export class ApiError extends Error {
    statusCode: number;
    code: ErrorCode

    constructor(statusCode: number, code: ErrorCode, message: string) {
        super(message)

        this.statusCode = statusCode
        this.code = code

        Object.setPrototypeOf(this, ApiError.prototype)
    }
}

export const handleError = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
    const reqId = req.ctx.requestId

    if (err instanceof ApiError) {
        logger.warn({ reqId, code: err.code, statusCode: err.statusCode }, "API error");
        const { statusCode, message } = err;
        
        return res.status(statusCode).json({
            code: err.code,
            message,
            reqId
        }) 
    }

    if (err instanceof ZodError) {
        logger.warn({ reqId, code: err.message }, "Validation Error (Zod)")
        return res.status(400).json({
            code: "validation_error",
            message: "Request validation failed.",
            reqId: reqId,
            details: err.issues.map((issue) => ({
                path: issue.path.join(".") || "(root)",
                message: issue.message,
                zodCode: issue.code
            }))
        })
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        req.log.info({ err, reqId}, "(Prisma) DB Request Error")
        if (err.code === "P2003") {
            return res.status(400).json({
                code: "validation_error",
                message: "Invalid related resource.",
                reqId,
            })
        }

            if (err.code === "P2002") {
                return res.status(409).json({
                    code: "validation_error",
                    message: "A resource with that value already exists.",
                    reqId,
                })
            }
        }
    
    if (err instanceof Prisma.PrismaClientValidationError) {
        logger.info({code: "invalid_query", reqId}, "(Prisma) DB Request Error")
        return res.status(400).json({
        code: "invalid_query",
        message: "Invalid database query",
        reqId: reqId
        });
    }

    if (err instanceof Prisma.PrismaClientInitializationError || err instanceof Prisma.PrismaClientRustPanicError) {
        logger.info({code: "invalid_query", reqId}, "(Prisma) DB Request Error")
        console.error(err);
        return res.status(500).json({
            code: "internal_error",
            message: "Database error",
            reqId: reqId
        });
    }

    logger.info({code: "unkown", reqId}, "Unexpected server error")

    return res.status(500).json({
        code: "internal_error",
        message: "Unexpected server error",
        reqId: reqId
    })
}
