import React, { useState } from "react";

import RGL, { WidthProvider } from "react-grid-layout";
import styled, { css } from "styled-components";

import { BoxUnit } from "../GridPage";

import { GridBoxItem } from "./GridBoxItem";
import { GridBoxItem2 } from "./GridBoxItem2";

const ReactGridLayout = WidthProvider(RGL);

interface GridEntryProps {
    initialLayout: BoxUnit[];
}

type StyledProps = {
    style?: Record<string, string>;
};

export const GridEntryBox = (props: GridEntryProps) => {
    const { initialLayout } = props;

    const [layout, setLayout] = useState<BoxUnit[]>(initialLayout);

    const defaultSetting = {
        className: "layout",
        item: 6,
        rowHeight: 50,
        cols: 16,
    };

    const onLayoutChange = (layout: RGL.Layout[]) => {
        console.log("layout", layout);
        setLayout(layout);
    };

    return (
        <div>
            {layout && (
                <ReactGridLayout layout={layout} onLayoutChange={onLayoutChange} {...defaultSetting}>
                    {layout.map((box) => {
                        return (
                            <StyledGridBox key={box.i}>
                                <GridBoxItem2
                                    keyId={box.i}
                                    chartType={box.i.split("&type=")[1]}
                                    height={box.h * defaultSetting.rowHeight}
                                />
                            </StyledGridBox>
                        );
                    })}
                </ReactGridLayout>
            )}
        </div>
    );
};

const StyledGridBox = styled.div<StyledProps>`
    background-color: #ffffff16;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    ${({ style }) =>
        style &&
        css`
            ${Object.keys(style).map((key) => `${key}: ${style[key]};`)}
        `}
`;
