import React, { ReactNode } from "react";

import Page02 from "../pages/page02/Page02";
import Page03 from "../pages/page03/Page03";
import Page04 from "../pages/page04/Page04";
import MyCartPage from "../pages/shopping/MyCart";
import Shopping01 from "../pages/shopping/Shopping01";
import Shopping02 from "../pages/shopping/Shopping02";

type MenuProps = {
    title: string;
    href: string;
    component: ReactNode;
};

export const BasicMenu: MenuProps[] = [
    { title: "home", href: "/", component: <Page02 /> },
    { title: "page02", href: "/page02", component: <Page02 /> },
    { title: "page03", href: "/page03", component: <Page03 /> },
    { title: "page04", href: "/page04", component: <Page04 /> },
    { title: "shopping01", href: "/shopping01", component: <Shopping01 /> },
    { title: "shopping02", href: "/shopping02", component: <Shopping02 /> },
    { title: "mycart", href: "/mycart", component: <MyCartPage /> },
];
