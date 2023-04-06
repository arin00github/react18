import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ChartItem } from "../../types/ChartItem";
import { LayoutItem, ChartTypeOptionsProps } from "../../types/grid-interface";

export interface GridState {
    layout: LayoutItem[];
    classLayout: ChartItem<any>[];
    selectedChart: string | undefined;
    chartOptionArray: ChartTypeOptionsProps[];
}

export const initialClassLayout = [
    new ChartItem({ x: 20, y: 20, h: 360, w: 620, i: "box_01", type: "line" }),
    new ChartItem({ x: 660, y: 20, w: 620, h: 360, i: "box_1678854405986", type: "" }),
];

export const initialState: GridState = {
    selectedChart: undefined,
    chartOptionArray: [
        {
            key: "box_01",
            lineOptions: {
                strokeColor: "yellow",
            },
            option: {
                title: "Bit Coin Price",
                tooltip: { display: true },
                background: "#ffffff76",
            },
        },
        { key: "box_1678854405986" },
    ],
    classLayout: initialClassLayout,
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
        setAddClassLayout: (state, action: PayloadAction<LayoutItem>) => {
            const newItem = new ChartItem(action.payload);
            state.classLayout = state.classLayout.concat(newItem);
        },
        setUpdateClassLayout: (state, action: PayloadAction<LayoutItem>) => {
            state.classLayout = state.classLayout.map((item) => {
                if (item.gridInfo.i === action.payload.i) {
                    item.setGridInfo(action.payload);
                }
                return item;
            });
        },
        setDeleteClassLayout: (state, action: PayloadAction<string>) => {
            state.classLayout = state.classLayout.filter((stt) => stt.gridInfo.i !== action.payload);
        },
        setStoredGridSelectedChart: (state, action: PayloadAction<string | undefined>) => {
            state.selectedChart = action.payload;
        },
        setStoredOptions: (state, action: PayloadAction<ChartTypeOptionsProps>) => {
            state.chartOptionArray = state.chartOptionArray.map((optionSet) =>
                action.payload.key === optionSet.key ? action.payload : optionSet
            );
        },
    },
});

export const {
    setStoredGridLayout,
    setStoredGridSelectedChart,
    setUpdateClassLayout,
    setDeleteClassLayout,
    setAddClassLayout,
} = gridSlice.actions;

export default gridSlice.reducer;
