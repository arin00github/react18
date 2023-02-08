import React, { useEffect } from "react";

import { useGetPostsQuery } from "../../redux/api/api.slice";
import { JsonPost } from "../../types/common";

import { Spinner } from "./Spinner";

export const PostDisplay = () => {
    const { data: posts, isSuccess, isError, error, isLoading } = useGetPostsQuery({});

    let content;

    if (isLoading) {
        content = <Spinner />;
    } else if (isSuccess) {
        content = posts.map((post: JsonPost) => <div key={`post_${post.id}`}>{post.title}</div>);
    } else if (isError) {
        content = <div>{error.toString()}</div>;
    }

    return <section>{content}</section>;
};
