import React from "react";

import { cleanup, fireEvent, renderWithProviders, screen, waitFor } from "../../test-utils";

import { AccountDisplay } from "./AccounDisplay";

afterEach(cleanup);

test("fetches & receives a user after clicking the fetch user button", async () => {
    renderWithProviders(<AccountDisplay />);

    expect(screen.getByText("Fetch Post")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Fetch Post" }));
    expect(screen.queryByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.queryByLabelText("post-box")).toBeInTheDocument();
    });

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});
