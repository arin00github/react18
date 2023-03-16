import React, { ReactNode } from "react";

// import ChartJsIndexPage from "../pages/chartjs/IndexPage";
// import ChartIndexPage from "../pages/d3/ChartPage";
import D3Page from "../pages/d3/D3Page";
import D3WorldPage from "../pages/d3/WorldPage";
import FormikIndexPage from "../pages/formik/IndexPage";
import GridPage from "../pages/grid/GridPage";
import GridPage2 from "../pages/grid/GridPage2";
import MainPage from "../pages/main/MainPage";
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
    { title: "grid", href: "/grid-layout", component: <GridPage />, isLeftMenu: true },
    { title: "board", href: "/", component: <GridPage2 />, isLeftMenu: true },
];
