import React, { useState } from "react";

import RGL, { WidthProvider } from "react-grid-layout";
import styled from "styled-components";

import { BoxUnit } from "../GridPage";

import { GridBoxItem } from "./GridBoxItem";

const ReactGridLayout = WidthProvider(RGL);

interface GridEntryProps {
    initialLayout: BoxUnit[];
}

export const GridEntryBox = (props: GridEntryProps) => {
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
                    {layout.map((box, idx) => {
                        if (idx === 0) {
                            return (
                                <StyledGridBox key={`box_${idx}`}>
                                    <GridBoxItem
                                        keyId="box_0"
                                        chartType="line"
                                        height={box.h * defaultSetting.rowHeight}
                                    />
                                </StyledGridBox>
                            );
                        } else if (idx === 2) {
                            return (
                                <StyledGridBox key={`box_${idx}`}>
                                    <GridBoxItem
                                        keyId={`box_${idx}`}
                                        chartType="dounut"
                                        height={box.h * defaultSetting.rowHeight}
                                    />
                                </StyledGridBox>
                            );
                        } else {
                            return (
                                <StyledGridBox key={`box_${idx}`}>
                                    <GridBoxItem
                                        keyId={`box_${idx}`}
                                        chartType="bar"
                                        height={box.h * defaultSetting.rowHeight}
                                    />
                                </StyledGridBox>
                            );
                        }
                    })}
                </ReactGridLayout>
            )}
        </div>
    );
};

const StyledGridBox = styled.div`
    background-color: #ffffff;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
`;
