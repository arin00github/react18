import React, { useEffect, useRef, useState } from "react";

import * as d3 from "d3";

import { CountryData } from "../../../types/d3-interface";
import { DataType } from "../../pages/d3/ChartPage";

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
        barStyle?: {
            barColor?: string;
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
    const [svgBox, setSVGBox] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        if (data.length > 0) {
            const margin = { top: 20, right: 30, bottom: 30, left: 60 };
            const boxWidth = option?.width ? option.width : svgRef.current.clientWidth;
            const boxHeight = option?.height ? option.height : svgRef.current.clientHeight;
            setSVGBox({ width: boxWidth, height: boxHeight });
            const width = boxWidth - margin.left - margin.right;
            const height = boxHeight - margin.top - margin.bottom;

            //svgRef.current에 값이 있으면 다 지우기
            d3.select(svgRef.current).selectAll("*").remove();

            const svg = d3.select(svgRef.current).attr("width", boxWidth).attr("height", boxHeight);

            const barBox = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

            const grid = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

            /*x축 설정
             * scaleBand() : 범주형 변수를 연속형 변수로 변환
             * range() : 출력 범위를 지정하며, 여기서는 0부터 width까지의 범위를 지정
             * padding() : 범주형 변수 간의 간격을 조정
             * axisBottom() : x축을 생성
             * domain() : x_scale의 입력 범위를 설정
             */
            const x_scale = d3.scaleBand().range([0, width]).padding(0.1);
            const xAxisGroup = d3.axisBottom(x_scale);
            x_scale.domain(data.map((d) => d.name));

            //y축 설정
            const y_scale = d3.scaleLinear().range([height, 0]);
            const yAxisGroup = d3.axisLeft(y_scale);
            y_scale.domain([0, d3.max(data, (d) => d.value) || 6800000]);

            //grid 그룹안에 x축 추가
            grid.append("g")
                .call(xAxisGroup)
                .attr("transform", `translate(0, ${height})`)
                .selectAll("text")
                .style("text-anchor", "middle")
                .attr("dy", "10px");

            //grid 그룹안에 y축 추가
            grid.append("g").call(yAxisGroup);

            barBox
                .selectAll("rect")
                .data(data)
                .join("rect")
                .attr("class", "bar")
                .attr("x", (d) => x_scale(d.name) || "")
                .attr("y", (d) => y_scale(d.value))
                .attr("width", x_scale.bandwidth())
                .attr("height", (d) => height - y_scale(d.value))
                .attr("fill", option?.barStyle?.barColor || "#6a8aec");
        }
    }, [data, option?.barStyle?.barColor, option?.height, option?.width]);

    return <svg ref={svgRef} width={svgBox.width} height={svgBox.height}></svg>;
};