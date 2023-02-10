import React, { ReactNode } from "react";

import DeplomacyDetail from "../pages/deplomacy/DetailPage";
import DeplomacyListPage from "../pages/deplomacy/ListPage";
import MainPage from "../pages/main/MainPage";
import Page03 from "../pages/page03/Page03";
import Page04 from "../pages/page04/Page04";
import MyCartPage from "../pages/shopping/MyCart";
import Shopping01 from "../pages/shopping/Shopping01";
import Shopping02 from "../pages/shopping/Shopping02";

type subMenuProps = {
    title: string;
    href: string;
    component: ReactNode;
};

type MenuProps = {
    title: string;
    href: string;
    component: ReactNode;
    children?: subMenuProps[];
};

export const BasicMenu: MenuProps[] = [
    { title: "main", href: "/main", component: <MainPage /> },
    { title: "page03", href: "/page03", component: <Page03 /> },
    { title: "page04", href: "/page04", component: <Page04 /> },
    { title: "shopping01", href: "/shopping01", component: <Shopping01 /> },
    { title: "shopping02", href: "/shopping02", component: <Shopping02 /> },
    { title: "mycart", href: "/mycart", component: <MyCartPage /> },
    {
        title: "deplomacy",
        href: "/deplomacy",
        component: <DeplomacyListPage />,
        children: [{ title: "deplomacy Detail", href: ":country_eng_nm", component: <DeplomacyDetail /> }],
    },
    { title: "deplomacy Detail", href: "/deplomacy/:country_eng_nm", component: <DeplomacyDetail /> },
];
