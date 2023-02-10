import React, { ReactElement } from "react";

import { act, fireEvent, renderWithProviders, screen } from "../../../../test-utils";
import { FormInfoGroupProps } from "../../../../types/common";

import RegisterBookModal, { FormInfoGroup } from "./RegisterBookModal";

interface FormBoxTextCodeProps {
    ui: ReactElement;
    formDataSet: FormInfoGroupProps[];
}

function FormBoxTestCode({ ui, formDataSet }: FormBoxTextCodeProps) {
    formDataSet.forEach((form, index) => {
        test(`FormBox-InputChange-${index}`, async () => {
            act(() => {
                renderWithProviders(ui);
            });
            const targetInput = screen.getByPlaceholderText(form.placeholder);
            await fireEvent.change(targetInput, { target: { value: form.testValue } });
            expect(await targetInput.getAttribute("value")).toBe(form.testValue);
        });
    });

    test("Erorr Message", async () => {
        act(() => {
            renderWithProviders(ui);
        });
        formDataSet.forEach(async (form, index) => {
            const targetInput = screen.getByPlaceholderText(form.placeholder);

            await fireEvent.change(targetInput, { target: { value: form.testValue } });
            expect(await targetInput.getAttribute("value")).toBe(form.testValue);
        });
        const submitBtn = screen.getByRole("button", { name: "Register" });
        fireEvent.click(submitBtn);
        const errorBox = screen.queryByLabelText("error-text-author");
        if (errorBox) {
            expect(errorBox.textContent).toContain("Required");
        }
    });
}

FormBoxTestCode({
    ui: (
        <RegisterBookModal
            visible={true}
            onClose={() => {
                console.log("close");
            }}
            ariaLabel="register"
        />
    ),
    formDataSet: FormInfoGroup,
});
