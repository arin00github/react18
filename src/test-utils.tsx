import React from "react";

import { configureStore } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { PreloadedState } from "redux";
import { Persistor } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { AppStore, persistedReducer, RootState, persistor as PersistorSelf } from "./redux/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
    persistor?: Persistor;
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = configureStore({ reducer: persistedReducer, preloadedState }),
        persistor = PersistorSelf,
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: { children: React.ReactNode }): JSX.Element {
        return (
            <PersistGate persistor={persistor}>
                <Provider store={store}>{children}</Provider>
            </PersistGate>
        );
    }
    return { store, ...render(ui, { wrapper: Wrapper }) };
}

export * from "@testing-library/react";
