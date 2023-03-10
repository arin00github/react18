import React, { useState, useEffect } from "react";

import { CountryData } from "../../../types/d3-interface";

export type DataType = {
    date: string;
    value: number;
    name: string;
};

const IndexPage = () => {
    const [data, setData] = useState<DataType[]>([]);

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
        setData(parsedData);
    };
    console.log("IndexPage data", data);

    useEffect(() => {
        fetchData2();
    }, []);

    return (
        <div>
            <div>IndexPage</div>
        </div>
    );
};

export default IndexPage;
