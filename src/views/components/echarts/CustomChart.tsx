import React, { useMemo } from "react";

import ReactECharts from "echarts-for-react";

import { ChartBoxWrap } from "../../../style";
import { AllChartProps, DataType } from "../../../types/grid-interface";

export const CustomChart = <T extends DataType>(props: AllChartProps<T>) => {
    const { chart, type } = props;

    const customOption = useMemo(() => {
        return {
            xAxis: {
                type: "category",
                data: chart.data.map((dataset) => dataset.name),
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    data: chart.data.map((dataset) => dataset.value),
                    type: type,
                },
            ],
        };
    }, [chart.data, type]);

    return (
        <ChartBoxWrap background={chart.option?.background}>
            <ReactECharts option={customOption} />
        </ChartBoxWrap>
    );
};
