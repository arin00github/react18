import React, { useEffect, useRef, useState } from "react";

import * as d3 from "d3";
import { NumberValue } from "d3";

import { DataType } from "../../../types/d3-interface";
import { BarChartProps } from "../../../types/grid-interface";

export const BarChart = <T extends DataType>(props: BarChartProps<T>): JSX.Element => {
    const { data, option } = props;
    const [svgBox, setSVGBox] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
    const svgRef = useRef<SVGSVGElement | null>(null);
    const tooltipRef = useRef(null);

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

            const tooltip = d3.select(tooltipRef.current);

            const svg = d3.select(svgRef.current).attr("width", boxWidth).attr("height", boxHeight);

            const axisBox = svg
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`)
                .attr("aria-label", "axis-box");

            const grid = svg
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`)
                .attr("aria-label", "grid-box");

            const barBox = svg
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`)
                .attr("aria-label", "bar-box");

            const overBox = svg
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`)
                .attr("aria-label", "mouse-over-box");

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
            y_scale.domain([0, d3.max(data, (d) => d.value) || 6800000]);
            const yAxisGroup = d3.axisLeft(y_scale);

            // y 축 그리드선 추가
            grid.append("g")
                .attr("class", "grid-x")
                .attr("transform", `translate(0, 0)`)
                .call(yAxisGroup.tickSize(-width).tickFormat(() => ""))
                .selectAll("g")
                .attr("fill", "none")
                .selectAll("line")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", width)
                .attr("y2", 0)
                .style("stroke-width", "2px")
                .style("stroke", "red")
                //.style("stroke", "#ececec37")
                .style("stroke-opacity", 0.1);

            //axisBox 안에 x축 추가
            axisBox
                .append("g")
                .call(xAxisGroup)
                .attr("transform", `translate(0, ${height})`)
                .selectAll("text")
                .style("text-anchor", "middle")
                .attr("dy", "10px");

            //axisBox 안에 y축 추가
            axisBox
                .append("g")
                .attr("y", () => 0)
                .attr("height", () => height)
                .call(
                    yAxisGroup
                        .ticks(8)
                        .tickSizeOuter(0)
                        .tickFormat((d: NumberValue) => d.valueOf() / 1000000 + "백만")
                )
                .selectAll("g")
                .selectAll("line")
                .style("stroke", "transparent");

            overBox
                .selectAll("rect")
                .data(data)
                .join("rect")
                .attr("x", (d) => x_scale(d.name) || "")
                .attr("y", () => 0)
                .attr("fill", "red")
                .attr("opacity", "5%")
                .attr("width", x_scale.bandwidth())
                .attr("height", () => height)
                .on("mouseover", function (event: MouseEvent, d: T) {
                    d3.select(this).attr("opacity", "50%");
                    tooltip
                        .style("opacity", 1)
                        .style("position", "absolute")
                        .style("background", "#fff")
                        .style("font-size", "12px")
                        .style("left", event.offsetX + "px")
                        .style("top", event.offsetY + "px")
                        .html(`Name: ${d.name}<br/>Value: ${d.value}`);
                })
                .on("mousemove", (event: MouseEvent, d: T) => {
                    tooltip
                        .style("opacity", 1)
                        .style("position", "absolute")
                        .style("background", "#fff")
                        .style("font-size", "12px")
                        .style("left", event.offsetX + "px")
                        .style("top", event.offsetY + "px")
                        .html(`Name: ${d.name}<br/>Value: ${d.value}`);
                })
                .on("mouseout", function () {
                    d3.select(this).attr("opacity", "5%");
                    tooltip.style("opacity", 0);
                });

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

    return (
        <>
            <svg ref={svgRef} width={svgBox.width} height={svgBox.height}></svg>
            <div ref={tooltipRef}></div>
        </>
    );
};
