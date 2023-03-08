import React, { useRef } from "react";

import { DataType } from "../../../types/d3-interface";

import { BarChart } from "./BarChart";
import { DounutChart } from "./DounutChart";
import { LineChartProps } from "./LineChart";

interface DounutChartWrapProps<T extends DataType> extends LineChartProps<T> {
    height: number;
    data: T[];
}
export const DounutChartWrap = <T extends DataType>({ data, option, height }: DounutChartWrapProps<T>) => {
    const chartWrap = useRef<HTMLDivElement | null>(null);

    return (
        <div style={{ width: "100%", height: height, position: "absolute" }} ref={chartWrap}>
            {chartWrap.current && data && (
                <DounutChart
                    data={data}
                    option={{ width: chartWrap.current.clientWidth, height: chartWrap.current.clientHeight, ...option }}
                />
            )}
        </div>
    );
};
