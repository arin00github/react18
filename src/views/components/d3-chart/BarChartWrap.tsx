import React, { useRef } from "react";

import { DataType } from "../../pages/d3/ChartPage";

import { BarChart, BarChartProps } from "./BarChart";

export const BarChartWrap = <T extends DataType>({ data, option }: BarChartProps<T>) => {
    const chartWrap = useRef<HTMLDivElement | null>(null);

    return (
        <div style={{ width: "50%", height: 400 }} ref={chartWrap}>
            {chartWrap.current && data && (
                <BarChart
                    data={data}
                    option={{ width: chartWrap.current.clientWidth, height: chartWrap.current.clientHeight, ...option }}
                />
            )}
        </div>
    );
};
