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
            <div className="p-4">
                <CustomButton onClick={() => dispatch(updateIsLogin(false))}>로그아웃</CustomButton>
            </div>
            {/* <div>장바구니 상품 : {cartLength.length}</div> */}
            <LocationDisplay />
        </StyledAside>
    );
}

const StyledAside = styled.div`
    width: 240px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    border-right: 1px solid;
    border-right-color: #000;

    ul {
        padding: 2rem 0;

        li {
            padding: 0 2rem;
            height: 3rem;
            line-height: 3rem;

            &:hover {
                background-color: #ebebeb;
            }
        }
    }
`;
