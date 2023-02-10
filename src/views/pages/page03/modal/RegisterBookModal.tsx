import React from "react";

import { Formik } from "formik";
import { Modal, Button, CloseButton, Form, Row } from "react-bootstrap";

import { FormInfoGroupProps } from "../../../../types/common";

type RegisterBookModalProps = {
    visible: boolean;
    onClose: () => void;
    ariaLabel: string;
};

type FormProps = {
    title: string;
    author: string;
    //price: string;
};

export const FormInfoGroup: FormInfoGroupProps[] = [
    {
        name: "title",
        placeholder: "Enter title",
        type: "text",
        required: true,
        regex: "",
        defaultValue: "",
        testValue: "Herry Potter",
    },
    {
        name: "author",
        placeholder: "Enter author",
        type: "text",
        required: true,
        regex: "",
        defaultValue: "",
        testValue: "",
    },
];

const RegisterBookModal = ({ visible, onClose, ariaLabel }: RegisterBookModalProps) => {
    const createInitalForm = (formGroup: FormInfoGroupProps[]) => {
        const obj: { [x: string]: string } = {};
        formGroup.forEach((item) => {
            obj[item.name] = item.defaultValue;
        });
        return obj;
    };

    const initialForm = createInitalForm(FormInfoGroup) as FormProps;

    const handleSubmit = (values: FormProps) => {
        console.log("submit", values);
    };

    return (
        <Modal show={visible} centered data-testid={`${ariaLabel}-modal-box`}>
            <Modal.Header>
                Register Book
                <CloseButton onClick={onClose} data-testid={`${ariaLabel}-close-btn`} />
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Formik
                        initialValues={initialForm}
                        onSubmit={handleSubmit}
                        validate={(values) => {
                            const errors: { title?: string; author?: string } = {};
                            if (!values.title) {
                                errors.title = "Required";
                            }
                            if (!values.author) {
                                errors.author = "Required";
                            }
                            return errors;
                        }}
                    >
                        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
                            <Form onSubmit={handleSubmit}>
                                {FormInfoGroup.map((form) => {
                                    const formError = Object.keys(errors).find((key) => key === form.name);
                                    const formMessage = Object.entries(errors).find((group) => {
                                        return group[0] === form.name;
                                    });
                                    const formValue = Object.entries(values).find((group) => {
                                        return group[0] === form.name;
                                    });
                                    return (
                                        <Form.Group className="mb-2" key={`${ariaLabel}-input-${form.name}`}>
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                role="textbox"
                                                type={form.type}
                                                placeholder={form.placeholder}
                                                name={form.name}
                                                value={formValue && formValue[1]}
                                                onChange={handleChange}
                                            ></Form.Control>
                                            {formError && formMessage && (
                                                <Form.Text aria-label={`error-text-${form.name}`} color="danger">
                                                    {formMessage[1]}
                                                </Form.Text>
                                            )}
                                        </Form.Group>
                                    );
                                })}
                                <div className="d-flex mt-4">
                                    <Button className="w-50" onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        role="button"
                                        name="Register"
                                        className="w-50"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Register
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default RegisterBookModal;
