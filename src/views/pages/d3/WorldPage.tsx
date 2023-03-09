import React, { useEffect } from "react";

import * as d3 from "d3";

const WorldPage = () => {
    const updateWorldData = async () => {
        d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then((res) => {
            console.log("res", res);
        });
    };
    useEffect(() => {
        console.log("useEffect");
        updateWorldData();
    }, []);
    return <div>worldPage</div>;
};

export default WorldPage;
