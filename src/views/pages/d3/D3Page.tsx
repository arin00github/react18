import React, { useEffect, useState } from "react";

import { ExtendedFeature, GeoGeometryObjects } from "d3";
import { Tab, Tabs } from "react-bootstrap";

import DataOnMap from "./tab/DataOnMap";
import WorldMapTab from "./tab/WorldMapTab";

export interface FeatureCollection {
    features: ExtendedFeature<GeoGeometryObjects | null, { name: string }>[];
    type: "FeatureCollection";
}

const D3Page = (): JSX.Element => {
    const [tabkey, setTabKey] = useState<string>("world-map");
    return (
        <div>
            <Tabs id="d3-tab" activeKey={tabkey} onSelect={(k) => setTabKey(k || "world-map")}>
                <Tab eventKey="world-map" title="world-map">
                    <WorldMapTab />
                </Tab>
                <Tab eventKey="earth" title="earth">
                    <DataOnMap />
                </Tab>
                <Tab eventKey="map-example" title="map-example">
                    <WorldMapTab />
                </Tab>
            </Tabs>
        </div>
    );
};

export default D3Page;
