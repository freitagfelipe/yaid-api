import { NextFunction, Request, Response } from "express";
import { getLinks } from "../services/fetchPost.service";
import { APIError } from "../types/types";

export async function get(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        res.status(200).json(await getLinks(req.query.url!.toString()));
    } catch (error) {
        const errorString: string = String(error);

        if (errorString.includes("404")) {
            return next({
                statusCode: 404,
                message: "Post not found or from a private account",
            } as APIError);
        }

        console.error(`Error while fetching the post: ${error}`);

        next({
            statusCode: 500,
            message: "Something went wrong",
        } as APIError);
    }
}
