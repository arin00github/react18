import React from "react";

import { UseDiscloser } from "../../../service/hooks/UseDiscloser";
import { CustomButton } from "../../../style";
import { PageTitle } from "../../layouts/PageTitle";

import CreateAccountModal from "./modal/CreateAccountModal";
import RegisterBookModal from "./modal/RegisterBookModal";

const Page03 = () => {
    const { visible: modalVisible, onClose: closeModal, onOpen: openModal } = UseDiscloser({ defaultVisible: false });
    const {
        visible: modalVisible2,
        onClose: closeModal2,
        onOpen: openModal2,
    } = UseDiscloser({ defaultVisible: false });

    return (
        <>
            <div>
                <PageTitle title="Page03" />
                <div>
                    <div className="mt-4">
                        <CustomButton onClick={openModal} aria-label="create-account-btn">
                            Create New Account
                        </CustomButton>
                    </div>
                    <div>
                        <CustomButton onClick={openModal2}>Register Book</CustomButton>
                    </div>
                </div>
            </div>
            <CreateAccountModal visible={modalVisible} onClose={closeModal} />
            <RegisterBookModal visible={modalVisible2} onClose={closeModal2} ariaLabel="register-book" />
        </>
    );
};

export default Page03;
