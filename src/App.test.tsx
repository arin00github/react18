import React from "react";

import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

import App from "./App";
import { render, renderWithProviders, renderWithProvidersNoRouter, screen } from "./test-utils";
import { Aside } from "./views/layouts/Aside";
import { LocationDisplay } from "./views/layouts/LocationDisplay";

test("full app rendering/navigating", async () => {
    renderWithProvidersNoRouter(<App />);

    if (window.location.pathname === "/") {
        expect(screen.getByText("Login")).toBeInTheDocument();
    } else {
        expect(screen.getByText("Login")).not.toBeInTheDocument();
    }
});

// test("landing on a bad page", () => {
//     const badRoute = "/some/bad/route";
//     // use <MemoryRouter> when you want to manually control the history
//     render(
//         <MemoryRouter initialEntries={[badRoute]}>
//             <App />
//         </MemoryRouter>
//     );

//     // verify navigation to "no match" route
//     expect(screen.getByText(/no match/i)).toBeInTheDocument();
// });

// test("rendering a component that uses useLocation", () => {
//     const route = "/page02";
//     // use <MemoryRouter> when you want to manually control the history
//     render(
//         <MemoryRouter initialEntries={[route]}>
//             <LocationDisplay />
//         </MemoryRouter>
//     );

//     // verify location display is rendered
//     expect(screen.getByTestId("location-display")).toHaveTextContent(route);
// });
