import React, { useState, useEffect, useCallback, useMemo } from "react";

import { useAppSelector } from "../../../redux/hook";
import { NewDeplomacyApi } from "../../../service/api/DeplomacyApi";
import { DataType } from "../../../types/d3-interface";
import { IDeplomacyList } from "../../../types/deplomacy-interface";
import { CustomChart } from "../echarts/CustomChart";

interface ChartContent2Props {
    keyId: string;
    chartType: string;
}

export const ChartContent3 = (props: ChartContent2Props): JSX.Element => {
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

    console.log(data.length > 0, chartType);

    return (
        <>{chartType !== "" && <CustomChart type={chartType} chart={{ data: data, option: targetOption?.option }} />}</>
    );
};
