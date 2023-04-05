import React, { useEffect } from "react";

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom";

import { updateIsLogin } from "./redux/account/account.slice";
import { useAppDispatch } from "./redux/hook";
import { Layout } from "./views/layouts/Layout";
import { BasicMenu } from "./views/layouts/MenuRoutes";

export const NoMatch = () => {
    return <h3>no match</h3>;
};

export const routerFrame = createRoutesFromElements(
    <>
        <Route path="/" element={<Layout />}>
            {BasicMenu.map((menu) => (
                <Route path={menu.href} element={menu.component} key={`router_menu_${menu.title}`}>
                    {menu.children &&
                        menu.children.map((submenu) => <Route path={submenu.href} element={submenu.component} />)}
                </Route>
            ))}
            <Route path="*" element={<NoMatch />} />
        </Route>
    </>
);

const router = createBrowserRouter(routerFrame);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
