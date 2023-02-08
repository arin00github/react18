import React, { ReactElement } from "react";

import { configureStore } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { PreloadedState } from "redux";
import { ThemeProvider } from "styled-components";

import { AppStore, rootReducer, RootState } from "./redux/store";
import theme from "./style/theme";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = configureStore({ reducer: rootReducer, preloadedState }),
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: { children: React.ReactNode }): JSX.Element {
        return <Provider store={store}>{children}</Provider>;
    }
    return { store, ...render(ui, { wrapper: Wrapper }) };
}

export * from "@testing-library/react";
