import React from "react";

import { Modal, Button, Form, CloseButton } from "react-bootstrap";

type CreateAccountModalProps = {
    visible: boolean;
    onClose: () => void;
};

const CreateAccountModal = ({ visible, onClose }: CreateAccountModalProps) => {
    return (
        <Modal show={visible} centered data-testid="create-account-modal">
            <Modal.Header>
                Create New Account
                <CloseButton onClick={onClose} data-testid="close-modal-btn" />
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password"></Form.Control>
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
