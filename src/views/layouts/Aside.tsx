import React from "react";

import { Link } from "react-router-dom";

import { useAppSelector } from "../../redux/hook";

import { LocationDisplay } from "./LocationDisplay";
import { BasicMenu } from "./menuRouter";

export function Aside() {
    // const cartLength = useAppSelector((state) => state.account.cart);

    return (
        <div id="aside">
            <ul>
                {BasicMenu.map((menu) => {
                    return (
                        <li key={`menu_${menu.title}`}>
                            <Link to={menu.href} aria-label={`menu-${menu.title}`}>
                                {menu.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            {/* <div>장바구니 상품 : {cartLength.length}</div> */}
            <LocationDisplay />
        </div>
    );
}
