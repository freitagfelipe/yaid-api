import { InstagramAPI } from "../API/InstagramAPI";
import { IGStoriesMetadata } from "insta-fetcher/dist/types";
import { Result } from "../types/types";
import { igApi } from "insta-fetcher";

export async function getLinks(url: string): Promise<Result> {
    const api: igApi = await new InstagramAPI().API;

    let posts: IGStoriesMetadata;

    try {
        posts = await api.fetchStories(url);
    } catch (error) {
        throw error;
    }

    let links: string[] = [];

    for (const link of posts.stories) {
        links.push(link.url);
    }

    return {
        count: posts.stories_count,
        urls: links,
    };
}
