import React, { useEffect } from "react";

import { json, select, scaleBand, scaleLinear, max, axisBottom, axisLeft } from "d3";

import { CountryData } from "../../../types/d3-interface";

export const BarChart = (): JSX.Element => {
    useEffect(() => {
        const width = 540;
        const heigth = 340;
        const svg = select("#bar-chart").attr("width", width).attr("height", heigth);

        const x_scale = scaleBand().range([0, width]).padding(0.1);
        const y_scale = scaleLinear().range([heigth, 0]);

        const x_axis = axisBottom(x_scale);
        const y_axis = axisLeft(y_scale);

        json("https://raw.githubusercontent.com/iamspruce/intro-d3/main/data/nigeria-states.json").then((response) => {
            console.log(response);
            const data = response as CountryData[];

            x_scale.domain(data.map((d) => d.Name));
            y_scale.domain([0, max(data, (d) => d.info.Population) || 100]);

            svg.selectAll("rect")
                .data(data)
                .join("rect")
                .attr("class", "bar")
                .attr("x", (d) => x_scale(d.Name) || "")
                .attr("y", (d) => y_scale(d.info.Population) || "")
                .attr("width", x_scale.bandwidth())
                .attr("height", (d) => heigth - y_scale(d.info.Population));

            svg.append("g")
                .attr("transform", `translate(0, ${heigth - 10})`)
                .call(x_axis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)");
        });
    }, []);

    return (
        <div>
            <svg id="bar-chart">BarChart</svg>
        </div>
    );
};
