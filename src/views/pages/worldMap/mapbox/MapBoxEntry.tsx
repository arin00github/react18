import React from "react";

import { useAppSelector } from "../../../../redux/hook";
import { CountryBox } from "../countryBox/CountryBox";

import { MapBox } from "./MapBox";

export const MapBoxEntry = () => {
    const storedWorld = useAppSelector((state) => state.world);
    const { selectedCountry } = storedWorld;
    return (
        <div>
            <MapBox />
            {selectedCountry && <CountryBox selectedCountry={selectedCountry} />}
        </div>
    );
};
