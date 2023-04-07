import React, { useEffect, useRef, useState } from "react";

import * as d3 from "d3";

import { DataType } from "../../../types/d3-interface";
import { LineChartProps } from "../../../types/grid-interface";

export const LineChart = <T extends DataType>(props: LineChartProps<T>): JSX.Element => {
    const { data, option } = props;

    const [svgBox, setSVGBox] = useState({ width: 0, height: 0 });

    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;
        if (data.length > 0 && svgRef.current) {
            const margin = { top: 20, right: 30, bottom: 30, left: 40 };
            const boxWidth = option?.width ? option.width : svgRef.current.clientWidth;
            const boxHeight = option?.height ? option.height : svgRef.current.clientHeight;
            setSVGBox({ width: boxWidth, height: boxHeight });
            const width = boxWidth - margin.left - margin.right;
            const height = boxHeight - margin.top - margin.bottom;

            //svgRef.current에 값이 있으면 다 지우기
            d3.select(svgRef.current).selectAll("*").remove();

            const svg = d3.select(svgRef.current);

            //grid: x축, y축을 가지고 있는 g 태그
            const grid = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

            //x축 범위 설정 & 대입 & grid에 도입
            const xRange = d3
                .scaleTime()
                .domain(d3.extent(data, (d) => new Date(d.date)) as [Date, Date])
                .range([0, width]);
            const xAxisGroup = d3.axisBottom(xRange);
            grid.append("g").attr("transform", `translate(0, ${height})`).call(xAxisGroup);

            //y축 범위 설정 & 대입 & grid에 도입
            const yRange = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d.value) as number])
                .range([height, 0]);
            const yAxisGroup = d3.axisLeft(yRange);
            grid.append("g").call(yAxisGroup);

            //line 값 설정하기
            const lineGraph = d3
                .line<DataType>()
                .x((d) => xRange(new Date(d.date)))
                .y((d) => yRange(d.value));

            //path로 lineGraph 그리기
            svg.append("path")
                .datum(data)
                .attr("transform", `translate(${margin.left},${margin.top})`)
                .attr("fill", "none")
                .attr("stroke", "orange")
                .attr("stroke-width", 1.5)
                .attr("d", lineGraph);

            /// 마우스 이벤트 처리를 위한 focus 그룹 생성
            const focus = svg.append("g").attr("class", "focus").style("display", "none");

            // 마우스 이벤트 처리를 위한 수직선 생성
            focus.append("line").attr("class", "x-hover-line hover-line").attr("y1", 0).attr("y2", height);

            // 마우스 이벤트 처리를 위한 수평선 생성
            focus.append("line").attr("class", "y-hover-line hover-line").attr("x1", -width).attr("x2", 0);

            // 마우스 이벤트 처리를 위한 원 생성
            focus.append("circle").attr("r", 4).attr("fill", "orange");

            // 마우스 이벤트 처리를 위한 툴팁 생성
            focus.append("text").attr("x", 9).attr("dy", ".35em");

            // 마우스 이벤트 처리
            const mousemove = (thisReact: SVGRectElement) => {
                const x0 = new Date(xRange.invert(d3.pointer(thisReact)[0]));

                const i = d3.bisector((d: any) => new Date(d.date)).left(data, x0, 1);

                const d0 = data[i - 1];
                const d1 = data[i];

                const d =
                    x0.getTime() - new Date(d0.date).getTime() > new Date(d1.date).getTime() - x0.getTime() ? d1 : d0;
                focus.attr(
                    "transform",
                    `translate(${xRange(new Date(d.date)) + margin.left}, ${yRange(d.value) + margin.top})`
                );
                focus.select("text").text(() => Math.round(d.value));
                focus.select(".x-hover-line").attr("y2", height - yRange(d.value));
                focus.select(".y-hover-line").attr("x2", -xRange(new Date(d.date)));
            };
            svg.append("rect")
                .attr("class", "overlay")
                .attr("fill", "transparent")
                .attr("transform", `translate(${margin.left},${margin.top})`)
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", width)
                .attr("height", height)
                .on("mouseover", () => focus.style("display", null))
                .on("mouseout", () => focus.style("display", "none"))
                .on("mousemove", mousemove);
        }
    }, [data, option?.height, option?.lineStyle?.strokeColor, option?.width, svgBox.height, svgBox.width]);

    return <svg ref={svgRef} width={svgBox.width} height={svgBox.height}></svg>;
};
