import exp from "constants";

import React, { useCallback, useEffect, useState } from "react";

import { Image } from "react-bootstrap";

import { NewDeplomacyApi } from "../../../../service/api/DeplomacyApi";
import { ICountryEconomy } from "../../../../types/deplomacy-interface";

interface DetailInfoBoxProps {
    economicDetail: ICountryEconomy;
}

export const DetailInfoBox = (props: DetailInfoBoxProps) => {
    const { economicDetail } = props;

    const [imageUrl, setImageUrl] = useState<string>();
    const [mapImageUrl, setMapImageUrl] = useState<string>();

    const getCountryFlags = useCallback(async () => {
        const service = NewDeplomacyApi();

        const getResponseFlags = await service.GetCountryFlag({
            name: economicDetail.country_eng_nm,
            iso: economicDetail.country_iso_alp2,
        });
        setImageUrl(getResponseFlags?.data[0].download_url);
    }, [economicDetail.country_eng_nm, economicDetail.country_iso_alp2]);

    const getCountryInfo = useCallback(async () => {
        const service = NewDeplomacyApi();

        const getResponseMap = await service.GetCountryMap({
            name: economicDetail.country_eng_nm,
            iso: economicDetail.country_iso_alp2,
        });
        setMapImageUrl(getResponseMap?.data[0].download_url);
    }, [economicDetail.country_eng_nm, economicDetail.country_iso_alp2]);

    useEffect(() => {
        getCountryFlags();
        getCountryInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <div>
                <div>Detail InfoBox</div>
                {imageUrl && <Image src={imageUrl} />}
                {mapImageUrl && <Image width={400} src={mapImageUrl} />}
            </div>
        </div>
    );
};
