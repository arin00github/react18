import React from "react";

import styled from "styled-components";

type PageTitleProps = {
    title: string;
};

const PageTitleWrap = styled.div`
    margin-top: 1rem;
    margin-bottom: 1.5rem;
`;

export function PageTitle({ title }: PageTitleProps) {
    return (
        <PageTitleWrap>
            <h2 aria-label={`page-title-${title}`}>{title}</h2>
        </PageTitleWrap>
    );
}
