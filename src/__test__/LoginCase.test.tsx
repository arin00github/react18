import React from "react";

import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";

import App, { RouterContainer } from "../App";
import { server } from "../mock/server";
import { cleanup, fireEvent, renderWithProvidersNoRouter, screen, waitFor } from "../test-utils";

afterEach(cleanup);

describe("Login Sinario", () => {
    it("1. Display login Page", async () => {
        renderWithProvidersNoRouter(
            <MemoryRouter initialEntries={["/login"]}>
                <RouterContainer userAuth={false} />
            </MemoryRouter>
        );

        const inputUserId = screen.getByPlaceholderText("userid");
        const inputEmail = screen.getByPlaceholderText("email");
        const errorBox = screen.getByLabelText("error-box");
        const submitButton = screen.getByLabelText("submit-btn");

        await fireEvent.change(inputUserId, { target: { value: "" } });
        expect(await inputUserId.getAttribute("value")).toBe("");
        await fireEvent.change(inputEmail, { target: { value: "kakao@naver.com" } });
        expect(await inputEmail.getAttribute("value")).toBe("kakao@naver.com");
        await fireEvent.click(submitButton);
        expect(errorBox.textContent).toContain("required all input form");
    });

    it("2. Login Success", async () => {
        renderWithProvidersNoRouter(
            <MemoryRouter initialEntries={["/login"]}>
                <RouterContainer userAuth={false} />
            </MemoryRouter>
        );

        const inputUserId = screen.getByPlaceholderText("userid");
        const inputEmail = screen.getByPlaceholderText("email");
        //const errorBox = screen.getByLabelText("error-box");
        const submitButton = screen.getByLabelText("submit-btn");
        await fireEvent.change(inputUserId, { target: { value: "stellar" } });
        expect(await inputUserId.getAttribute("value")).toBe("stellar");
        await fireEvent.change(inputEmail, { target: { value: "stellar@naver.com" } });
        expect(await inputEmail.getAttribute("value")).toBe("stellar@naver.com");
        await fireEvent.click(submitButton);
        server.use(
            rest.post("https://localhost:8080/login", (req, res, ctx) => {
                return res(ctx.status(200));
            })
        );

        await waitFor(() => expect(screen.getByText("Main")).toBeInTheDocument());
    });
});
