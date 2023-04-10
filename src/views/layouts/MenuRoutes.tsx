import React, { ReactNode } from "react";

// import ChartJsIndexPage from "../pages/chartjs/IndexPage";
// import ChartIndexPage from "../pages/d3/ChartPage";
import D3Page from "../pages/d3/D3Page";
import D3WorldPage from "../pages/d3/WorldPage";
import FormikIndexPage from "../pages/formik/IndexPage";
import GridPage from "../pages/grid/IndexPage";
import GridPage2 from "../pages/grid2/IndexPage";
import GridPage3 from "../pages/grid3/IndexPage";
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
    { title: "grid-l", href: "/", component: <GridPage />, isLeftMenu: true },
    { title: "grid-ll", href: "/grid-2", component: <GridPage2 />, isLeftMenu: true },
    { title: "grid-lll", href: "/grid-3", component: <GridPage3 />, isLeftMenu: true },
    { title: "map", href: "/svg-map", component: <SvgMapPage />, isLeftMenu: true },
];
