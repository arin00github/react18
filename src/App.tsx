import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom";

import { updateIsLogin } from "./redux/account/account.slice";
import { useAppDispatch } from "./redux/hook";
import { putCountryList } from "./redux/world/world.slice";
import { ICountryList, ICountryObject } from "./types/deplomacy-interface";
import { FloatPageLayout } from "./views/layouts/FloatPageLayout";
import { LayoutWrap } from "./views/layouts/LayoutWrap";
import { OpenLayout } from "./views/layouts/OpenLayout";
import DeplomacyDetail from "./views/pages/deplomacy/DetailPage";
import DeplomacyListPage from "./views/pages/deplomacy/ListPage";
import LoginPage from "./views/pages/login/LoginPage";

export const NoMatch = () => {
    return <h3>no match</h3>;
};

export const routerFrame = createRoutesFromElements(
    <>
        <Route path="/" element={<LayoutWrap />}>
            {/* {BasicMenu.map((menu) => (
                <Route path={menu.href} element={menu.component} key={`router_menu_${menu.title}`}>
                    {menu.children &&
                        menu.children.map((submenu) => <Route path={submenu.href} element={submenu.component} />)}
                </Route>
            ))} */}
            <Route path="deplomacy" element={<DeplomacyListPage />} />
            <Route path="deplomacy/:detail" element={<DeplomacyDetail />} />

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
            <Route path="/" element={<LayoutWrap />}>
                {/* {BasicMenu.map((menu) => (
                    <Route path={menu.href} element={menu.component} key={`router_menu_${menu.title}`} />
                ))} */}
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

    const CountryListAPI = async (): Promise<ICountryList[]> => {
        const response = await axios({
            method: "GET",
            url: "https://countriesnow.space/api/v0.1/countries/iso",
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
