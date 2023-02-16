import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom";

import { updateIsLogin } from "./redux/account/account.slice";
import { useAppDispatch } from "./redux/hook";
import { putCountryList } from "./redux/world/world.slice";
import { NewDeplomacyApi } from "./service/api/DeplomacyApi";
import { ICountryObject } from "./types/deplomacy-interface";
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
                <Route path={menu.href} element={menu.component} key={`router_menu_${menu.title}`}>
                    {menu.children &&
                        menu.children.map((submenu) => <Route path={submenu.href} element={submenu.component} />)}
                </Route>
            ))}
            <Route path="*" element={<NoMatch />} />
        </Route>
        {/* <Route path="/" element={<OpenLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NoMatch />} />
        </Route> */}
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
    const dispatch = useAppDispatch();

    const CountryListAPI = async (): Promise<ICountryObject[]> => {
        const response = await axios({
            method: "GET",
            url: "https://restcountries.com/v3.1/all",
        });
        return new Promise((resolve, reject) => {
            if (response.status === 200) {
                resolve(response.data);
            } else {
                reject(response.statusText);
            }
        });
    };

    const updateCountryList = useCallback(async () => {
        const getList = await CountryListAPI();
        if (getList) {
            dispatch(putCountryList(getList));
        }
    }, [dispatch]);

    useEffect(() => {
        updateCountryList();
    }, [updateCountryList]);

    return <RouterProvider router={router} />;
}

export default App;
