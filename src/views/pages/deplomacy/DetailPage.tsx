import React, { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { NewDeplomacyApi } from "../../../service/api/DeplomacyApi";
import { ICountryEconomy } from "../../../types/deplomacy-interface";
import { PageTitle } from "../../layouts/PageTitle";

import { DetailInfoBox } from "./detail/DetailInfoBox";

const DeplomacyDetail = () => {
    const param = useParams();

    const [economicDetail, setEconomicDetail] = useState<ICountryEconomy>();

    const getDetailCountryInfo = useCallback(async () => {
        if (param.detail) {
            const name = param.detail?.split("&")[1].replace("name=", "");
            const iso = param.detail?.split("&")[2].replace("iso=", "");
            const service = NewDeplomacyApi();
            const getResponse = await service.GetDetailEconomy({
                name: name,
                iso: iso,
            });
            if (getResponse && getResponse.data) {
                setEconomicDetail({ ...economicDetail, ...getResponse?.data[0] });
            }
        }
    }, [economicDetail, param.detail]);

    useEffect(() => {
        getDetailCountryInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
