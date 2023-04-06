import { ChartItem } from "../../types/ChartItem";
import { ChartTypeOptionsProps, LayoutItem } from "../../types/grid-interface";

type LayoutAction =
    | { type: "UPDATE_ITEM"; payload: LayoutItem }
    | { type: "ADD_ITEM"; payload: LayoutItem }
    | { type: "DELETE_ITEM"; payload: string };

export function layoutReducer(state: LayoutItem[], action: LayoutAction) {
    switch (action.type) {
        case "UPDATE_ITEM":
            return state.map((item) => (item.i === action.payload.i ? action.payload : item));
        case "ADD_ITEM":
            return state.concat(action.payload);
        case "DELETE_ITEM":
            return state.filter((stt) => stt.i !== action.payload);
        default:
            return state;
    }
}

export const initialClassLayout = [
    new ChartItem({ x: 20, y: 20, h: 360, w: 620, i: "box_01", type: "line" }),
    new ChartItem({ x: 660, y: 20, w: 620, h: 360, i: "box_1678854405986", type: "" }),
];

type ClassLayoutAction =
    | { type: "UPDATE_ITEM"; payload: LayoutItem }
    | { type: "ADD_ITEM"; payload: LayoutItem }
    | { type: "DELETE_ITEM"; payload: string };

export function classlayoutReducer(state: ChartItem<any>[], action: ClassLayoutAction) {
    console.log("origin state", state);
    switch (action.type) {
        case "UPDATE_ITEM":
            return state.map((item) => {
                if (item.gridInfo.i === action.payload.i) {
                    item.setGridInfo(action.payload);
                }
                return item;
            });
        case "ADD_ITEM":
            // eslint-disable-next-line no-case-declarations
            const newItem = new ChartItem(action.payload);
            return state.concat(newItem);
        case "DELETE_ITEM":
            return state.filter((stt) => stt.gridInfo.i !== action.payload);
        default:
            return state;
    }
}

type OptionAction = { type: "UPDATE_OPTION"; payload: ChartTypeOptionsProps };

export function optionReducer(state: ChartTypeOptionsProps[], action: OptionAction) {
    switch (action.type) {
        case "UPDATE_OPTION":
            state.map((option) => (option.key === action.payload.key ? action.payload : option));
    }
}
