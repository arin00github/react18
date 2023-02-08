import React from "react";

import { Button } from "react-bootstrap";

import { UseDiscloser } from "../../../service/hooks/UseDiscloser";
import { PageTitle } from "../../layouts/PageTitle";

import CreateAccountModal from "./modal/CreateAccountModal";

const Page03 = () => {
    const { visible: modalVisible, onClose: closeModal, onOpen: openModal } = UseDiscloser({ defaultVisible: false });

    return (
        <>
            <div>
                <PageTitle title="Page03" />
                <div>
                    <div className="mt-4">
                        <Button onClick={openModal} aria-label="create-account-btn">
                            Create New Account
                        </Button>
                    </div>
                </div>
            </div>
            <CreateAccountModal visible={modalVisible} onClose={closeModal} />
        </>
    );
};

export default Page03;
