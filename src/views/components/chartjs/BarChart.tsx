import React, { useMemo } from "react";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

import { ChartBoxWrap } from "../../../style";
import { DataType } from "../../../types/d3-interface";
import { BarChartProps } from "../../../types/grid-interface";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart = <T extends DataType>(props: BarChartProps<T>) => {
    const { data, option } = props;
    const customOptions = useMemo(() => {
        return {
            responsive: true,
            plugins: {
                legend: {
                    position: "top" as const,
                },
                title: {
                    display: true,
                    text: option?.title || "No Title",
                },
            },
        };
    }, [option?.title]);

    const customData = useMemo(() => {
        return {
            labels: data.map((dataset) => dataset.name),
            datasets: [
                {
                    label: "Dataset 1",
                    data: data.map((dataset) => dataset.value),
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
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
