import React from "react";

import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import { server } from "../../mock/server";
import { render, fireEvent, screen, waitFor } from "../../test-utils";

import Page01 from "./Page01";

const setup = () => {
    const utils = render(<Page01 />);
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
