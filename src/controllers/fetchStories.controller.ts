import { NextFunction, Request, Response } from "express";
import { getLinks } from "../services/fetchStories.service";
import { IAPIError } from "../types/types";

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
            } as IAPIError);
        } else if (
            errorString.includes("Private profile") ||
            errorString.includes("Stories not available")
        ) {
            const message = errorString.includes("not available")
                ? "The user has not posted any stories today"
                : "Private profile";
            const statusCode = errorString.includes("not available")
                ? 404
                : 403;

            return next({
                statusCode,
                message,
            } as IAPIError);
        }

        console.error(`Error while fetching the user stories: ${error}`);

        next({
            statusCode: 500,
            message: "Something went wrong",
        } as IAPIError);
    }
}
