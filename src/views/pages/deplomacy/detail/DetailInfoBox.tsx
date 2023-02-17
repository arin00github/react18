import exp from "constants";

import React, { useCallback, useEffect, useState } from "react";

import { Image } from "react-bootstrap";

import { useAppSelector } from "../../../../redux/hook";
import { NewDeplomacyApi } from "../../../../service/api/DeplomacyApi";
import { ICountryEconomy } from "../../../../types/deplomacy-interface";

interface DetailInfoBoxProps {
    economicDetail: ICountryEconomy;
}

export const DetailInfoBox = (props: DetailInfoBoxProps) => {
    const { economicDetail } = props;

    const storedWorld = useAppSelector((state) => state.world);

    const [imageUrl, setImageUrl] = useState<string>();
    const [mapImageUrl, setMapImageUrl] = useState<string>();

    const CountryFlagAPI = useCallback(async () => {
        const service = NewDeplomacyApi();

        const getResponseFlags = await service.GetCountryFlag({
            name: economicDetail.country_eng_nm,
            iso: economicDetail.country_iso_alp2,
        });
        if (getResponseFlags) {
            return getResponseFlags?.data[0].download_url;
        }
        return undefined;
    }, [economicDetail.country_eng_nm, economicDetail.country_iso_alp2]);

    const updateFlag = useCallback(async () => {
        const newFlag = await CountryFlagAPI();
        if (newFlag) {
            setImageUrl(newFlag);
        }
    }, [CountryFlagAPI]);

    const CountryMapAPI = useCallback(async () => {
        const service = NewDeplomacyApi();

        const getResponseMap = await service.GetCountryMap({
            name: economicDetail.country_eng_nm,
            iso: economicDetail.country_iso_alp2,
        });
        if (getResponseMap) {
            return getResponseMap?.data[0].download_url;
        }
    }, [economicDetail.country_eng_nm, economicDetail.country_iso_alp2]);

    const updateMap = useCallback(async () => {
        const newMap = await CountryMapAPI();
        if (newMap) {
            setMapImageUrl(newMap);
        }
    }, [CountryMapAPI]);

    useEffect(() => {
        updateFlag();
        updateMap();
    }, [updateFlag, updateMap]);
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
