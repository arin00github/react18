import React, { useMemo } from "react";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import type { ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";

import { ChartBoxWrap } from "../../../style";
import { DataType } from "../../../types/d3-interface";
import { BarChartProps } from "../../../types/grid-interface";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart = <T extends DataType>(props: BarChartProps<T>) => {
    const { data, option } = props;
    const customOptions: ChartOptions<"bar"> = useMemo(() => {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top" as const,
                    labels: {
                        color: "#fff",
                    },
                },
                title: {
                    display: true,
                    text: option?.title || "No Title",
                    color: "white",
                },
            },
            layout: {
                padding: {
                    left: 20,
                    right: 30,
                    top: 0,
                    bottom: 0,
                },
            },
            scales: {
                xAxis1: {
                    grid: {
                        color: "#fff",
                    },
                    ticks: {
                        color: "#fff",
                        fontSize: 8,
                        //stepSize: 20,
                    },
                },
                yAxis1: {
                    grid: {
                        color: "#fff",
                    },
                    ticks: {
                        color: "#fff",
                        // callback(tickValue) {
                        //     const million = 1000000;

                        //     if (typeof tickValue === "number") {
                        //         console.log("tickValue / million", tickValue / million);
                        //         return (tickValue / million).toLocaleString() + " 만";
                        //     } else {
                        //         return tickValue;
                        //     }
                        // },
                    },
                },
            },
            //barThickness: 20,
            barPercentage: 0.8,
            categoryPercentage: 0.9,
        };
    }, [option?.title]);

    const customData = useMemo(() => {
        return {
            labels: data.map((dataset) => dataset.name),
            datasets: [
                {
                    label: "Dataset 1",
                    yAxisID: "yAxis1",
                    xAxisID: "xAxis1",
                    data: data.map((dataset) => dataset.value),
                    backgroundColor: "rgba(255, 99, 132)",
                },
            ],
        };
    }, [data]);

    return (
        <ChartBoxWrap background={option?.background}>
            <Bar options={customOptions} data={customData} />
        </ChartBoxWrap>
    );
};
