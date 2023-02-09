import React, { useState } from "react";

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    createMemoryRouter,
} from "react-router-dom";

import { BasicMenu } from "./views/layouts/menuRouter";
import { OpenLayout } from "./views/layouts/OpenLayout";
import { ProtectedLayout } from "./views/layouts/ProtectedLayout";
import LoginPage from "./views/pages/login/LoginPage";

export const NoMatch = () => {
    return <h3>no match</h3>;
};

const routerFrame = createRoutesFromElements(
    <>
        <Route path="/" element={<ProtectedLayout />}>
            {BasicMenu.map((menu) => (
                <Route path={menu.href} element={menu.component} key={`router_menu_${menu.title}`} />
            ))}
            <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="/" element={<OpenLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NoMatch />} />
        </Route>
    </>
);

const router = process.env.NODE_ENV === "test" ? createMemoryRouter(routerFrame) : createBrowserRouter(routerFrame);

function App() {
    return <RouterProvider router={router} />;
}
export default App;
