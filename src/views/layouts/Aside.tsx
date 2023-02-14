import React from "react";

import { Link } from "react-router-dom";

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
        <div id="aside">
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
        </div>
    );
}
