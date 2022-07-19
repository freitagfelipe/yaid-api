import { NextFunction, Request, Response } from "express";
import { APIError } from "../types/types";

export function auth(req: Request, _res: Response, next: NextFunction): void {
    if (req.get("TOKEN") === undefined) {
        return next({
            statusCode: 400,
            message: "No token provided",
        } as APIError);
    } else if (req.get("TOKEN") != process.env.TOKEN) {
        return next({
            statusCode: 401,
            message: "Invalid token",
        } as APIError);
    }

    next();
}
