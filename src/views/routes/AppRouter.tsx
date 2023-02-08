import React from "react";

import { Route, Routes } from "react-router-dom";

import { Layout } from "../layouts/Layout";
import Page01 from "../pages/home/Page01";
import Page02 from "../pages/page02/Page02";
import Page03 from "../pages/page03/Page03";
import Page04 from "../pages/page04/Page04";
import Shopping01 from "../pages/shopping/Shopping01";
import Shopping02 from "../pages/shopping/Shopping02";

export const NoMatch = () => {
    return <h3>no match</h3>;
};

const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Page01 />} />
                    <Route path="/page02" element={<Page02 />} />
                    <Route path="/page03" element={<Page03 />} />
                    <Route path="/page04" element={<Page04 />} />
                    <Route path="/shopping01" element={<Shopping01 />} />
                    <Route path="/shopping02" element={<Shopping02 />} />
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </div>
    );
};

export default AppRouter;
