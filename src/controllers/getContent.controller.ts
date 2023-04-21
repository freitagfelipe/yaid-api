import { NextFunction, Request, Response } from "express";
import { IAPIError } from "../types/types";
import { getFile } from "../services/getFile.service";
import { removeFile } from "../services/removeFile.service";
import { resolve } from "path";

export async function get(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const filePath = await getFile(req.query.url as string);

        const deleteTimeout = setTimeout(() => {
            removeFile(filePath);
        }, 300000);

        res.status(200).download(resolve(filePath), (err) => {
            if (err) {
                console.log(
                    `Something went wrong while sending the file ${err}`
                );
            } else {
                clearTimeout(deleteTimeout);

                removeFile(filePath);
            }
        });
    } catch (error) {
        console.log(
            `Something went wrong while trying to get the file ${error}.`
        );

        next({
            statusCode: 500,
            message: "Something went wrong",
        } as IAPIError);
    }
}
