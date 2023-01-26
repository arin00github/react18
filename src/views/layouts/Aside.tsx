import React from "react";

import { Link } from "react-router-dom";

import { LocationDisplay } from "./LocationDisplay";

type MenuProps = {
    title: string;
    href: string;
};

const BasicMenu: MenuProps[] = [
    { title: "home", href: "/" },
    { title: "page02", href: "/page02" },
    { title: "page03", href: "/page03" },
];

export function Aside() {
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
            <LocationDisplay />
        </div>
    );
}
