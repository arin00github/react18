import React, { useState, useEffect, useCallback } from "react";

import { Modal, Button, Form, CloseButton } from "react-bootstrap";

type CreateAccountModalProps = {
    visible: boolean;
    onClose: () => void;
};

type FormProps = {
    email: string;
    password: string;
};

const CreateAccountModal = ({ visible, onClose }: CreateAccountModalProps) => {
    const [form, setForm] = useState<FormProps>({
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const resetForm = useCallback(() => {
        setForm({ ...form, email: "", password: "" });
    }, [form]);

    // useEffect(() => {
    //     resetForm();
    //     // return () => {
    //     //     resetForm();
    //     // };
    // }, [resetForm]);

    return (
        <Modal show={visible} centered data-testid="create-account-modal">
            <Modal.Header>
                Create New Account
                <CloseButton
                    onClick={() => {
                        onClose();
                        resetForm();
                    }}
                    data-testid="close-modal-btn"
                />
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                role="textbox"
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={form.email}
                                onChange={handleInputChange}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                role="textbox"
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={form.password}
                                onChange={handleInputChange}
                            ></Form.Control>
                        </Form.Group>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>Cancel</Button>
                <Button>Create</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateAccountModal;
