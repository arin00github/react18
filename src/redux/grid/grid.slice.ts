import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LayoutItem } from "../../types/grid-interface";

export interface GridState {
    layout: LayoutItem[];
}

export const initialState: GridState = {
    layout: [
        { x: 20, y: 20, h: 360, w: 620, i: "box_01" },
        { x: 660, y: 20, w: 620, h: 360, i: "box_1678854405986" },
    ],
};

export const gridSlice = createSlice({
    name: "grid",
    initialState: initialState,
    reducers: {
        setStoredGridLayout: (state, action: PayloadAction<LayoutItem[]>) => {
            state.layout = action.payload;
        },
    },
});

export const { setStoredGridLayout } = gridSlice.actions;

export default gridSlice.reducer;
