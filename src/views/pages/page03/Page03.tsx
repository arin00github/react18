import React from "react";

import { UseDiscloser } from "../../../service/hooks/UseDiscloser";
import { CustomButton } from "../../../style";
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
                        <CustomButton onClick={openModal} aria-label="create-account-btn">
                            Create New Account
                        </CustomButton>
                        <h2>Modal TDD</h2>
                    </div>
                </div>
            </div>
            <CreateAccountModal visible={modalVisible} onClose={closeModal} />
        </>
    );
};

export default Page03;
