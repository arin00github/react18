import React, { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import { useAppSelector } from "../../redux/hook";

import { Aside } from "./Aside";
import { MainBody } from "./MainBody";

type ProtectedLayoutProps = {
    userAuth?: boolean;
};

export function ProtectedLayout({ userAuth }: ProtectedLayoutProps) {
    // const isAuthenticated = useAppSelector((state) => state.account.isLogin);

    // const navigator = useNavigate();

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         navigator("/login");
    //     }
    // }, [isAuthenticated, navigator]);

    return (
        <div id="layout">
            <Aside />
            <MainBody>
                <Outlet />
            </MainBody>
        </div>
    );
}
