import { rest } from "msw";

export function makeUrl(path: string) {
    return `https://localhost:8080${path}`;
}

const postData = [
    {
        userId: 1,
        id: 1,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "aaaa",
    },
    { userId: 1, id: 2, title: "qui est esse", body: "aaaa" },
    { userId: 1, id: 3, title: "ea molestias quasi exercitationem repellat qui ipsa sit aut", body: "aaaa" },
];

export const handlers = [
    rest.post(makeUrl("/login"), (req, res, ctx) => {
        // Persist user's authentication in the session
        //sessionStorage.setItem("is-authenticated", "true");
        return res(
            // Respond with a 200 status code
            ctx.status(200)
        );
    }),
    rest.get("/user", (req, res, ctx) => {
        // Check if the user is authenticated in this session
        // const isAuthenticated = sessionStorage.getItem("is-authenticated");
        // if (!isAuthenticated) {
        //     // If not authenticated, respond with a 403 error
        //     return res(
        //         ctx.status(403),
        //         ctx.json({
        //             errorMessage: "Not authorized",
        //         })
        //     );
        // }
        // If authenticated, return a mocked user details
        return res(
            ctx.status(200),
            ctx.json({
                username: "admin",
            })
        );
    }),

    // rest.get("https://jsonplaceholder.typicode.com/posts", (req, res, ctx) => {
    //     return res(ctx.status(200), ctx.json(postData), ctx.delay(150));
    // }),
];
