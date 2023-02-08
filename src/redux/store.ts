import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";
//import storage from "redux-persist/lib/storage";

import accountReducer from "./account/account.slice";
import { apiSlice } from "./api/api.slice";
import postReduducer from "./post/post.slice";
// const persistConfig = {
//     key: "root",
//     storage,
// };

export const rootReducer = combineReducers({
    account: accountReducer,
    post: postReduducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
