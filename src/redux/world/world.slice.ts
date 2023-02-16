import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICountryObject, IOneFilter } from "../../types/deplomacy-interface";

export interface WorldState {
    selectedCountry: IOneFilter | null;
    countryList: ICountryObject[];
}

const initialState: WorldState = {
    selectedCountry: null,
    countryList: [],
};

export const worldSlice = createSlice({
    name: "world",
    initialState: initialState,
    reducers: {
        putSelectedCountry: (state, action: PayloadAction<IOneFilter | null>) => {
            state.selectedCountry = action.payload;
        },

        putCountryList: (state, action: PayloadAction<ICountryObject[]>) => {
            state.countryList = action.payload;
        },
    },
});

export const { putSelectedCountry, putCountryList } = worldSlice.actions;

export default worldSlice.reducer;
