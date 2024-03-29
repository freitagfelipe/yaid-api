import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { auth } from "./src/middlewares/auth.middleware";
import { router as fetchPost } from "./src/routes/fetchPost.route";
import { router as fetchStories } from "./src/routes/fetchStories.route";
import { APIError } from "./src/types/types";

const app = express();
const port: number = (process.env.PORT as unknown as number) || 3000;

app.get("/", (_req: Request, res: Response) => {
    res.json({
        message: "ok",
    });
});

app.use(auth);

app.use("/fetch-post", fetchPost);

app.use("/fetch-stories", fetchStories);

app.use((err: APIError, _req: Request, res: Response, _next: NextFunction) => {
    const { statusCode, message } = err;

    res.status(statusCode).json({ message });
});

app.listen(port, () => {
    console.log(`Listening the port ${port}`);
});
