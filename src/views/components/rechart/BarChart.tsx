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

import { DataType } from "../../../types/d3-interface";

interface TooltipProps {
    x: number;
    y: number;
    content: string;
}

export interface BarChartProps<T extends DataType> {
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

export const BarChart = <T extends DataType>(props: BarChartProps<T>): JSX.Element => {
    const { data, option } = props;

    return (
        <ResponsiveContainer width={"100%"} height="100%">
            <BarChartGraph
                data={data}
                margin={option?.margin ? option.margin : { top: 20, left: 20, bottom: 20, right: 20 }}
            >
                <CartesianGrid strokeDasharray="3 1" />
                <XAxis dataKey="name" fontSize={10} />
                <YAxis fontSize={10} tickFormatter={(data: number) => data.toString().replace("0000", "") + "만"} />
                <Tooltip />
                <Legend />
                <Bar data={data} dataKey="value" fill="#290abc" />
            </BarChartGraph>
        </ResponsiveContainer>
    );
};
