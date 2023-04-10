import React, { useRef } from "react";

import { ChartBoxWrap } from "../../../style";
import { DataType } from "../../../types/d3-interface";
import { PieChartProps } from "../../../types/grid-interface";

import { DounutChart } from "./DounutChart";

interface DounutChartWrapProps<T extends DataType> extends PieChartProps<T> {
    data: T[];
}
export const DounutChartWrap = <T extends DataType>({ data, option }: DounutChartWrapProps<T>) => {
    const chartWrap = useRef<HTMLDivElement | null>(null);

    return (
        <ChartBoxWrap
            background={option?.background}
            style={{ width: "100%", height: "100%", position: "absolute" }}
            ref={chartWrap}
        >
            {chartWrap.current && data && (
                <DounutChart
                    data={data}
                    option={{ width: chartWrap.current.clientWidth, height: chartWrap.current.clientHeight, ...option }}
                />
            )}
        </ChartBoxWrap>
    );
};
