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
            const message = errorString.includes("not available")
                ? "The user hasn't posted any stories today"
                : "Private profile";
            const statusCode = errorString.includes("not available")
                ? 404
                : 403;

            return next({
                statusCode,
                message,
            } as APIError);
        }

        console.error(`Error while fetching the user stories: ${error}`);

        next({
            statusCode: 500,
            message: "Something went wrong",
        } as APIError);
    }
}
