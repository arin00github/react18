import React from "react";

import * as d3 from "d3";
import {
    LineChart as LineCharGraph,
    Tooltip,
    Legend,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Line,
    CartesianGrid,
    Text,
} from "recharts";
import styled from "styled-components";

import { ChartBoxWrap } from "../../../style";
import { DataType } from "../../../types/d3-interface";
import { LineChartProps } from "../../../types/grid-interface";

export const LineChart = <T extends DataType>(props: LineChartProps<T>): JSX.Element => {
    const { data, option } = props;

    return (
        <ChartBoxWrap background={option?.background}>
            {option?.title && <ChartTitle>{option.title}</ChartTitle>}
            <ResponsiveContainer width={"100%"} height={option?.title ? "92%" : "100%"}>
                <LineCharGraph
                    data={data}
                    margin={option?.margin ? option.margin : { top: 20, left: 20, bottom: 20, right: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 1" />
                    <XAxis
                        dataKey="date"
                        fontSize={10}
                        tickSize={5}
                        interval={7}
                        tickFormatter={(value) => {
                            return `${value.slice(5)}`;
                        }}
                    />
                    <YAxis color="#fff" stroke="#ffffffb1" />
                    {option?.tooltip?.display && <Tooltip />}

                    <Legend />
                    <Line
                        dataKey="value"
                        isAnimationActive={false}
                        stroke={option?.lineStyle?.strokeColor ? option.lineStyle.strokeColor : "#75e1ff"}
                        strokeWidth={option?.lineStyle?.strokeWidth ? option.lineStyle.strokeWidth : 2}
                    />
                </LineCharGraph>
            </ResponsiveContainer>
        </ChartBoxWrap>
    );
};

const ChartTitle = styled.h5`
    color: white;
    text-align: center;
`;

const StyledTooltip = styled.div`
    padding: 8px;
    background-color: #fff;
    border-radius: 4px;
`;
