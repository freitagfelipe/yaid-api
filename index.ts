import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { router as fetchPost } from "./src/routes/fetchPost.route";
import { router as fetchStories } from "./src/routes/fetchStories.route";
import { router as getContent } from "./src/routes/getContent.route";
import { APIError, IAPIError } from "./src/types/types";

const app = express();
const port: number = process.env.PORT as unknown as number;

app.use(
    cors({
        origin(requestOrigin, callback) {
            if (
                requestOrigin === process.env.CORS_BOT! ||
                requestOrigin === process.env.CORS_WEB!
            ) {
                callback(null, true);
            } else {
                callback(new APIError("CORS not allowed", 401));
            }
        },
    })
);

app.get("/", (_req: Request, res: Response) => {
    res.json({
        message: "ok",
    });
});

app.use("/fetch-post", fetchPost);

app.use("/fetch-stories", fetchStories);

app.use("/get-content", getContent);

app.use((err: IAPIError, _req: Request, res: Response, _next: NextFunction) => {
    const { statusCode, message } = err;

    res.status(statusCode).json({ message });
});

app.listen(port, () => {
    console.log(`Listening the port ${port}`);
});
