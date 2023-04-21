import { rmSync, existsSync } from "fs";

export async function removeFile(path: string) {
    if (existsSync(path)) {
        rmSync(path);
    }
}
