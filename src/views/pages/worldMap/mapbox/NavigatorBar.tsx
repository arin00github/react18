import React, { useState } from "react";

import { Form } from "react-bootstrap";
import styled from "styled-components";

export const NavigatorBar = () => {
    const [searchWord, setSearchWord] = useState<string>("");

    return (
        <StyledNavigationBar>
            <div>
                <Form.Control name="country" />
            </div>
        </StyledNavigationBar>
    );
};

const StyledNavigationBar = styled.div`
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0px 7px 18px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 40px;
    left: 280px;
    width: 480px;
    height: 60px;
`;
