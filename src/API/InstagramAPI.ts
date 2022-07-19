import { igApi, getCookie } from "insta-fetcher";
import { existsSync, writeFileSync, readFileSync } from "fs";

export class InstagramAPI {
    private static API: igApi;
    private static instanciated: boolean = false;
    private static asyncHandler: Promise<igApi>;

    public constructor() {
        if (!InstagramAPI.instanciated) {
            InstagramAPI.instanciated = true;

            InstagramAPI.asyncHandler = new Promise(async (resolve) => {
                const cookies: string = await this.getCookies();

                InstagramAPI.API = new igApi(cookies);

                resolve(InstagramAPI.API);
            });
        }
    }

    public async getAPI(): Promise<igApi> {
        return await InstagramAPI.asyncHandler;
    }

    private storeCookie(cookies: string): void {
        writeFileSync("cookies.txt", cookies);
    }

    private async getCookies(): Promise<string> {
        if (existsSync("cookies.txt")) {
            return readFileSync("cookies.txt", "utf-8");
        }

        const cookies: string = (await getCookie(
            process.env.LOGIN!,
            process.env.PASSWORD!
        )) as string;

        this.storeCookie(cookies);

        return cookies;
    }
}