import React from "react";

import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import { server } from "../../../mock/server";
import { render, fireEvent, screen, waitFor } from "../../../test-utils";

import Page02 from "./Page02";

const setup = () => {
    const utils = render(<Page02 />);
    const inputUserId = utils.getByLabelText("test-userid");
    const inputEmail = utils.getByLabelText("test-email");
    const errorBox = utils.getByLabelText("error-box-2");
    const submitButton = utils.getByLabelText("submit-btn");
    return {
        inputEmail,
        inputUserId,
        errorBox,
        submitButton,
        ...utils,
    };
};

describe("Page02", () => {
    it("input empty case", async () => {
        const { inputEmail, inputUserId, submitButton, errorBox } = setup();
        await fireEvent.change(inputUserId, { target: { value: "" } });
        expect(await inputUserId.getAttribute("value")).toBe("");
        await fireEvent.change(inputEmail, { target: { value: "kakao@naver.com" } });
        expect(await inputEmail.getAttribute("value")).toBe("kakao@naver.com");
        await fireEvent.click(submitButton);
        expect(errorBox.textContent).toContain("required all input form");
    });

    it("input email box change and update value", async () => {
        const { inputEmail } = setup();
        await fireEvent.change(inputEmail, { target: { value: "stellar@naver.com" } });
        expect(await inputEmail.getAttribute("value")).toBe("stellar@naver.com");
    });

    it("login success", async () => {
        const { inputEmail, inputUserId, submitButton } = setup();
        await fireEvent.change(inputUserId, { target: { value: "stellar" } });
        expect(await inputUserId.getAttribute("value")).toBe("stellar");
        await fireEvent.change(inputEmail, { target: { value: "stellar@naver.com" } });
        expect(await inputEmail.getAttribute("value")).toBe("stellar@naver.com");
        await fireEvent.click(submitButton);
        server.use(
            rest.post("https://localhost:8080/login", (req, res, ctx) => {
                console.log("req", req);
                return res(ctx.status(200));
            })
        );
        await waitFor(() => expect(screen.getByText("login success")).toBeInTheDocument());
    });
});
