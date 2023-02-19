import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import accountReducer from "./account/account.slice";
import { apiSlice } from "./api/api.slice";
import worldReducer from "./world/world.slice";

const persistConfig = {
    key: "root",
    storage,
};

export const rootReducer = combineReducers({
    account: accountReducer,
    world: worldReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export function setupStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: persistedReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
    });
}

const store = setupStore();

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
