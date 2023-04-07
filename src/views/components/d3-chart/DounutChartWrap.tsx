import React, { useRef } from "react";

import { DataType } from "../../../types/d3-interface";
import { PieChartProps } from "../../../types/grid-interface";

import { DounutChart } from "./DounutChart";

interface DounutChartWrapProps<T extends DataType> extends PieChartProps<T> {
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
