import React, { useRef } from "react";

import { ChartBoxWrap } from "../../../style";
import { DataType } from "../../../types/d3-interface";
import { LineChartProps } from "../../../types/grid-interface";

import { LineChart } from "./LineChart";

interface LineChartWrapProps<T extends DataType> extends LineChartProps<T> {
    data: T[];
}

export const LineChartWrap = <T extends DataType>({ data, option }: LineChartWrapProps<T>) => {
    const chartWrap = useRef<HTMLDivElement | null>(null);

    return (
        <ChartBoxWrap background={option?.background} style={{ width: "100%", height: "100%" }} ref={chartWrap}>
            {chartWrap.current && data && (
                <LineChart
                    data={data}
                    option={{ width: chartWrap.current.clientWidth, height: chartWrap.current.clientHeight, ...option }}
                />
            )}
        </ChartBoxWrap>
    );
};
