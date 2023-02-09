import React from "react";

import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

import App from "./App";
import { render, screen } from "./test-utils";
import { LocationDisplay } from "./views/layouts/LocationDisplay";

// test("full app rendering/navigating", async () => {
//     render(<App />, { wrapper: BrowserRouter });

//     // verify page content for expected route after navigating
//     await userEvent.click(screen.getByLabelText("menu-home"));
//     expect(screen.getByLabelText("page-title-Home")).toBeInTheDocument();
// });

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
