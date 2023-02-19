import React, { ReactNode } from "react";

import { MapBoxEntry } from "./mapbox/MapBoxEntry";

type WorldPageProps = {
    children: ReactNode;
};

const WorldPage = ({ children }: WorldPageProps) => {
    return (
        <>
            <MapBoxEntry />
            {children}
        </>
    );
};

export default WorldPage;
