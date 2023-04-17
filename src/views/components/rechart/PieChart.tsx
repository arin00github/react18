import React, { useState } from "react";

import {
    PieChart as PieChartGraph,
    ResponsiveContainer,
    Tooltip,
    Legend,
    Pie,
    Cell,
    PieLabelRenderProps,
} from "recharts";
import styled from "styled-components";

import { ChartBoxWrap } from "../../../style";
import { DataType } from "../../../types/d3-interface";
import { PieChartProps } from "../../../types/grid-interface";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const PieChart = <T extends DataType>(props: PieChartProps<T>) => {
    const { data, option } = props;

    const [activeIndex, setActiveIndex] = useState<number>(0);

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = (params: PieLabelRenderProps) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, percent } = params;

        if (outerRadius && midAngle && percent && cx && cy) {
            const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
            const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
            const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

            return (
                <text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor={typeof cx === "number" && x > cx ? "start" : "end"}
                    dominantBaseline="central"
                >
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
        }
    };

    return (
        <ChartBoxWrap background={option?.background}>
            {option?.title && <ChartTitle>{option.title}</ChartTitle>}
            <ResponsiveContainer width="100%" height="100%">
                <PieChartGraph width={260} height={260}>
                    <Pie
                        activeIndex={activeIndex}
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((dataItem, index) => (
                            <Cell key={`key-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChartGraph>
            </ResponsiveContainer>
        </ChartBoxWrap>
    );
};

const ChartTitle = styled.h5`
    color: white;
    text-align: center;
`;
