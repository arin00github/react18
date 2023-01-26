import React, { useState } from "react";

import { Tabs, Tab, Row, Col, Nav, Button } from "react-bootstrap";

import { UseDiscloser } from "../../../service/hooks/UseDiscloser";
import { PageTitle } from "../../layouts/PageTitle";

import CreateAccountModal from "./modal/CreateAccountModal";

const Page03 = () => {
    // const [tabkey, setTabkey] = useState<string>("tab01");

    // const changeTabkey = (selectedTab: string) => {
    //     setTabkey(selectedTab);
    // };

    const { visible: modalVisible, onClose: closeModal, onOpen: openModal } = UseDiscloser({ defaultVisible: false });

    return (
        <>
            <div>
                <PageTitle title="Page03" />
                <div>
                    {/* <Tab.Container id="page03-tabs" defaultActiveKey="first">
                        <Row>
                            <Col sm={2}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Tab 1</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Tab 2</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={10}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <div>first tab</div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <div>second tab</div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container> */}
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
