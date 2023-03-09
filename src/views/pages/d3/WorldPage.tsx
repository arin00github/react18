import React, { useEffect, useRef, useState } from "react";

import * as d3 from "d3";
import { ExtendedFeature } from "d3";
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import * as topojson from "topojson-client";

import { topoData } from "../../../types/d3-interface";

import { WorldTour } from "./WorldTour";

interface Sphere {
    type: "Sphere";
}

type MyGeometry = Geometry | Sphere;
type MyFeature = Feature<null, GeoJsonProperties>;

const WorldPage = () => {
    const [world, setWorld] = useState<any | null>(null);

    const updateWorldData = async () => {
        d3.json<topoData>("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then((res) => {
            console.log("res", res);
            setWorld(res);
        });
    };
    useEffect(() => {
        console.log("useEffect");
        updateWorldData();
    }, []);
    return <div>{world && <WorldTour world={world} />}</div>;
};

export default WorldPage;
