import React, { useEffect, useState } from "react";

import { JsonUser } from "../../../types/common";
import { AccountDisplay } from "../../components/AccounDisplay";
import { PostDisplay } from "../../components/PostDisplay";
import { PageTitle } from "../../layouts/PageTitle";

const Page04 = () => {
    // const [posts, setPosts] = useState<JsonUser[] | null>(null);

    return (
        <div>
            <PageTitle title="Page04" />
            <div>
                {/* <PostDisplay /> */}
                <AccountDisplay />
            </div>
        </div>
    );
};

export default Page04;
