import { LayoutItem } from "../../types/grid-interface";

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
