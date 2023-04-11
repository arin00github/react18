import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import * as echarts from "echarts";
import ReactEcharts, { EChartsOption } from "echarts-for-react";

import busanPoliceData from "../../../data/busan_police.json";
import seoulPoliceData from "../../../data/seoul_police.json";
import seoulMapData from "../../../data/svgmap_seoul.json";

type ECharts = echarts.ECharts;

const IndexPage = () => {
    const chartRef = useRef<ECharts>();
    const [geoData, setGeoData] = useState<any>(null);

    const chartDom = document.getElementById("chart");

    const drawMap = (newData: any) => {
        console.log("draw", newData);
        if (chartDom) {
            console.log("drawMap", chartRef.current);
            chartRef.current = echarts.init(chartDom);

            const option = {
                geo: {
                    map: "seoul",
                    roam: true,
                    zoom: 1.2,
                    label: {
                        show: true,
                        color: "#ffffff",
                        emphasis: {
                            show: true,
                        },
                    },
                    nameProperty: "SIG_KOR_NM",
                    itemStyle: {
                        normal: {
                            areaColor: "#9eaec1",
                            borderColor: "#e9eef5",
                        },
                        emphasis: {
                            areaColor: "#2a333d",
                        },
                    },
                },
                series: [
                    {
                        type: "map",
                        geoIndex: 0,
                        data: newData.features.map((dataset: any) => ({
                            name: dataset.properties.SIG_KOR_NM,
                            value: dataset.properties.SIG_CD,
                        })),
                    },
                ],
            };

            chartRef.current.setOption(option);

            chartRef.current.on("mouseover", (params) => {
                console.log("params", params);
            });
        }
    };

    const registerMap = (newData: any) => {
        console.log("registerMap", newData);
        echarts.registerMap("seoul", newData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    useEffect(() => {
        console.log("udate Data");
        // geojson 데이터 로드
        setGeoData(seoulMapData);
    }, []);

    useEffect(() => {
        if (geoData) {
            console.log("useEffect", geoData);
            registerMap(geoData);

            if (chartDom) {
                drawMap(geoData);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartDom, geoData]);

    return (
        <div>
            <h2>svg를 이용한 맵</h2>
            <div id="chart" style={{ width: "100%", height: "500px" }} />
        </div>
    );
};

export default IndexPage;
