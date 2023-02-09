import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchPost } from "../../redux/post/post.slice";
import { CustomButton } from "../../style";

export const AccountDisplay = () => {
    const dispatch = useAppDispatch();
    const accountInfo = useAppSelector((state) => state.account);
    const storedPost = useAppSelector((state) => state.post);

    return (
        <div>
            <CustomButton
                role="button"
                name="Fetch Post"
                onClick={() => {
                    dispatch(fetchPost());
                }}
            >
                Fetch Post
            </CustomButton>
            {storedPost.status === "loading" && <div>loading.....</div>}
            {storedPost.posts && (
                <div aria-label="post-box">
                    {storedPost.posts.map((post) => {
                        return <div key={`post_${post.id}`}>{post.title}</div>;
                    })}
                </div>
            )}
            <div>{accountInfo.account.account_name}</div>
        </div>
    );
};
