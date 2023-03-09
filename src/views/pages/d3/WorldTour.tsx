/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";

import * as d3 from "d3";
import { FeatureCollection } from "geojson";
import { feature } from "topojson-client";

type Props = {
    world: any;
};

type MyGeometry = {
    type: string;
    coordinates: number[][];
};

export const WorldTour: React.FC<Props> = ({ world }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const width = 960;
    const height = 500;
    const context = canvasRef.current?.getContext("2d");
    const projection = d3
        .geoOrthographic()
        .translate([width / 2, height / 2])
        .scale(220)
        .clipAngle(90)
        .precision(0.3);

    const path = d3.geoPath(projection, context);

    const render = (land: any, countries: any, borders: any, sphere: any) => {
        if (context) {
            context.clearRect(0, 0, width, height);

            context.beginPath(), path(land), (context.fillStyle = "#ccc"), context.fill();

            context.beginPath(), path(countries), (context.fillStyle = "#f00"), context.fill();

            context.beginPath(),
                path(borders),
                (context.strokeStyle = "#fff"),
                (context.lineWidth = 0.5),
                context.stroke();

            context.beginPath(),
                path(sphere),
                (context.strokeStyle = "#000"),
                (context.lineWidth = 1.5),
                context.stroke();
        }
    };

    const loop = (world: any) => {
        const land = feature(world, world.objects.land);
        const countries = feature(world, world.objects.countries);
        const borders = feature(world, world.objects.land);
        console.log("land", land);
        console.log("borders", borders);

        const sphere = { type: "Sphere" } as unknown as MyGeometry;

        render(land, countries, borders, sphere);

        const rotate = [0, 0];
        const velocity = [0.015, -0];

        d3.timer(() => {
            projection.rotate([rotate[0] + velocity[0], rotate[1] + velocity[1]]);
            render(land, countries, borders, sphere);
        });
    };

    useEffect(() => {
        console.log("world tour", canvasRef.current);
        if (canvasRef.current) {
            loop(world);
        }
    }, [loop, world]);

    return <canvas ref={canvasRef} width={width} height={height} />;
};
