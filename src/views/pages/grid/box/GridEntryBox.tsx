import React, { useCallback, useEffect, useState } from "react";

import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

export interface IGridSetting {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
}

export interface IGridLayout {
    className: string;
    items: number;
    rowHeight: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (layout: any) => void;
    cols: number;
}

export const GridEntryBox = (): JSX.Element => {
    const [layoutObject, setLayoutObject] = useState<IGridLayout>({
        className: "layout",
        items: 20,
        rowHeight: 60,
        cols: 12,
        onChange: () => console.log("params"),
    });

    const [gridArray, setGridArray] = useState<IGridSetting[]>();

    const generateLayout = () => {
        console.log("generateLayout");
        const newArray: IGridSetting[] = Array.from({ length: layoutObject.items }, (item, it) => {
            const y = Math.ceil(Math.random() * 4) + 1;
            return {
                x: (it * 4) % 12,
                y: Math.floor(it / 6) * y,
                w: 2,
                h: y,
                i: it.toString(),
            };
        });
        return newArray;
    };

    const generateDom = () => {
        console.log("generateDom");
        const nodeArray = Array.from({ length: layoutObject.items }, (item, idx) => {
            return (
                <div style={{ backgroundColor: "#a3c5ff" }} key={`div_${idx}`}>
                    {idx}
                </div>
            );
        });
        return nodeArray;
    };

    console.log("gridArray", gridArray);

    const handleChangeLayout = (layout: any) => {
        layoutObject.onChange(layout);
    };

    useEffect(() => {
        if (!gridArray) {
            const createdArray = generateLayout();
            setGridArray(createdArray);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gridArray]);
    return (
        <div>
            {gridArray && (
                <ReactGridLayout layout={gridArray} onLayoutChange={handleChangeLayout} {...layoutObject}>
                    {generateDom()}
                </ReactGridLayout>
            )}
        </div>
    );
};
