import React, { useEffect, useRef, useState } from "react";

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

import { DataType } from "../../../types/d3-interface";

interface TooltipProps {
    x: number;
    y: number;
    content: string;
}

export interface LineChartProps<T extends DataType> {
    data: T[];
    option?: {
        width?: number;
        height?: number;
        lineStyle?: {
            lineColor?: string;
            strokeWidth?: number;
        };
        margin?: {
            top: number;
            bottom: number;
            right: number;
            left: number;
        };
        tooltip?: {
            formatter?: (value: number) => string;
            renderTooltip?: (props: TooltipProps) => JSX.Element;
        };
    };
}

export const LineChart = <T extends DataType>(props: LineChartProps<T>): JSX.Element => {
    const { data, option } = props;

    return (
        <ResponsiveContainer width={"100%"} height="100%">
            <LineCharGraph
                //style={{ cursor: "move" }}

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
                {/* <Tooltip
                    content={({ active, payload, label }) => {
                        if (active) {
                            return <StyledTooltip>tooltip</StyledTooltip>;
                        }
                        return null;
                    }}
                /> */}

                <Legend />
                <Line dataKey="value" isAnimationActive={false} stroke="#e77bd1" strokeWidth={2} />
            </LineCharGraph>
        </ResponsiveContainer>
    );
};

const StyledTooltip = styled.div`
    padding: 8px;
    background-color: #fff;
    border-radius: 4px;
`;
