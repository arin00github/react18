import React, { ReactNode } from "react";

import styled from "styled-components";

type FloatPageLayoutProps = {
    children: ReactNode;
};

export const FloatPageLayout = ({ children }: FloatPageLayoutProps) => {
    return (
        <StyledFloatPage>
            <div className="fp-background"></div>
            <div className="fp-container">
                <div className="container-inner">{children}</div>
            </div>
        </StyledFloatPage>
    );
};

const StyledFloatPage = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .fp-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #0000002e;
    }
    .fp-container {
        position: absolute;
        height: calc(100% - 80px);
        background-color: #fff;
        border-radius: 12px;
        top: 40px;
        left: 280px;
        right: 40px;
        z-index: 50;
        .container-inner {
            padding: 30px;
        }
    }
`;
