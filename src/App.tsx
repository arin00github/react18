import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import { useAppDispatch } from "./redux/hook";
import { putCountryList } from "./redux/world/world.slice";
import { ICountryList, ICountryObject } from "./types/deplomacy-interface";
import { LayoutWrap } from "./views/layouts/LayoutWrap";
import ArchivePage from "./views/pages/archive/ArchivePage";
import DeplomacyDetail from "./views/pages/deplomacy/DetailPage";
import DeplomacyListPage from "./views/pages/deplomacy/ListPage";

export const NoMatch = () => {
    return <h3>no match</h3>;
};

export const routerFrame = createRoutesFromElements(
    <Route>
        <Route path="/" element={<LayoutWrap />}>
            <Route path="archive" element={<ArchivePage />} />
            <Route path="deplomacy" element={<DeplomacyListPage />} />
            <Route path="deplomacy/:detail" element={<DeplomacyDetail />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
    </Route>
);

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
