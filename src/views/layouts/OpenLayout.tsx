import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";

import { useAppSelector } from "../../redux/hook";

const LayoutContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export function OpenLayout() {
    const isAuthenticated = useAppSelector((state) => state.account.isLogin);

    if (isAuthenticated) {
        return <Navigate to="main" />;
    }

    return (
        <LayoutContainer>
            <Outlet />
        </LayoutContainer>
    );
}
