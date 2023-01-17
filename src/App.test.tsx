import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

import App from "./App";
import AppRouter from "./routes/AppRouter";

test("full app rendering/navigating", async () => {
    render(<App />, { wrapper: BrowserRouter });

    // verify page content for expected route after navigating
    await userEvent.click(screen.getByText(/about/i));
    expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument();
});
