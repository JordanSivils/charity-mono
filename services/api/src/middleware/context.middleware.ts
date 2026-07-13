import { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";

export const contextMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    req.ctx = {
        requestId: randomUUID(),
        auth: {}
    }
    next()
}