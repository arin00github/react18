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

type ClassLayoutAction =
    | { type: "UPDATE_ITEM"; payload: ChartItem<any> }
    | { type: "ADD_ITEM"; payload: ChartItem<any> }
    | { type: "DELETE_ITEM"; payload: string };

export function classlayoutReducer(state: ChartItem<any>[], action: ClassLayoutAction) {
    switch (action.type) {
        case "UPDATE_ITEM":
            return state.map((item) => (item.gridInfo.i === action.payload.gridInfo.i ? action.payload : item));
        case "ADD_ITEM":
            return state.concat(action.payload);
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
