import React from "react";

import { Link } from "react-router-dom";

import { useAppSelector } from "../../redux/hook";

import { LocationDisplay } from "./LocationDisplay";

type MenuProps = {
    title: string;
    href: string;
};

const BasicMenu: MenuProps[] = [
    { title: "home", href: "/" },
    { title: "page02", href: "/page02" },
    { title: "page03", href: "/page03" },
    { title: "page04", href: "/page04" },
    { title: "shopping01", href: "/shopping01" },
    { title: "shopping02", href: "/shopping02" },
];

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
