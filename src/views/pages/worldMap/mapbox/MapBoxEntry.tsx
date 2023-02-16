import React from "react";

import { useAppSelector } from "../../../../redux/hook";

import { CountryBox } from "./CountryBox";
import { MapBox } from "./MapBox";
import { NavigatorBar } from "./NavigatorBar";

export const MapBoxEntry = () => {
    const storedWorld = useAppSelector((state) => state.world);
    const { selectedCountry } = storedWorld;
    return (
        <div>
            <MapBox />
            <NavigatorBar />
            {selectedCountry && <CountryBox selectedCountry={selectedCountry} />}
        </div>
    );
};
