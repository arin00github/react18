import React, { useState, useEffect, useCallback, useMemo } from "react";

import { useAppSelector } from "../../../redux/hook";
import { NewDeplomacyApi } from "../../../service/api/DeplomacyApi";
import { DataType } from "../../../types/d3-interface";
import { IDeplomacyList } from "../../../types/deplomacy-interface";
import { BeerDataProps } from "../../../types/grid-interface";
import { BarChartWrap } from "../d3-chart/BarChartWrap";
import { DounutChartWrap } from "../d3-chart/DounutChartWrap";
import { LineChartWrap } from "../d3-chart/LineChartWrap";

interface ChartContent2Props {
    keyId: string;
    chartType: string;
}

export const ChartContent4 = (props: ChartContent2Props): JSX.Element => {
    const { keyId, chartType } = props;

    const [data, setData] = useState<DataType[]>([]);

    const storedGrid = useAppSelector((state) => state.grid);
    const { chartOptionArray } = storedGrid;

    const targetOption = useMemo(() => {
        const optionObject = chartOptionArray.find((option) => option.key === keyId);
        return optionObject;
    }, [chartOptionArray, keyId]);

    const fetchData = async () => {
        const response = await fetch(
            "https://api.coindesk.com/v1/bpi/historical/close.json?start=2022-02-01&end=2022-03-01"
        );
        const result = await response.json();
        const parsedData = Object.entries(result.bpi).map((d) => ({
            date: d[0],
            value: d[1] as number,
            name: "",
        }));
        setData(parsedData);
    };

    const fetchData2 = useCallback(async (): Promise<BeerDataProps[]> => {
        const response = await fetch("https://random-data-api.com/api/v2/beers?size=8");
        const result = await response.json();
        return result;
    }, []);

    const updateBarData = useCallback(async () => {
        fetchData2()
            .then((result) => {
                const reMakeArr = result.map((beer) => {
                    return {
                        name: beer.brand,
                        value: Number(beer.alcohol.replace("%", "")),
                        date: "",
                    };
                });
                setData(reMakeArr);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [fetchData2]);

    useEffect(() => {
        switch (chartType) {
            case "line":
                fetchData();
                break;
            case "bar":
                updateBarData();
                break;
            case "pie":
                updateBarData();
                break;
            default:
                fetchData();
        }
    }, [chartType, updateBarData]);

    if (chartType === "line") {
        return <>{data && <LineChartWrap data={data} option={targetOption?.option} />}</>;
    }
    if (chartType === "bar") {
        return <>{data && <BarChartWrap data={data} />}</>;
    }
    if (chartType === "pie") {
        return <>{data && <DounutChartWrap data={data} />}</>;
    }
    return <></>;
};