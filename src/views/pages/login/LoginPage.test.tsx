import React from "react";

import { rest } from "msw";

import { server } from "../../../mock/server";
import { render, fireEvent, screen, waitFor } from "../../../test-utils";

import LoginPage from "./LoginPage";

const setup = () => {
    const utils = render(<LoginPage />);
    const inputUserId = utils.getByPlaceholderText("userid");
    const inputEmail = utils.getByPlaceholderText("email");
    const errorBox = utils.getByLabelText("error-box");
    const submitButton = utils.getByLabelText("submit-btn");
    return {
        inputEmail,
        inputUserId,
        errorBox,
        submitButton,
        ...utils,
    };
};

test("input empty case", async () => {
    const { inputEmail, inputUserId, submitButton, errorBox } = setup();
    await fireEvent.change(inputUserId, { target: { value: "stellar" } });
    expect(await inputUserId.getAttribute("value")).toBe("stellar");
    await fireEvent.change(inputEmail, { target: { value: "" } });
    expect(await inputEmail.getAttribute("value")).toBe("");
    await fireEvent.click(submitButton);
    expect(errorBox.textContent).toContain("required all input form");
});
//const handleSubmit = jest.fn();

test("input email box change and update value", async () => {
    const { inputEmail } = setup();
    await fireEvent.change(inputEmail, { target: { value: "stellar@naver.com" } });
    expect(await inputEmail.getAttribute("value")).toBe("stellar@naver.com");
});

test("input userId box change and update value", async () => {
    const { inputUserId } = setup();
    await fireEvent.change(inputUserId, { target: { value: "stellar" } });
    expect(await inputUserId.getAttribute("value")).toBe("stellar");
});

test("invalid email case", async () => {
    const { inputEmail, inputUserId, submitButton, errorBox } = setup();
    await fireEvent.change(inputUserId, { target: { value: "stellar" } });
    expect(await inputUserId.getAttribute("value")).toBe("stellar");
    await fireEvent.change(inputEmail, { target: { value: "stellar" } });
    expect(await inputEmail.getAttribute("value")).toBe("stellar");
    await fireEvent.click(submitButton);
    expect(errorBox.textContent).toContain("invalid email");
});

test("invalid userid case", async () => {
    const { inputEmail, inputUserId, submitButton, errorBox } = setup();
    await fireEvent.change(inputUserId, { target: { value: "ab" } });
    expect(await inputUserId.getAttribute("value")).toBe("ab");
    await fireEvent.change(inputEmail, { target: { value: "stellar@naver.com" } });
    expect(await inputEmail.getAttribute("value")).toBe("stellar@naver.com");
    await fireEvent.click(submitButton);
    expect(errorBox.textContent).toContain("invalid userid");
});

test("login success", async () => {
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
    await waitFor(() => expect(screen.getByText("Page02")).toBeInTheDocument());
});
