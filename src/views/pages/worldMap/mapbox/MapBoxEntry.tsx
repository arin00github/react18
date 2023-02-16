import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Feature, Map, MapBrowserEvent, View, MapEvent } from "ol";
import { click } from "ol/events/condition";
import { FeatureLike } from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import Select from "ol/interaction/Select";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import "ol/ol.css";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";

export const MapBoxEntry = () => {
    const [selectedFeature, setSelectedFeature] = useState<Feature[] | FeatureLike[]>([]);
    const [mapObject, setMapObject] = useState<Map | null>(null);

    const featureClick = useMemo(() => {
        const selected = new Style({
            fill: new Fill({
                color: "#eeeeee",
            }),
            stroke: new Stroke({
                color: "#0460ff",
                width: 2,
            }),
        });
        return new Select({
            condition: click,
            style: (feature) => {
                const color = feature.get("COLOR") || "#eeeeee";
                selected.getFill().setColor(color);
                return selected;
            },
        });
    }, []);

    const handleFeatureclick = useCallback(() => {
        mapObject?.on("click", (event) => {
            const targetMap = event.map;

            const features = targetMap.getFeaturesAtPixel(event.pixel);
            console.log("feature seleced", features);
            features.forEach((feature) => {
                console.log("property", feature.getProperties());
            });
            setSelectedFeature(features);
        });
    }, [mapObject]);

    useEffect(() => {
        const source = new VectorSource({
            format: new GeoJSON(),
            url: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson",
        });

        const vector = new VectorLayer({
            source: source,
            background: "white",
        });
        const mapInstance = new Map({
            layers: [vector],
            target: "world-map",
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
        });

        setMapObject(mapInstance);

        //STUDY: 이렇게 return 안에 넣었더니 지도 두번 그려지는게 한번 그려짐
        return () => {
            mapInstance.setTarget(undefined);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (mapObject) {
            mapObject.addInteraction(featureClick);
            handleFeatureclick();
        }
    }, [featureClick, handleFeatureclick, mapObject]);

    return <div id="world-map" style={{ width: "100%", height: "calc(100vh - 120px)" }}></div>;
};
