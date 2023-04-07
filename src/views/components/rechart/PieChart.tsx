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
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }: PieLabelRenderProps) => {
        if (innerRadius && outerRadius && midAngle && percent && cx && cy) {
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
            <ResponsiveContainer>
                <PieChartGraph width={260} height={260}>
                    <Pie
                        activeIndex={activeIndex}
                        //activeShape={renderActiveShape}
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        innerRadius={10}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        //onMouseEnter={handleChangeActiveIndex}
                    >
                        {data.map((dataItem, index) => (
                            <Cell key={`key-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChartGraph>
            </ResponsiveContainer>
        </ChartBoxWrap>
    );
};

const ChartTitle = styled.h5`
    color: white;
    text-align: center;
`;
