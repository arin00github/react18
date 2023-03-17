import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LayoutItem, LineChartOptionsProps } from "../../types/grid-interface";

export interface GridState {
    layout: LayoutItem[];
    selectedChart: string | undefined;
    chartOptionArray: LineChartOptionsProps[];
}

export const initialState: GridState = {
    selectedChart: undefined,
    chartOptionArray: [
        {
            key: "box_01",
            option: {
                lineStyle: { strokeColor: "#ffff00" },
                title: "Bit Coin Price",
                tooltip: { display: true },
                background: "#ffffff76",
            },
        },
        { key: "box_1678854405986" },
    ],
    layout: [
        { x: 20, y: 20, h: 360, w: 620, i: "box_01", type: "line" },
        { x: 660, y: 20, w: 620, h: 360, i: "box_1678854405986", type: "" },
    ],
};

export const gridSlice = createSlice({
    name: "grid",
    initialState: initialState,
    reducers: {
        setStoredGridLayout: (state, action: PayloadAction<LayoutItem[]>) => {
            state.layout = action.payload;
        },
        setStoredGridSelectedChart: (state, action: PayloadAction<string | undefined>) => {
            state.selectedChart = action.payload;
        },
    },
});

export const { setStoredGridLayout, setStoredGridSelectedChart } = gridSlice.actions;

export default gridSlice.reducer;
