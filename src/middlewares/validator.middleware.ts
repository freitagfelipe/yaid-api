import { APIError } from "../types/types";
import { NextFunction, Request, Response } from "express";

export function validator(
    req: Request,
    _res: Response,
    next: NextFunction
): void {
    const isFetchPost = req.baseUrl.includes("fetch-post");
    const { url, user } = req.query;

    if ((isFetchPost && !url) || (!isFetchPost && !user)) {
        return next({
            statusCode: 400,
            message: `No ${isFetchPost ? "url" : "user"} provided`,
        } as APIError);
    } else if (
        isFetchPost &&
        !/(https:\/\/)?www.instagram.com\/(p|reel|tv)/.test(url as string)
    ) {
        return next({
            statusCode: 406,
            message: "Invalid url",
        } as APIError);
    }

    next();
}
