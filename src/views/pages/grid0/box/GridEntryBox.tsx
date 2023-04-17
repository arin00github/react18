import React, { useState } from "react";

import { Button } from "react-bootstrap";
import RGL, { WidthProvider, Layout, Responsive, Layouts } from "react-grid-layout";
import styled, { css } from "styled-components";

//import { GridBoxItem } from "./GridBoxItem";
import { GridBoxItem2 } from "./GridBoxItem2";

export type BoxUnit = {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
};

export class Unit {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
    constructor(x: number, y: number, w: number, h: number, i: string) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.i = i.toString();
    }
    make() {
        return { x: this.x, y: this.y, w: this.w, h: this.h, i: this.i };
    }
}
/**
 * i 값이 Grid Box의 key 값 하고 일치해야 한다
 */

// (0,0) 에서 시작해서 (12,4)단위를 가지는 박스를 제작

const unit01 = new Unit(0, 0, 4, 6, "box_0&type=line").make();
const unit02 = new Unit(4, 0, 8, 6, "box_1&type=bar").make();
const unit03 = new Unit(12, 0, 4, 6, "box_2&type=dounut").make();
const unit04 = new Unit(0, 6, 8, 6, "box_3&type=bar").make();

const initialLayout = [unit01, unit02, unit03, unit04];

const mdunit01 = new Unit(0, 0, 4, 6, "box_0&type=line").make();
const mdunit02 = new Unit(4, 0, 2, 6, "box_1&type=bar").make();
const mdunit03 = new Unit(3, 4, 3, 6, "box_2&type=dounut").make();
const mdunit04 = new Unit(0, 4, 3, 6, "box_3&type=bar").make();

const mdLayout = [mdunit01, mdunit02, mdunit03, mdunit04];

const ReactGridLayout = WidthProvider(RGL);

const ResponsiveGridLayout = WidthProvider(Responsive);

type StyledProps = {
    style?: Record<string, string>;
};

export const GridEntryBox = () => {
    const [layout, setLayout] = useState<RGL.Layout[]>(initialLayout);

    console.log("layout", layout);

    const defaultSetting = {
        className: "layout",
        rowHeight: 40, // 높이 1 당 기본 단위
        cols: 16, // 전체 너비를 16 column으로 나눔
    };

    const onLayoutChange = (layout: RGL.Layout[]) => {
        setLayout(layout);
    };

    // const handleAddBox = () => {
    //     const newItem = handleAddNewBox(layout);
    //     setLayout([...layout, newItem]);
    // };

    // function removeDuplicates(arr: number[]): number[] {
    //     const uniqueArr = Array.from(new Set(arr));
    //     uniqueArr.sort((a, b) => a - b);
    //     return uniqueArr;
    // }

    // const handleAddNewBox = (layout: Layout[]) => {
    //     const ygroup = layout.map((val) => val.y);
    //     const ySet = removeDuplicates(ygroup);

    //     let xTargetValue = 0;
    //     let yTargetValue = 0;
    //     let totalH = 0;
    //     for (let j = 0; j < ySet.length; j++) {
    //         yTargetValue = ySet[j];
    //         const yValueBoxes = layout.filter((val) => val.y === ySet[j]);
    //         const xValueBoxes = layout.filter((val) => val.x === 0);

    //         let totalValue = 0;
    //         totalH = 0;
    //         for (let k = 0; k < yValueBoxes.length; k++) {
    //             totalH += xValueBoxes[k].h;
    //         }
    //         for (let i = 0; i < yValueBoxes.length; i++) {
    //             totalValue += yValueBoxes[i].w;
    //         }

    //         xTargetValue = 16 - totalValue;

    //         if (xTargetValue > 0) break;
    //     }
    //     xTargetValue = 16 - xTargetValue;

    //     if (xTargetValue === 0) {
    //         yTargetValue = totalH;
    //         console.log("x is 0", yTargetValue);
    //     } else {
    //         const findBox = layout.find((val) => val.x === 12);
    //         if (findBox) {
    //             yTargetValue = findBox.h;
    //             xTargetValue = findBox.h >= totalH ? 0 : xTargetValue;
    //         }
    //         console.log("x is not 0", yTargetValue);
    //     }

    //     console.log(`xTargetValue: ${xTargetValue} , yTargetValue: ${yTargetValue}`);

    //     const newItem = new Unit(xTargetValue, yTargetValue, 4, 4, `box_${layout.length}type=box`).make();
    //     console.log("newItem", newItem);
    //     return newItem;
    // };

    const layouts = {
        lg: initialLayout,
        md: mdLayout,
    };

    return (
        <div>
            {/* <div>
                <Button onClick={handleAddBox}>박스 추가</Button>
            </div> */}
            {/* {layout && (
                <ReactGridLayout
                    layout={layout}
                    onLayoutChange={onLayoutChange}
                    cols={16}
                    rowHeight={40}
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
            )} */}
            {layout && (
                <ResponsiveGridLayout
                    layouts={layouts}
                    onLayoutChange={onLayoutChange}
                    breakpoints={{ lg: 1200, md: 600 }}
                    cols={{ lg: 16, md: 6 }}
                    rowHeight={40}
                    //compactType="horizontal"
                    //verticalCompact={true}
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
                </ResponsiveGridLayout>
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
