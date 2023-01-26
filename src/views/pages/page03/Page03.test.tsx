import React from "react";

import { screen, waitFor } from "@testing-library/react";

import { render, fireEvent, cleanup } from "../../../test-utils";

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
});
