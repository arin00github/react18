import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IOneFilter } from "../../types/deplomacy-interface";

export interface WorldState {
    selectedCountry: IOneFilter | null;
}

const initialState: WorldState = {
    selectedCountry: null,
};

export const worldSlice = createSlice({
    name: "world",
    initialState: initialState,
    reducers: {
        putSelectedCountry: (state, action: PayloadAction<IOneFilter | null>) => {
            state.selectedCountry = action.payload;
        },
    },
});

export const { putSelectedCountry } = worldSlice.actions;

export default worldSlice.reducer;
