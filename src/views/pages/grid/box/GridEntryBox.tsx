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
    //onChange: (layout: any) => void;
    cols: number;
}

export const GridEntryBox = (): JSX.Element => {
    const [layoutObject, setLayoutObject] = useState<IGridLayout>({
        className: "layout",
        items: 8,
        rowHeight: 60,
        cols: 12,
    });

    const [gridArray, setGridArray] = useState<IGridSetting[]>();

    const generateLayout = () => {
        console.log("generateLayout");
        const newArray: IGridSetting[] = Array.from({ length: layoutObject.items }, (item, it) => {
            const y = Math.ceil(Math.random() * 4) + 1;
            return {
                x: (it * 2) % 12,
                y: Math.floor(it / 6) * y,
                w: 2,
                h: y,
                i: it.toString(),
            };
        });
        return newArray;
    };

    console.log("gridArray", gridArray);

    const handleChangeLayout = (layout: RGL.Layout[]) => {
        console.log("layout", layout);
        setGridArray(layout);
    };

    useEffect(() => {
        if (!gridArray) {
            const createdArray = generateLayout();
            console.log("createdArray", createdArray);
            setGridArray(createdArray);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gridArray]);
    return (
        <div style={{ width: 1800, height: 700 }}>
            {gridArray && (
                <ReactGridLayout
                    width={1000}
                    isResizable={true}
                    layout={gridArray}
                    onLayoutChange={handleChangeLayout}
                    {...layoutObject}
                    rowHeight={90}
                >
                    {gridArray.map((box, idx) => (
                        <div style={{ backgroundColor: "#a3c5ff" }} key={`div_${idx}`}>
                            {idx}
                        </div>
                    ))}
                </ReactGridLayout>
            )}
        </div>
    );
};
