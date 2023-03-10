import React, { ReactNode } from "react";

import styled from "styled-components";

type MainBodyProps = {
    children: ReactNode;
};

export function MainBody({ children }: MainBodyProps) {
    return (
        <StyledMainBody>
            <div className="body-inner">{children}</div>
        </StyledMainBody>
    );
}

const StyledMainBody = styled.div`
    width: calc(100% - 60px);
    height: 100vh;
    margin-left: 60px;
    background-color: #35354c;

    .body-inner {
        padding: 0 3rem;
    }
`;
