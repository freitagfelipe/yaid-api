# YAID API

- This API was made to help [YAID bot](https://www.github.com/freitagfelipe/yaid), a Telegram bot created by me and [YAID web](https://www.github.com/freitagfelipe/yaid-web) and it is only used as a way of obtaining real links of Instagram posts and stories.

## How this API was made

- This API is written in [TypeScript](https://www.typescriptlang.org/), using [express](https://www.npmjs.com/package/express) and these other libraries:
    - [axios](https://www.npmjs.com/package/axios)
    - [cors](https://www.npmjs.com/package/cors)
    - [dotenv](https://www.npmjs.com/package/dotenv)
    - [insta-fetcher](https://www.npmjs.com/package/insta-fetcher)

## How it was implemented

- This API listen to the PORT specified in the .env file and have three main routes that only accept GET requests:
    - fetch-post
    - fetch-stories
    - get-content (only for the website)
- First, to hit one of these three routes the request pass by an auth middleware that checks if the CORS is acceptable.
- But before the request hits the respective GET controller, it will pass by a validator middleware that checks if:
    1. The request has an url, for fetch-post or get-content requests or user in the query for fetch-stories
    1. Checks, by using a regex, if the url is valid (only for fetch-post requests)
- Now finally for fetch-post and fetch-stories the specific GET controller will execute by using the respective service that utilizes the InstagramAPI class, which applies the ideas from the monostate and [ObjectReadiness](https://pdconsec.net/blogs/devnull/asynchronous-constructor-design-pattern) design patterns to get the requested content. If everything works fine, it will return a 200 response with a JSON that contains an Result object:

```ts
interface Result {
    count: number;
    urls: string[];
}
```

- Now for get-content requests the GET controller will try to download and if everything works fine, it will return a 200 response with the file attatched to it.

- But the request can fails for some reasons:
    - If there is a fetch-post request:
        1. Fails with a 404 if the post does not exists or it is from a private account
        1. Fails with 500 if something related to the internal service logic does not work as expected
    - If there is a fetch-stories request:
        1. Fails with a 403 if the profile is private
        1. Fails with a 404 if the service does not find the user or the user did not post any stories
        1. Fails with 500 if something related to the internal service logic does not work as expected
    - If there is a get-content request:
        1. Fails with 500 if something related to the internal service logic does not work as expected

## Acknowledgments

- [Antonio Lucas](https://github.com/antoniolucas30) for the README typo review!
- [Antônio Hugo](https://github.com/hugorplobo) for the idea of use a monostate pattern in the InstagramAPI class!