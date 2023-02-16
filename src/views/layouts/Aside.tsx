import React from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";

import { updateIsLogin } from "../../redux/account/account.slice";
import { useAppDispatch } from "../../redux/hook";
import { CustomButton } from "../../style";

import { BasicMenu } from "./menuRouter";

export function Aside() {
    // const cartLength = useAppSelector((state) => state.account.cart);

    const dispatch = useAppDispatch();

    const showArrayMenu = BasicMenu.filter((menu) => menu.isLeftMenu);

    return (
        <StyledAside id="aside">
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
    height: calc(100vh - 80px);
    position: fixed;
    top: 40px;
    left: 0;
    background-color: #fff;

    box-shadow: 0px 7px 18px rgba(0, 0, 0, 0.1);
    z-index: 100;

    ul {
        padding: 2rem 0;
        li {
            padding: 0 2rem;
            height: 3rem;
            line-height: 3rem;
        }
        li:hover {
            background-color: #ebebeb;
        }
    }
`;
