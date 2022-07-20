import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { auth } from "./src/middlewares/auth.middleware";
import { router } from "./src/routes/api.route";
import { APIError } from "./src/types/types";

const app = express();
const port: number = (process.env.PORT as unknown as number) || 3000;

app.get("/", (_req: Request, res: Response) => {
    res.json({
        message: "ok",
    });
});

app.use(auth);

app.use("/fetch-post", router);

app.use((err: APIError, _req: Request, res: Response, _next: NextFunction) => {
    const { statusCode, message } = err;

    res.status(statusCode).json({ message });
});

app.listen(port, () => {
    console.log(`Listen to the port ${port}`);
});
