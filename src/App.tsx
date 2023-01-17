import React, { useState } from "react";

import { ThemeProvider } from "styled-components";

import AppRouter from "./routes/AppRouter";
import { GlobalStyles } from "./style/global";
import theme from "./style/theme";

//const labels = ["check 1", "check 2", "check 3"];

function App() {
    return <AppRouter />;
}

export default App;
