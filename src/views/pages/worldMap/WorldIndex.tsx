import React from "react";

import { PageTitle } from "../../layouts/PageTitle";

import { MapBoxEntry } from "./mapbox/MapBoxEntry";

const WorldPage = () => {
    return (
        <div>
            <PageTitle title="World Map" />
            <MapBoxEntry />
        </div>
    );
};

export default WorldPage;
