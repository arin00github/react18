import React from "react";

import { rest } from "msw";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router-dom";

import App, { RouterContainer, routerFrame } from "../App";
import { server } from "../mock/server";
import { cleanup, fireEvent, renderWithProvidersNoRouter, screen, waitFor } from "../test-utils";

afterEach(cleanup);

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUsedNavigate,
}));

describe("Login Sinario", () => {
    it("0. Initiat Project", () => {
        const renderer = renderWithProvidersNoRouter(
            <MemoryRouter initialEntries={["/login"]}>
                <RouterContainer />
            </MemoryRouter>
        );

        expect(renderer).toMatchSnapshot();
    });

    // it("1. Display login Page", async () => {
    //     console.log("location", window.location.pathname);
    //     if (window.location.pathname === "/login") {
    //         expect(screen.getByText("Login")).toBeInTheDocument();
    //     } else {
    //         console.log("login", screen.getByText("Login"));
    //         //expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    //     }
    // });
});
