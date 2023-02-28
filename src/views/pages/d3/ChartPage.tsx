import React, { useEffect, useState } from "react";

import { BarChart } from "../../components/chart/BarChart";
import { LineChartWrap } from "../../components/chart/LineChartWrap";

export type DataType = {
    date: string;
    value: number;
};

const ChartIndexPage = () => {
    const [data, setData] = useState<DataType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                "https://api.coindesk.com/v1/bpi/historical/close.json?start=2022-01-01&end=2022-02-20"
            );
            const result = await response.json();
            const parsedData = Object.entries(result.bpi).map((d) => ({
                date: d[0],
                value: d[1] as number,
            }));
            setData(parsedData);
        };
        fetchData();
    }, []);

    return (
        <div>
            <div>ChartIndexPage</div>
            <div>
                <BarChart />
            </div>
            <div>{data && <LineChartWrap data={data} option={{ lineStyle: { lineColor: "#ff00ff" } }} />}</div>
        </div>
    );
};

export default ChartIndexPage;
