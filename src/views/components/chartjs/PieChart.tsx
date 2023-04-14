import React, { useMemo } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartOptions } from "chart.js";
import { Pie } from "react-chartjs-2";

import { ChartBoxWrap } from "../../../style";
import { DataType, PieChartProps } from "../../../types/grid-interface";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = <T extends DataType>(props: PieChartProps<T>) => {
    const { data, option } = props;
    const customData = useMemo(() => {
        return {
            labels: data.map((dataset) => dataset.name),
            datasets: [
                {
                    label: "# of Votes",
                    data: data.map((dataset) => dataset.value),
                    backgroundColor: [
                        "rgba(255, 99, 132)",
                        "rgba(54, 162, 235)",
                        "rgba(255, 206, 86)",
                        "rgba(75, 192, 192)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        };
    }, [data]);

    const customOption: ChartOptions<"pie"> = useMemo(() => {
        return {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Chart.js Pie Chart",
                    color: "#fff",
                },
                legend: {
                    align: "center",
                    labels: {
                        color: "#fff",
                    },
                },
            },
            layout: {
                padding: 20,
            },
        };
    }, []);

    return (
        <ChartBoxWrap background={option?.background} style={{ display: "flex", justifyContent: "center" }}>
            <Pie data={customData} options={customOption} />
        </ChartBoxWrap>
    );
};
