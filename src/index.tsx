import React from "react";

import { ConfigProvider, theme } from "antd";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import { worker } from "./mock/browser";
import { persistor, setupStore } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import { GlobalStyles } from "./style/global";
import { LightTheme } from "./style/theme";

import "react-grid-layout/css/styles.css";
import "./style/custom.scss";

if (process.env.NODE_ENV === "test") {
    worker.printHandlers();
    worker.start();
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const store = setupStore();

const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <PersistGate persistor={persistor}>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
                        <ThemeProvider theme={LightTheme}>
                            <GlobalStyles />
                            <App />
                        </ThemeProvider>
                    </ConfigProvider>
                </QueryClientProvider>
            </Provider>
        </PersistGate>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
