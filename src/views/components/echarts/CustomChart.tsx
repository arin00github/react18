import React, { useCallback, useEffect, useMemo, useState } from "react";

import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";

import { ChartBoxWrap } from "../../../style";
import { AllChartProps, DataType } from "../../../types/grid-interface";

export const CustomChart = <T extends DataType>(props: AllChartProps<T>) => {
    const { chart, type } = props;

    console.log("chart.data", chart.data, chart.data.length > 0);

    const customOption = useMemo(() => {
        return {
            xAxis: {
                type: "category",
                data: chart.data.map((dataset) => dataset.date),
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
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    color: "#ffffff",
                },
            },
            series: [
                {
                    data: chart.data.map((dataset) => dataset.value),
                    type: "line",
                },
            ],
        };
    }, [chart.data]);

    const barCustomOption = useMemo(() => {
        return {
            grid: {
                borderColor: "#fff",
            },
            xAxis: {
                type: "category",
                data: chart.data.map((dataset) => dataset.name),
                axisLabel: {
                    color: "#fff",
                    interval: 0,
                    //rotate: 50,
                },
                axisLine: {
                    show: chart.data.length > 0 ? true : false,
                    lineStyle: {
                        color: "#ffffff6b",
                    },
                },
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    color: "#fff",
                    formatter: (value: number) => {
                        return value + "%";
                    },
                },
            },
            series: [
                {
                    data: chart.data.map((dataset) => dataset.value),
                    type: "bar",
                },
            ],
        };
    }, [chart.data]);

    const pieCustomOption = useMemo(() => {
        return {
            title: {
                text: "Pie Chart Example",
                left: "center",
                top: 14,
                textStyle: {
                    color: "#ccc",
                },
            },
            legend: {
                orient: "vertical",
                left: "left",
                textStyle: {
                    color: "#fff",
                },
            },
            tooltip: {
                trigger: "item",
                //formatter: "{a} <br/>{b}: {c} ({d}%)",
            },
            xAxis: {
                show: false,
            },
            series: [
                {
                    radius: "50%",
                    data: chart.data,
                    type: "pie",
                    label: {
                        show: true,
                        textBorderWidth: 0,
                    },
                    labelLine: {
                        show: true,
                    },
                    emphasis: {
                        label: {
                            show: true,
                        },
                    },
                },
            ],
        };
    }, [chart.data]);

    const [option, setOption] = useState<any>(undefined);

    const optionByChartType = useCallback(
        (type: string) => {
            switch (type) {
                case "line":
                    setOption(customOption);
                    break;
                case "bar":
                    setOption(barCustomOption);
                    break;
                case "pie":
                    setOption(pieCustomOption);
                    break;
                default:
                    setOption(customOption);
                    return;
            }
        },
        [barCustomOption, customOption, pieCustomOption]
    );

    useEffect(() => {
        optionByChartType(type);
    }, [optionByChartType, type]);

    return (
        <>
            {chart.data.length > 0 ? (
                <ChartBoxWrap background={chart.option?.background}>
                    {option && <ReactECharts style={{ height: "100%" }} option={option} />}
                </ChartBoxWrap>
            ) : (
                <div>no chart</div>
            )}
        </>
    );
};
