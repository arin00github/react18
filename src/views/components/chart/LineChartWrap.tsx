import React, { useRef } from "react";

import { DataType } from "../../pages/d3/ChartPage";

import { LineChart, LineChartProps } from "./LineChart";

export const LineChartWrap = <T extends DataType>({ data, option }: LineChartProps<T>) => {
    const chartWrap = useRef<HTMLDivElement | null>(null);

    return (
        <div style={{ width: "50%", height: 280 }} ref={chartWrap}>
            {chartWrap.current && data && (
                <LineChart
                    data={data}
                    option={{ width: chartWrap.current.clientWidth, height: chartWrap.current.clientHeight, ...option }}
                />
            )}
        </div>
    );
};
