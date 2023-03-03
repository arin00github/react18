import React from "react";

import { Col, Row } from "react-bootstrap";

import { FormBox } from "./FormBox";

const IndexPage = () => {
    return (
        <div>
            <Row>
                <Col></Col>
                <Col sm="8">
                    <FormBox />
                </Col>
            </Row>
        </div>
    );
};

export default IndexPage;
