import React, { useState } from "react";

import { Button } from "react-bootstrap";
import RGL, { WidthProvider, Layout } from "react-grid-layout";
import styled, { css } from "styled-components";

import { BoxUnit, Unit } from "../GridPage";

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
        rowHeight: 40,
        cols: 16,
    };

    const onLayoutChange = (layout: RGL.Layout[]) => {
        setLayout(layout);
    };

    const handleAddBox = () => {
        const newItem = handleAddNewBox(layout);
        setLayout([...layout, newItem]);
    };

    function removeDuplicates(arr: number[]): number[] {
        const uniqueArr = Array.from(new Set(arr));
        uniqueArr.sort((a, b) => a - b);
        return uniqueArr;
    }

    const handleAddNewBox = (layout: Layout[]) => {
        console.log("layout", layout);
        const ygroup = layout.map((val) => val.y);
        const ySet = removeDuplicates(ygroup);

        let xTargetValue = 0;
        let yTargetValue = 0;
        let totalH = 0;
        for (let j = 0; j < ySet.length; j++) {
            yTargetValue = ySet[j];
            const yValueBoxes = layout.filter((val) => val.y === ySet[j]);
            const xValueBoxes = layout.filter((val) => val.x === 0);

            let totalValue = 0;
            totalH = 0;
            for (let k = 0; k < yValueBoxes.length; k++) {
                totalH += xValueBoxes[k].h;
            }
            for (let i = 0; i < yValueBoxes.length; i++) {
                totalValue += yValueBoxes[i].w;
            }

            xTargetValue = 16 - totalValue;

            if (xTargetValue > 0) break;
        }
        xTargetValue = 16 - xTargetValue;

        if (xTargetValue === 0) {
            yTargetValue = totalH;
            console.log("x is 0", yTargetValue);
        } else {
            const findBox = layout.find((val) => val.x === 12);
            if (findBox) {
                yTargetValue = findBox.h;
                xTargetValue = findBox.h >= totalH ? 0 : xTargetValue;
            }
            console.log("x is not 0", yTargetValue);
        }

        console.log(`xTargetValue: ${xTargetValue} , yTargetValue: ${yTargetValue}`);

        const newItem = new Unit(xTargetValue, yTargetValue, 4, 4, `box_${layout.length}type=box`).make();
        return newItem;
    };

    return (
        <div>
            <div>
                <Button onClick={handleAddBox}>박스 추가</Button>
            </div>
            {layout && (
                <ReactGridLayout
                    layout={layout}
                    onLayoutChange={onLayoutChange}
                    {...defaultSetting}
                    compactType="horizontal"
                    verticalCompact={true}
                >
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
