import React, { useEffect, useState } from "react";

import { CountryData } from "../../../types/d3-interface";
import { BarChartWrap } from "../../components/d3-chart/BarChartWrap";
import { LineChartWrap } from "../../components/d3-chart/LineChartWrap";

export type DataType = {
    date: string;
    value: number;
    name: string;
};

const ChartIndexPage = () => {
    const [data, setData] = useState<DataType[]>([]);

    const [barData, setBarData] = useState<DataType[]>([]);

    const fetchData2 = async () => {
        const response = await fetch(
            "https://raw.githubusercontent.com/iamspruce/intro-d3/main/data/nigeria-states.json"
        );
        const result: CountryData[] = await response.json();
        const parsedData = result
            .filter((d, idx) => idx < 10)
            .map((d) => ({
                date: "",
                value: d.info.Population,
                name: d.Name,
            }));
        setBarData(parsedData);
    };
    const fetchData = async () => {
        const response = await fetch(
            "https://api.coindesk.com/v1/bpi/historical/close.json?start=2022-01-01&end=2022-02-20"
        );
        const result = await response.json();
        const parsedData = Object.entries(result.bpi).map((d) => ({
            date: d[0],
            value: d[1] as number,
            name: "",
        }));
        setData(parsedData);
    };

    useEffect(() => {
        fetchData();
        fetchData2();
    }, []);

    return (
        <div>
            <div>ChartIndexPage</div>
            <div>{barData && <BarChartWrap data={barData} option={{ barStyle: { barColor: "#ff00ff" } }} />}</div>
            <div>{data && <LineChartWrap data={data} option={{ lineStyle: { lineColor: "#ff00ff" } }} />}</div>
        </div>
    );
};

export default ChartIndexPage;
