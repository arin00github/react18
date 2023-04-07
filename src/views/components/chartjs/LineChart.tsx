import React, { useMemo } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { ChartBoxWrap } from "../../../style";
import { DataType, LineChartProps } from "../../../types/grid-interface";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const LineChart = <T extends DataType>(props: LineChartProps<T>) => {
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
            <Line options={customOptions} data={customData} />
        </ChartBoxWrap>
    );
};
