import { InstagramAPI } from "../API/InstagramAPI";
import { IPostModels } from "insta-fetcher/dist/types";
import { IFetchContentResult } from "../types/types";
import { igApi } from "insta-fetcher";

export async function getLinks(url: string): Promise<IFetchContentResult> {
    const api: igApi = await new InstagramAPI().API;

    let posts: IPostModels;

    try {
        posts = await api.fetchPost(url);
    } catch (error) {
        throw error;
    }

    let links: string[] = [];

    for (const link of posts.links) {
        links.push(link.url);
    }

    return {
        count: posts.media_count,
        urls: links,
    };
}
