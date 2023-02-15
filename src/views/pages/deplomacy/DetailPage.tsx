import React, { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { NewDeplomacyApi } from "../../../service/api/DeplomacyApi";
import { ICountryEconomy } from "../../../types/deplomacy-interface";
import { PageTitle } from "../../layouts/PageTitle";

import { DetailInfoBox } from "./detail/DetailInfoBox";

const DeplomacyDetail = () => {
    const param = useParams();

    const [economicDetail, setEconomicDetail] = useState<ICountryEconomy>();

    const CountryInfoAPI = useCallback(async () => {
        if (param.detail) {
            const name = param.detail?.split("&")[1].replace("name=", "");
            const iso = param.detail?.split("&")[2].replace("iso=", "");
            const service = NewDeplomacyApi();
            const getResponse = await service.GetDetailEconomy({
                name: name,
                iso: iso,
            });

            if (getResponse && getResponse.data) {
                //setEconomicDetail({ ...economicDetail, ...getResponse?.data[0] });
                return getResponse.data[0];
            }
        }
    }, [param.detail]);

    const updateDetailInfo = useCallback(async () => {
        const newData = await CountryInfoAPI();
        if (newData) {
            setEconomicDetail({ ...economicDetail, ...newData });
        }
    }, [CountryInfoAPI, economicDetail]);

    useEffect(() => {
        //updateDetailInfo, CountryInfoAPI 둘을 합친 함수는 무한 루프에 빠짐
        updateDetailInfo();
    }, [updateDetailInfo]);

    return (
        <div>
            {economicDetail ? (
                <div>
                    <PageTitle title={`${economicDetail.country_nm} (${economicDetail.country_eng_nm})`} />
                    <DetailInfoBox economicDetail={economicDetail} />
                </div>
            ) : (
                <div> DeplomacyDetail</div>
            )}
        </div>
    );
};

export default DeplomacyDetail;
