import React, { useEffect, useRef, useState } from "react";

import * as d3 from "d3";

import { DataType } from "../../../types/d3-interface";
import { PieChartProps } from "../../../types/grid-interface";

export const DounutChart = <T extends DataType>(props: PieChartProps<T>): JSX.Element => {
    const { data, option } = props;
    const [svgBox, setSVGBox] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        if (data.length > 0) {
            const margin = { top: 20, right: 30, bottom: 30, left: 80 };
            const boxWidth = option?.width ? option.width : svgRef.current.clientWidth;
            const boxHeight = option?.height ? option.height : svgRef.current.clientHeight;
            setSVGBox({ width: boxWidth, height: boxHeight });
            const width = boxWidth - margin.left - margin.right;
            const height = boxHeight - margin.top - margin.bottom;
            const radius = Math.min(width, height) / 2 - 10;

            //svgRef.current에 값이 있으면 다 지우기
            d3.select(svgRef.current).selectAll("*").remove();

            const svg = d3.select(svgRef.current).attr("width", boxWidth).attr("height", boxHeight);

            const color = d3
                .scaleOrdinal()
                .domain(data.map((d) => d.name))
                .range(["#FFC300", "#ff8419", "#FF5733", "#ff0202", "#c70056", "#900C3F", "#571845"]);

            const pieGenerator = d3.pie<T>().value((d) => Number(d.value));

            const data_ready = pieGenerator(data).filter((d) =>
                Number(d.data.value) >= 10000000 ? Number(d.data.value) : 0
            );

            const arcGenerator = d3.arc<unknown, d3.PieArcDatum<T>>().innerRadius(0).outerRadius(radius);

            const arcs = svg
                .selectAll(".arc")
                .data(data_ready)
                .enter()
                .append("g")
                .attr("class", "arc")
                .attr("transform", `translate(${boxWidth / 2}, ${boxHeight / 2})`);

            arcs.append("path")
                .attr("d", arcGenerator)
                .attr("fill", (d: d3.PieArcDatum<T>) => color(d.data.name) as string)
                .attr("stroke", "white")
                .style("stroke-width", "2px");

            arcs.append("text")
                .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
                .text((d) => d.data.name)
                .attr("transform", (d) => {
                    const pos = arcGenerator.centroid(d);
                    pos[0] = radius * 1.2 * ((d.startAngle + d.endAngle) / 2 < Math.PI ? 1 : -1);
                    return `translate(${pos})`;
                })
                .attr("text-anchor", (d) => ((d.startAngle + d.endAngle) / 2 < Math.PI ? "start" : "end"))
                .style("font-size", "14px");
        }
    }, [data, option?.height, option?.width]);

    return <svg ref={svgRef} width={svgBox.width} height={svgBox.height}></svg>;
};
