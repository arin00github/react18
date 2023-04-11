import React, { useMemo } from "react";

import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";

import { ChartBoxWrap } from "../../../style";
import { AllChartProps, DataType } from "../../../types/grid-interface";

export const CustomChart = <T extends DataType>(props: AllChartProps<T>) => {
    const { chart, type } = props;

    console.log("chart.data", chart.data, chart.data.length > 0);

    const customOption = useMemo(() => {
        return {
            gird: {
                borderColor: "#fff",
            },
            xAxis: {
                type: "category",
                data: chart.data.map((dataset) => (type === "line" ? dataset.date : dataset.name)),
                axisLabel: {
                    color: "#fff",
                },
                axisLine: {
                    show: chart.data.length > 0 ? true : false,
                    lineStyle: {
                        color: "#fff",
                    },
                },
                interval: 5,
                formatter: function (value: any) {
                    // 눈금의 표시 포맷을 설정할 수 있습니다.
                    // 예를 들어, 날짜를 'MM-DD' 형식으로 표시하고 싶을 경우
                    return echarts.format.formatTime("MM-DD", value);
                },
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    color: "#fff",
                },
            },
            series: [
                {
                    data: chart.data.map((dataset) => dataset.value),
                    type: type,
                },
            ],
        };
    }, [chart.data, type]);

    console.log("customOption", customOption);

    return (
        <>
            {chart.data.length > 0 ? (
                <ChartBoxWrap background={chart.option?.background}>
                    <ReactECharts option={customOption} />
                </ChartBoxWrap>
            ) : (
                <div>no chart</div>
            )}
        </>
    );
};
