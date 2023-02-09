import React from "react";

import { Route, Routes } from "react-router-dom";

import { Layout } from "../layouts/Layout";
import { BasicMenu } from "../layouts/menuRouter";

export const NoMatch = () => {
    return <h3>no match</h3>;
};

const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {BasicMenu.map((menu) => (
                        <Route path={menu.href} element={menu.component} />
                    ))}
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </div>
    );
};

export default AppRouter;
