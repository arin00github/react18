import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartState, ProductState } from "../../types/shopping";

type AccountUserState = {
    account_id: string;
    account_name: string;
    account_email: string;
};

export interface AccountState {
    account: AccountUserState;
    status: "idle" | "loading" | "complete";
    cart: CartState[];
}

const initialValue: AccountState = {
    account: { account_email: "", account_id: "", account_name: "" },
    status: "idle",
    cart: [],
};

const accountSlice = createSlice({
    name: "account",
    initialState: initialValue,
    reducers: {
        updateAccount: (state, action: PayloadAction<AccountUserState>) => {
            state.account = action.payload;
        },
        updateAddCart: (state, action: PayloadAction<ProductState>) => {
            let newState: CartState[] = state.cart;
            if (state.cart.every((it) => it.product_id !== action.payload.product_id)) {
                newState = state.cart.concat([{ ...action.payload, product_cnt: 1 }]);
            } else {
                newState = state.cart.map((item) => {
                    return action.payload.product_id === item.product_id
                        ? { ...item, product_cnt: item.product_cnt + 1 }
                        : item;
                });
            }
            state.cart = newState;
        },
        updateSubtractCart: (state, action: PayloadAction<ProductState>) => {
            let newState: CartState[] = state.cart;
            newState = state.cart.map((item) => {
                return action.payload.product_id === item.product_id
                    ? { ...item, product_cnt: item.product_cnt - 1 }
                    : item;
            });
            state.cart = newState;
        },
    },
});

export const { updateAccount, updateAddCart, updateSubtractCart } = accountSlice.actions;

export default accountSlice.reducer;
