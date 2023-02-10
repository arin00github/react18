import React from "react";

import { rest } from "msw";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import App, { RouterContainer } from "../App";
import { server } from "../mock/server";
import { cleanup, fireEvent, renderWithProvidersNoRouter, screen, waitFor } from "../test-utils";
import Page03 from "../views/pages/page03/Page03";

afterEach(cleanup);

describe("Router Sinario", () => {
    it("1. Render MainPage", async () => {
        renderWithProvidersNoRouter(
            <MemoryRouter initialEntries={["/main"]}>
                <RouterContainer userAuth={true} />
            </MemoryRouter>
        );
        expect(screen.getByText("Main")).toBeInTheDocument();
        //expect(renderer).toMatchSnapshot();
    });

    it("2. Click Aside Menu", async () => {
        renderWithProvidersNoRouter(
            <MemoryRouter initialEntries={["/main"]}>
                <RouterContainer userAuth={true} />
            </MemoryRouter>
        );

        const menuPage03 = screen.getByLabelText("menu-page03");
        const menuPage04 = screen.getByLabelText("menu-page04");
        fireEvent.click(menuPage03);
        expect(await screen.getByText("Page03")).toBeInTheDocument();
        fireEvent.click(menuPage04);
        expect(await screen.getByText("Page04")).toBeInTheDocument();
    });

    // it("2. Render Page03", async () => {
    //     const renderer = renderWithProvidersNoRouter(
    //         <MemoryRouter initialEntries={["/page03"]}>
    //             <Routes>
    //                 <Route path="/page03" element={<Page03 />} />
    //             </Routes>
    //         </MemoryRouter>
    //     );

    //     expect(renderer).toMatchSnapshot();
    // });
});
