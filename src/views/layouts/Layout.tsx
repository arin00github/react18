import React from "react";

import { Outlet } from "react-router-dom";

import { Aside } from "./Aside";
import { MainBody } from "./MainBody";

export function Layout() {
    return (
        <div id="layout">
            <Aside />
            <MainBody>
                <Outlet />
            </MainBody>
        </div>
    );
}
