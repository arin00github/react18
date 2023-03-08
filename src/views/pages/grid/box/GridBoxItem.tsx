import React, { useState, useEffect, useCallback } from "react";

import styled from "styled-components";

import { NewDeplomacyApi } from "../../../../service/api/DeplomacyApi";
import { DataType } from "../../../../types/d3-interface";
import { IDeplomacyList } from "../../../../types/deplomacy-interface";
import { BarChartWrap } from "../../../components/d3-chart/BarChartWrap";
import { DounutChartWrap } from "../../../components/d3-chart/DounutChartWrap";
import { LineChartWrap } from "../../../components/d3-chart/LineChartWrap";

interface GridBoxItemProps {
    keyId: string;
    chartType: "line" | "bar" | "dounut";
    height: number;
}

export const GridBoxItem = (props: GridBoxItemProps): JSX.Element => {
    const { keyId, chartType, height } = props;

    const [data, setData] = useState<DataType[]>([]);

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

    const fetchData2 = useCallback(async (): Promise<IDeplomacyList[]> => {
        const service = NewDeplomacyApi();
        const index = keyId.replace("box_", "");
        const response = await service.GetNationInfoList(Number(index));
        return new Promise((resolve, reject) => {
            if (response?.resultMsg === "정상") {
                resolve(response.data);
            } else {
                reject(response?.resultMsg);
            }
        });
    }, [keyId]);

    const updateBarData = useCallback(async () => {
        fetchData2()
            .then((result) => {
                const reMakeArr = result.map((nation) => {
                    return {
                        name: nation.country_nm,
                        value: Number(nation.export_amount),
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
        if (height) {
            switch (chartType) {
                case "line":
                    fetchData();
                    break;
                case "bar":
                    updateBarData();
                    break;
                case "dounut":
                    updateBarData();
                    break;
                default:
                    fetchData();
            }
        }
    }, [chartType, height, updateBarData]);

    if (chartType === "line") {
        return (
            <>
                {data && <LineChartWrap height={height} data={data} option={{ lineStyle: { lineColor: "#ff00ff" } }} />}
            </>
        );
    }
    if (chartType === "bar") {
        return <>{data && <BarChartWrap height={height} data={data} />}</>;
    }
    if (chartType === "dounut") {
        return <>{data && <DounutChartWrap height={height} data={data} />}</>;
    }
    return <></>;
};
