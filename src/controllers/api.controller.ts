import { NextFunction, Request, Response } from "express";
import { getLinks } from "../services/api.service";
import { APIError } from "../types/types";

export async function get(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        res.json(await getLinks(req.query.url!.toString()));
    } catch (error) {
        const errorString: string = String(error);

        if (errorString.includes("404")) {
            next({
                statusCode: 404,
                message: "Post not found",
            } as APIError);

            return;
        }

        console.error(`Error while fetching the post: ${error}`);

        next({
            statusCode: 500,
            message: "Something went wrong",
        } as APIError);
    }
}