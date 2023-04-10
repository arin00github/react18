import React, { useRef } from "react";

import { ChartBoxWrap } from "../../../style";
import { DataType } from "../../../types/d3-interface";
import { BarChartProps } from "../../../types/grid-interface";

import { BarChart } from "./BarChart";

interface BarChartWrapProps<T extends DataType> extends BarChartProps<T> {
    data: T[];
}
export const BarChartWrap = <T extends DataType>({ data, option }: BarChartWrapProps<T>) => {
    const chartWrap = useRef<HTMLDivElement | null>(null);

    return (
        <ChartBoxWrap background={option?.background} style={{ width: "100%", height: "100%" }} ref={chartWrap}>
            {chartWrap.current && data && (
                <BarChart
                    data={data}
                    option={{ width: chartWrap.current.clientWidth, height: chartWrap.current.clientHeight, ...option }}
                />
            )}
        </ChartBoxWrap>
    );
};
