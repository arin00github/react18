import React from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";

import { updateIsLogin } from "../../redux/account/account.slice";
import { useAppDispatch } from "../../redux/hook";
import { CustomButton } from "../../style";

import { LocationDisplay } from "./LocationDisplay";
import { BasicMenu } from "./menuRouter";

export function Aside() {
    // const cartLength = useAppSelector((state) => state.account.cart);

    const dispatch = useAppDispatch();

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
    width: 60px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #484864;

    ul {
        li {
            height: 60px;
            line-height: 60px;
            text-align: center;

            &:hover {
                background-color: #ebebeb;
            }
        }
    }
`;
