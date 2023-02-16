import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Feature, Map, MapBrowserEvent, View, MapEvent, Overlay } from "ol";
import { click } from "ol/events/condition";
import { FeatureLike } from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import Interaction, { Select } from "ol/interaction";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import "ol/ol.css";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import styled from "styled-components";

export const MapBox = () => {
    const [selectedFeature, setSelectedFeature] = useState<Feature[] | FeatureLike[]>([]);
    const [mapObject, setMapObject] = useState<Map | null>(null);
    const [overlay, setOverlay] = useState<Overlay | null>(null);

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
            const features = event.map.getFeaturesAtPixel(event.pixel);
            // features.forEach((feature) => {
            //     console.log("property", feature.getProperties());
            // });
            setSelectedFeature(features);
        });
    }, [mapObject]);

    const handleFeatureHover = useCallback(() => {
        mapObject?.on("pointermove", (event) => {
            const coordinate = event.map.getCoordinateFromPixel(event.pixel);
            const features = event.map.getFeaturesAtPixel(event.pixel);
            if (features.length >= 1) {
                overlay?.setPosition(coordinate);
                //event.map.addOverlay(overlay);
            } else {
                overlay?.setPosition(undefined);
                //event.map.removeOverlay(overlay);
            }

            setSelectedFeature(features);
        });
    }, [mapObject, overlay]);

    useEffect(() => {
        const popupDiv = document.getElementById("popup");

        const source = new VectorSource({
            format: new GeoJSON(),
            url: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson",
        });

        const vector = new VectorLayer({
            source: source,
            background: "white",
        });

        if (popupDiv) {
            const OverlayInstance = new Overlay({
                element: popupDiv,
                offset: [0, 0],
                stopEvent: false,
                positioning: "center-center",
            });

            setOverlay(OverlayInstance);
        }

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
    }, []);

    useEffect(() => {
        if (mapObject) {
            mapObject.addInteraction(featureClick);
            handleFeatureclick();
            if (overlay) {
                mapObject.addOverlay(overlay);
                handleFeatureHover();
            }
        }
    }, [featureClick, handleFeatureHover, handleFeatureclick, mapObject, overlay]);

    return (
        <div>
            <div id="world-map" style={{ width: "100%", height: "calc(100vh - 120px)" }}></div>
            <StyledPopup id="popup">
                <div>Country Name</div>
                <div>ISO Name</div>
            </StyledPopup>
        </div>
    );
};

const StyledPopup = styled.div`
    padding: 14px;
    background-color: #fff;
    color: "#757575";
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;
