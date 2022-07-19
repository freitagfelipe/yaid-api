import { APIError } from "../types/types";
import { NextFunction, Request, Response } from "express";

export function validator(
    req: Request,
    _res: Response,
    next: NextFunction
): void {
    const { url } = req.query;

    if (url === undefined) {
        return next({
            statusCode: 400,
            message: "No url provided",
        } as APIError);
    } else if (!url.toString().startsWith("https://www.instagram.com")) {
        return next({
            statusCode: 400,
            message: "Invalid url",
        } as APIError);
    }

    next();
}
