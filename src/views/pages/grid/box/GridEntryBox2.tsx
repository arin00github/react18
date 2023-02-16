import React, { useEffect, useState } from "react";

import RGL, { WidthProvider } from "react-grid-layout";
import styled from "styled-components";

import { BoxUnit } from "../GridPage";

const ReactGridLayout = WidthProvider(RGL);

interface GridEntryProps {
    initialLayout: BoxUnit[];
}

export const GridEntryBox2 = (props: GridEntryProps) => {
    const { initialLayout } = props;

    const [layout, setLayout] = useState<BoxUnit[]>(initialLayout);

    const defaultSetting = {
        className: "layout",
        item: 4,
        rowHeight: 100,
        cols: 4,
    };

    const onLayoutChange = (layout: RGL.Layout[]) => {
        setLayout(layout);
    };

    return (
        <div>
            {layout && (
                <ReactGridLayout layout={layout} onLayoutChange={onLayoutChange} {...defaultSetting}>
                    {layout.map((box, idx) => (
                        <StyledGridBox key={`box_${idx}`}></StyledGridBox>
                    ))}
                </ReactGridLayout>
            )}
        </div>
    );
};

const StyledGridBox = styled.div`
    background-color: #e49696;
`;
