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
    width: calc(100% - 240px);
    margin-left: 240px;

    .body-inner {
        padding: 0 3rem;
    }
`;
