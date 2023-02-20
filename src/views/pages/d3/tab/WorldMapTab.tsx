import React, { useEffect } from "react";

import d3, { select, geoEquirectangular, geoPath, json, ExtendedFeature, GeoGeometryObjects } from "d3";
import { Tab, Tabs } from "react-bootstrap";

import { FeatureCollection } from "../D3Page";

const WorldMapTab = (): JSX.Element => {
    useEffect(() => {
        const width = document.getElementById("world-map-wrap")?.clientWidth || 1200;
        const height = 500;
        const svg = select("#world-map").attr("viewBox", [0, 0, width, height]);

        const projection = geoEquirectangular().center([0, 0]);

        const pathGenerator = geoPath().projection(projection);

        const g = svg.append("g");

        json("https://raw.githubusercontent.com/iamspruce/intro-d3/main/data/countries-110m.geojson").then((data) => {
            const featureData = data as FeatureCollection;
            g.selectAll("path")
                .data(featureData.features)
                .join("path")
                .attr("d", (d) => {
                    return pathGenerator(d);
                });
        });
    }, []);

    return (
        <div id="world-map-wrap" style={{ width: "!00%" }}>
            <svg id="world-map">
                <path />
            </svg>
        </div>
    );
};

export default WorldMapTab;
