import React, { ReactNode } from "react";

// import ChartJsIndexPage from "../pages/chartjs/IndexPage";
// import ChartIndexPage from "../pages/d3/ChartPage";

import GridPage0 from "../pages/grid0/IndexPage";
import GridPage1 from "../pages/grid1/IndexPage";
import GridPage2 from "../pages/grid2/IndexPage";
import MainPage from "../pages/main/MainPage";
import SvgMapPage from "../pages/map/IndexPage";
type subMenuProps = {
    title: string;
    href: string;
    component: ReactNode;
};

type MenuProps = {
    title: string;
    href: string;
    component: ReactNode;
    isLeftMenu: boolean;
    children?: subMenuProps[];
};

export const BasicMenu: MenuProps[] = [
    { title: "main", href: "/main", component: <MainPage />, isLeftMenu: true },
    { title: "grid-0", href: "/grid-0", component: <GridPage0 />, isLeftMenu: true },
    { title: "grid-l", href: "/", component: <GridPage1 />, isLeftMenu: true },
    { title: "grid-ll", href: "/grid-2", component: <GridPage2 />, isLeftMenu: true },
    { title: "map", href: "/svg-map", component: <SvgMapPage />, isLeftMenu: true },
];
