import React, { ReactNode } from "react";

import styled from "styled-components";

type MainBodyProps = {
    children: ReactNode;
};

export function MainBody({ children }: MainBodyProps) {
    return (
        <StyledMainBody id="main-body">
            <div className="body-inner">{children}</div>
        </StyledMainBody>
    );
}

const StyledMainBody = styled.div`
    width: 100%;
`;
