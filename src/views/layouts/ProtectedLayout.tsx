import React from "react";

import { Outlet, Navigate, useOutlet } from "react-router-dom";

import { useAppSelector } from "../../redux/hook";

import { Aside } from "./Aside";
import { MainBody } from "./MainBody";

export function ProtectedLayout() {
    const isAuthenticated = useAppSelector((state) => state.account.isLogin);

    const outlet = useOutlet();

    if (!isAuthenticated) {
        return <Navigate to="login" />;
    }

    return (
        <div id="layout">
            <Aside />
            <MainBody>{outlet}</MainBody>
        </div>
    );
}
