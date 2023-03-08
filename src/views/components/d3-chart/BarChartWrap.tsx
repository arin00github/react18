import React, { useRef } from "react";

import { DataType } from "../../../types/d3-interface";

import { BarChart } from "./BarChart";
import { LineChartProps } from "./LineChart";

interface BarChartWrapProps<T extends DataType> extends LineChartProps<T> {
    height: number;
    data: T[];
}
export const BarChartWrap = <T extends DataType>({ data, option, height }: BarChartWrapProps<T>) => {
    const chartWrap = useRef<HTMLDivElement | null>(null);

    return (
        <div style={{ width: "100%", height: height }} ref={chartWrap}>
            {chartWrap.current && data && (
                <BarChart
                    data={data}
                    option={{ width: chartWrap.current.clientWidth, height: chartWrap.current.clientHeight, ...option }}
                />
            )}
        </div>
    );
};
