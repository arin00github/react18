import React, { useRef } from "react";

import { DataType } from "../../../types/d3-interface";

import { LineChart, LineChartProps } from "./LineChart";

interface LineChartWrapProps<T extends DataType> extends LineChartProps<T> {
    height: number;
    data: T[];
}

export const LineChartWrap = <T extends DataType>({ data, option, height }: LineChartWrapProps<T>) => {
    const chartWrap = useRef<HTMLDivElement | null>(null);

    return (
        <div style={{ width: "100%", height: height }} ref={chartWrap}>
            {chartWrap.current && data && (
                <LineChart
                    data={data}
                    option={{ width: chartWrap.current.clientWidth, height: chartWrap.current.clientHeight, ...option }}
                />
            )}
        </div>
    );
};
