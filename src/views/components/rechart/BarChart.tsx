import React, { useEffect, useRef, useState } from "react";

import {
    BarChart as BarChartGraph,
    Tooltip,
    Legend,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Line,
    CartesianGrid,
    Bar,
} from "recharts";
import styled from "styled-components";

import { ChartBoxWrap } from "../../../style";
import { DataType } from "../../../types/d3-interface";
import { BarChartProps } from "../../../types/grid-interface";

export const BarChart = <T extends DataType>(props: BarChartProps<T>): JSX.Element => {
    const { data, option } = props;

    return (
        <ChartBoxWrap background={option?.background}>
            {option?.title && <ChartTitle>{option.title}</ChartTitle>}
            <ResponsiveContainer width={"100%"} height={option?.title ? "92%" : "100%"}>
                <BarChartGraph
                    data={data}
                    margin={option?.margin ? option.margin : { top: 20, left: 20, bottom: 20, right: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 1" opacity={0.4} />
                    <XAxis dataKey="name" fontSize={10} stroke="#ffffffb1" />
                    <YAxis
                        fontSize={10}
                        color="#fff"
                        stroke="#ffffffb1"
                        tickFormatter={(data: number) => data.toString() + "%"}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar data={data} dataKey="value" fill="#76b7ed" />
                </BarChartGraph>
            </ResponsiveContainer>
        </ChartBoxWrap>
    );
};

const ChartTitle = styled.h5`
    color: white;
    text-align: center;
`;
