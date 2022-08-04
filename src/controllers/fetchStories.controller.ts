import { NextFunction, Request, Response } from "express";
import { getLinks } from "../services/fetchStories.service";
import { APIError } from "../types/types";

export async function get(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        res.status(200).json(await getLinks(req.query.user!.toString()));
    } catch (error) {
        const errorString: string = String(error);

        if (errorString.includes("404")) {
            return next({
                statusCode: 404,
                message: "User not found",
            } as APIError);
        } else if (
            errorString.includes("Private profile") ||
            errorString.includes("Stories not available")
        ) {
            return next({
                statusCode: errorString.includes("not available") ? 404 : 403,
                message: errorString.slice(errorString.indexOf(" ") + 1),
            } as APIError);
        }

        console.error(`Error while fetching the user stories: ${error}`);

        next({
            statusCode: 500,
            message: "Something went wrong",
        } as APIError);
    }
}
