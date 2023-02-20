import React, { useEffect, useRef } from "react";

import { select, geoEquirectangular, geoPath, json, zoom, ZoomBehavior, Selection } from "d3";
import styled from "styled-components";

import { FeatureCollection } from "../D3Page";

interface CountryData {
    info: {
        Area: number;
        Capital: string;
        Date_created: string;
        DeputyGovernor: string;
        Governor: string;
        Latitude: string | number;
        Longitude: string | number;
        Number_of_LGAS: number;
        Population: number;
        Slogan: string;
        Wegsite: string;
        officialName: string;
    };
    Name: string;
}

interface CountryData2 {
    info: {
        Area: number;
        Capital: string;
        Date_created: string;
        DeputyGovernor: string;
        Governor: string;
        Latitude: number;
        Longitude: number;
        Number_of_LGAS: number;
        Population: number;
        Slogan: string;
        Wegsite: string;
        officialName: string;
    };
    Name: string;
}

const DataOnMap = (): JSX.Element => {
    const svgMapRef = useRef<HTMLDivElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const width = document.getElementById("map-wrap")?.clientWidth || 1200;
        const height = 500;
        const svg = select<Element, unknown>("#map").attr("viewBox", [0, 0, width, height]);

        const projection = geoEquirectangular().center([0, 0]);
        const pathGenerator = geoPath().projection(projection);

        Promise.all([
            json("https://raw.githubusercontent.com/iamspruce/intro-d3/main/data/nigeria_state_boundaries.geojson"),
            json("https://raw.githubusercontent.com/iamspruce/intro-d3/main/data/nigeria-states.json"),
        ]).then(([response, response2]) => {
            const g = svg.append("g");
            const geoJSONdata = response as FeatureCollection;

            const resData = response2 as CountryData[];
            const countryData: CountryData2[] = resData.map((data) => {
                return {
                    ...data,
                    info: {
                        ...data.info,
                        Latitude: Number(data.info.Latitude),
                        Longitude: Number(data.info.Longitude),
                    },
                };
            });
            console.log("geoJSONdata", geoJSONdata);
            console.log("countryData", countryData);
            countryData.forEach((d) => {
                d.info.Longitude = +d.info.Longitude;
                d.info.Latitude = +d.info.Latitude;
            });

            projection.fitSize([width, height], geoJSONdata);

            g.selectAll("path")
                .data(geoJSONdata.features)
                .join("path")
                .attr("class", "country")
                .attr("d", pathGenerator);

            g.selectAll("circle")
                .data(countryData)
                .join("circle")
                .attr("cx", (d) => {
                    const proj = projection([d.info.Longitude, d.info.Latitude]);
                    return proj ? proj[0] : 0;
                })
                .attr("cy", (d) => {
                    const proj = projection([d.info.Longitude, d.info.Latitude]);
                    return proj ? proj[1] : 0;
                })
                .attr("r", 5)
                .style("fill", "green");

            g.selectAll("text")
                .data(countryData)
                .join("text")
                .attr("x", (d) => {
                    const proj = projection([d.info.Longitude, d.info.Latitude]);
                    return proj ? proj[0] : 0;
                })
                .attr("y", (d) => {
                    const proj = projection([d.info.Longitude, d.info.Latitude]);
                    return proj ? proj[1] : 0;
                })
                .attr("dy", -7)
                .style("fill", "black")
                .attr("text-anchor", "middle")
                .text((d) => d.Name);

            svg.append("text")
                .attr("x", width / 1.4)
                .attr("y", `${height - 20}`)
                .style("font-size", "20px")
                .style("text-decoration", "underline")
                .text("Map of Nigeria and it's states ");

            const zooming = zoom()
                .scaleExtent([1, 8])
                .on("zoom", (event) => {
                    console.log("event", event);
                    g.selectAll("path").attr("transform", event.transform);
                    g.selectAll("circle")
                        .attr("transform", event.transform)
                        .attr("r", 5 / event.transform.k);
                    g.selectAll("text")
                        .attr("transform", event.transform)
                        .style("font-size", `${18 / event.transform.k}`)
                        .attr("dy", -7 / event.transform.k);
                });
            svg.call(zooming);
        });
    }, []);
    return (
        <StyledMapWrap id="map-wrap" ref={svgMapRef}>
            <svg id="map" ref={svgRef}></svg>
        </StyledMapWrap>
    );
};
export default DataOnMap;

const StyledMapWrap = styled.div`
    width: 100%;
    background: lightblue;

    svg g path {
        stroke: #999;
        stroke-width: 0.5px;
        fill: #ebebe0;
    }
`;
