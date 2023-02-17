import React, { ReactNode } from "react";

import DeplomacyDetail from "../pages/deplomacy/DetailPage";
import DeplomacyListPage from "../pages/deplomacy/ListPage";
import GridPage from "../pages/grid/GridPage";
import MainPage from "../pages/main/MainPage";
import Page03 from "../pages/page03/Page03";
import Page04 from "../pages/page04/Page04";
import MyCartPage from "../pages/shopping/MyCart";
import Shopping01 from "../pages/shopping/Shopping01";
import Shopping02 from "../pages/shopping/Shopping02";
import WorldPage from "../pages/worldMap/WorldIndex";

type subMenuProps = {
    title: string;
    href: string;
    component: ReactNode;
};

type MenuProps = {
    title: string;
    href: string;

    isLeftMenu: boolean;
    children?: subMenuProps[];
};

export const BasicMenu: MenuProps[] = [
    { title: "world", href: "/", isLeftMenu: true },
    { title: "deplomacy Detail", href: "deplomacy/:detail", isLeftMenu: false },
    {
        title: "deplomacy",
        href: "deplomacy",
        isLeftMenu: true,
    },
];
