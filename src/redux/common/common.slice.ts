import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
    isOpenedAside: boolean;
}

const initialState: CommonState = {
    isOpenedAside: true,
};

export const commonSlice = createSlice({
    name: "common",
    initialState: initialState,
    reducers: {
        setStoredCommonAsideOpend: (state, action: PayloadAction<boolean>) => {
            state.isOpenedAside = action.payload;
        },
    },
});

export const { setStoredCommonAsideOpend } = commonSlice.actions;

export default commonSlice.reducer;
