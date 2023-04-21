import { FileType, IGetFileResult } from "../types/types";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import axios from "axios";

export async function getFile(url: string): Promise<IGetFileResult> {
    try {
        const response = await axios.get(url, {
            responseType: "arraybuffer",
        });

        if (response.status !== 200) {
            throw new Error("No success status code");
        }

        if (!existsSync("./download/")) {
            mkdirSync("./download/");
        }

        const type: FileType = url.includes("jpg") ? "jpg" : "mp4";
        const path = `./download/${new URL(url).pathname
            .split("/")
            .at(-1)}${Date.now()}.${type}`;

        writeFileSync(path, response.data);

        return path;
    } catch (error) {
        throw error;
    }
}
