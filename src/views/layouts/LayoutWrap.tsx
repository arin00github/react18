import React, { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import WorldPage from "../pages/worldMap/WorldPage";

import { Aside } from "./Aside";

export function LayoutWrap() {
    // const isAuthenticated = useAppSelector((state) => state.account.isLogin);

    //const navigator = useNavigate();

    // useEffect(() => {
    //     navigator("/world-map");
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <div id="layout">
            <Aside />
            <WorldPage>
                <Outlet />
            </WorldPage>
        </div>
    );
}
