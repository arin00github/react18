import React, { useState } from "react";

import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "./style/global";
import theme from "./style/theme";
import Page01 from "./views/pages/Page01";

//const labels = ["check 1", "check 2", "check 3"];

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Page01 />
        </ThemeProvider>
    );
}

export default App;
