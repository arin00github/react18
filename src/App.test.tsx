import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

import App from "./App";
import { LocationDisplay } from "./views/routes/AppRouter";

test("full app rendering/navigating", async () => {
    render(<App />, { wrapper: BrowserRouter });

    // verify page content for expected route after navigating
    await userEvent.click(screen.getByText("home"));
    expect(screen.getByText(/you are home/i)).toBeInTheDocument();
});

test("landing on a bad page", () => {
    const badRoute = "/some/bad/route";
    // use <MemoryRouter> when you want to manually control the history
    render(
        <MemoryRouter initialEntries={[badRoute]}>
            <App />
        </MemoryRouter>
    );

    // verify navigation to "no match" route
    expect(screen.getByText(/no match/i)).toBeInTheDocument();
});

test("rendering a component that uses useLocation", () => {
    const route = "/page02";
    // use <MemoryRouter> when you want to manually control the history
    render(
        <MemoryRouter initialEntries={[route]}>
            <LocationDisplay />
        </MemoryRouter>
    );

    // verify location display is rendered
    expect(screen.getByTestId("location-display")).toHaveTextContent(route);
});
