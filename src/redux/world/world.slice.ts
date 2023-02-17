import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICountryList, ICountryObject, IOneFilter } from "../../types/deplomacy-interface";

export interface WorldState {
    selectedCountry: IOneFilter | null;
    countryList: ICountryList[];
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

        putCountryList: (state, action: PayloadAction<ICountryList[]>) => {
            state.countryList = action.payload;
        },
    },
});

export const { putSelectedCountry, putCountryList } = worldSlice.actions;

export default worldSlice.reducer;
