import React from "react";

import { Link } from "react-router-dom";
import { Route, Routes, useLocation } from "react-router-dom";

import Page01 from "../views/pages/Page01";
import Page02 from "../views/pages/Page02";

export const LocationDisplay = () => {
    const location = useLocation();

    return <div data-testid="location-display">{location.pathname}</div>;
};

const AppRouter = () => {
    return (
        <div>
            <div>
                <Link to="/">home</Link>
                <Link to="/page02">page02</Link>
            </div>
            <Routes>
                <Route path="/" element={<Page01 />} />

                <Route path="/page02" element={<Page02 />} />
            </Routes>
            <LocationDisplay />
        </div>
    );
};

export default AppRouter;
