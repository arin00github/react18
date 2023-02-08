import React from "react";

import { render, fireEvent, cleanup, screen, waitFor } from "../../../test-utils";

import Page03 from "./Page03";

afterEach(cleanup);

describe("Page03", () => {
    const setup = () => {
        const utils = render(<Page03 />, {});
        const createButton = utils.getByLabelText("create-account-btn");

        const createModal = utils.queryByTestId("create-account-modal");
        return {
            createButton,
            createModal,
            ...utils,
        };
    };

    it("default modal visible false", () => {
        const { createModal } = setup();
        expect(createModal).toBeNull();
    });

    it("Open Create Modal", async () => {
        const { createButton } = setup();

        fireEvent.click(createButton);

        await waitFor(() => {
            expect(screen.getByTestId("create-account-modal")).toBeInTheDocument();
        });
    });

    it("Close Create Modal", async () => {
        const { createButton } = setup();

        fireEvent.click(createButton);

        await waitFor(() => {
            expect(screen.getByTestId("create-account-modal")).toBeInTheDocument();
        });

        await fireEvent.click(screen.getByTestId("close-modal-btn"));

        await waitFor(() => {
            expect(screen.queryByTestId("create-account-modal")).toBeNull();
        });
    });

    it("Change Input in Create Modal", async () => {
        const { createButton } = setup();

        fireEvent.click(createButton);

        await waitFor(() => {
            expect(screen.getByTestId("create-account-modal")).toBeInTheDocument();
        });

        const inputEmail = screen.getByPlaceholderText("Enter email");

        fireEvent.change(inputEmail, { target: { value: "stellar@naver.com" } });

        expect(await inputEmail.getAttribute("value")).toBe("stellar@naver.com");

        await fireEvent.click(screen.getByTestId("close-modal-btn"));

        await waitFor(() => {
            expect(screen.queryByTestId("create-account-modal")).toBeNull();
        });

        fireEvent.click(createButton);

        await waitFor(() => {
            expect(screen.getByTestId("create-account-modal")).toBeInTheDocument();
        });
    });
});
