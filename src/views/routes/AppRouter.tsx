import React from "react";

import {
    BrowserRouter,
    Route,
    Routes,
    redirect,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import { useAppSelector } from "../../redux/hook";
import { Layout } from "../layouts/Layout";
import { BasicMenu } from "../layouts/menuRouter";
import LoginPage from "../pages/login/LoginPage";

export const NoMatch = () => {
    return <h3>no match</h3>;
};

const AppRouter = () => {
    const isAuthenticated = useAppSelector((state) => state.account.isLogin);

    if (!isAuthenticated) {
        if (window.location.pathname === "/") {
            redirect("/login");
        }
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />}>
                {BasicMenu.map((menu) => (
                    <Route path={menu.href} element={menu.component} />
                ))}
                <Route path="*" element={<NoMatch />} />
            </Route>
        )
    );

    return (
        <main>
            <BrowserRouter>
                <Routes>
                    {isAuthenticated ? (
                        <Route path="/" element={<Layout />}>
                            {BasicMenu.map((menu) => (
                                <Route path={menu.href} element={menu.component} />
                            ))}
                            <Route path="*" element={<NoMatch />} />
                        </Route>
                    ) : (
                        <>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="*" element={<NoMatch />} />
                        </>
                    )}
                </Routes>
            </BrowserRouter>
        </main>
    );
};

export default AppRouter;
