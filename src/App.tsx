import React, { useEffect, useState } from "react";

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    createMemoryRouter,
    MemoryRouter,
    Routes,
} from "react-router-dom";

import { updateIsLogin } from "./redux/account/account.slice";
import { useAppDispatch } from "./redux/hook";
import { BasicMenu } from "./views/layouts/menuRouter";
import { OpenLayout } from "./views/layouts/OpenLayout";
import { ProtectedLayout } from "./views/layouts/ProtectedLayout";
import LoginPage from "./views/pages/login/LoginPage";

export const NoMatch = () => {
    return <h3>no match</h3>;
};

export const routerFrame = createRoutesFromElements(
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

type RouterConProps = {
    userAuth: boolean;
};

export const RouterContainer = ({ userAuth }: RouterConProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userAuth) {
            dispatch(updateIsLogin(true));
        }
    }, [dispatch, userAuth]);
    return (
        <Routes>
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
        </Routes>
    );
};

const router = createBrowserRouter(routerFrame);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
