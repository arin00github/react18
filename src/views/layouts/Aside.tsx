import React from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";

type MenuProps = {
    title: string;
    href: string;
    isLeftMenu: boolean;
};

const BasicMenu: MenuProps[] = [
    { title: "세계지도", href: "/", isLeftMenu: true },
    { title: "", href: "deplomacy/:detail", isLeftMenu: false },
    { title: "글로벌 한국", href: "deplomacy", isLeftMenu: true },
    { title: "지식아카이브", href: "archive", isLeftMenu: true },
];

export function Aside() {
    const showArrayMenu = BasicMenu.filter((menu) => menu.isLeftMenu);

    return (
        <StyledAside>
            <ul>
                {showArrayMenu.map((menu) => {
                    return (
                        <li key={`menu_${menu.title}`}>
                            <Link to={menu.href} aria-label={`menu-${menu.title}`}>
                                {menu.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </StyledAside>
    );
}

const StyledAside = styled.div`
    width: 240px;
    //height: calc(100vh - 80px);
    position: fixed;
    top: 40px;
    left: 0;
    bottom: 40px;
    background-color: #fff;
    border-radius: 0px 12px 12px 0px;
    box-shadow: 0px 7px 18px rgba(0, 0, 0, 0.1);
    z-index: 100;

    ul {
        padding: 2rem 10px;
        li {
            padding: 0 18px;
            height: 3rem;
            line-height: 3rem;
        }
        li:hover {
            background-color: #ebebeb;
            border-radius: 12px;
        }
    }
`;
