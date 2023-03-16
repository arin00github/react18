import React, { ReactNode } from "react";

import styled from "styled-components";

import { useAppSelector } from "../../redux/hook";

type MainBodyProps = {
    children: ReactNode;
};

export function MainBody({ children }: MainBodyProps) {
    const storedCommon = useAppSelector((state) => state.common);

    return (
        <StyledMainBody isOpen={storedCommon.isOpenedAside}>
            <div className="body-inner">{children}</div>
        </StyledMainBody>
    );
}

const StyledMainBody = styled.div<{ isOpen: boolean }>`
    width: ${(props) => (props.isOpen ? "calc(100% - 60px)" : "100%")};
    height: 100vh;
    margin-left: ${(props) => (props.isOpen ? "60px" : "0px")};
    background-color: #111136;
    .body-inner {
        //padding: 0 3rem;
    }
`;
