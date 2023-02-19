import React from "react";

import styled from "styled-components";

type RowDataProps = {
    keyData: string;
    valueData: string | number;
};

export const RowData = ({ keyData, valueData }: RowDataProps) => {
    return (
        <StyledRowData>
            <div className="row-key">{keyData}</div>
            <div className="row-value">{valueData}</div>
        </StyledRowData>
    );
};

const StyledRowData = styled.div`
    display: flex;
    padding: 6px 0;
    border-bottom: 1px solid #d3d3d3;

    .row-key {
        width: 110px;
    }
    .row-value {
        width: calc(100% - 110px);
    }
`;
