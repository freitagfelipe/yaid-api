export interface IFetchContentResult {
    count: number;
    urls: string[];
}

export interface IAPIError {
    statusCode: number;
    message: string;
}

export class APIError extends Error implements IAPIError {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;
    }
}

export type IGetFileResult = string;

export type FileType = "jpg" | "mp4";
