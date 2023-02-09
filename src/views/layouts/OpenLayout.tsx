import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../../redux/hook";

export function OpenLayout() {
    const isAuthenticated = useAppSelector((state) => state.account.isLogin);

    if (isAuthenticated) {
        return <Navigate to="page02" />;
    }

    return (
        <div id="layout">
            <Outlet />
        </div>
    );
}
