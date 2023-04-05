import React from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";

import { useAppSelector } from "../../redux/hook";

import { BasicMenu } from "./MenuRoutes";

export function Aside() {
    const storedCommon = useAppSelector((state) => state.common);
    const showArrayMenu = BasicMenu.filter((menu) => menu.isLeftMenu);

    return (
        <StyledAside isOpen={storedCommon.isOpenedAside}>
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

const StyledAside = styled.div<{ isOpen: boolean }>`
    width: 60px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: ${(props) => (props.isOpen ? "0px" : "-60px")};
    background-color: #2e2e2e;

    ul {
        li {
            height: 60px;
            line-height: 60px;
            text-align: center;
            color: #fff;

            &:hover {
                background-color: #ebebeb;
                color: #212147;
            }
        }
    }
`;
