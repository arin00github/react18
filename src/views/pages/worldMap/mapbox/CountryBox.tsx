import React, { useCallback, useEffect, useState } from "react";

import { Image } from "react-bootstrap";
import styled from "styled-components";

import { useAppSelector } from "../../../../redux/hook";
import { NewDeplomacyApi } from "../../../../service/api/DeplomacyApi";
import { ICountryEconomy, ICountryObject, IDeplomacyList, IOneFilter } from "../../../../types/deplomacy-interface";

interface ICountryBox {
    selectedCountry: IOneFilter;
}

export const CountryBox = (props: ICountryBox) => {
    const { selectedCountry } = props;

    const storedWorld = useAppSelector((state) => state.world);
    const { countryList } = storedWorld;

    const [detailEconomy, setDetailEconomy] = useState<ICountryEconomy>();

    const [imageUrl, setImageUrl] = useState<string>();

    //const detailCommon = countryList.find((country) => country.name.common === selectedCountry.name);

    /**
     * @name CountryFlagAPI
     * @description 국기 이미지 url 정보주는 API
     */
    const CountryFlagAPI = useCallback(async () => {
        const service = NewDeplomacyApi();

        const getResponseFlags = await service.GetCountryFlag({
            name: selectedCountry.name,
            iso: selectedCountry.iso,
        });
        if (getResponseFlags) {
            return getResponseFlags?.data[0].download_url;
        }
        return undefined;
    }, [selectedCountry.iso, selectedCountry.name]);

    const CountryDetailAPI = useCallback(async () => {
        const service = NewDeplomacyApi();
        const getResponse = await service.GetDetailEconomy({
            name: selectedCountry.name,
            iso: selectedCountry.iso,
        });
        if (getResponse) {
            return getResponse.data[0];
        }
        return undefined;
    }, [selectedCountry.iso, selectedCountry.name]);

    /**
     * @name updateFlag
     * @description CountryFlagAPI 호출 후 state에 업데이트
     */
    const updateFlag = useCallback(async () => {
        const newFlag = await CountryFlagAPI();
        if (newFlag) {
            setImageUrl(newFlag);
        }
    }, [CountryFlagAPI]);

    const updateCountryDetail = useCallback(async () => {
        const detailInfo = await CountryDetailAPI();
        if (detailInfo) {
            setDetailEconomy(detailInfo);
        }
    }, [CountryDetailAPI]);

    // useEffect(() => {
    //     updateFlag();
    //     updateCountryDetail();
    // }, [updateCountryDetail, updateFlag]);

    return (
        <StyledBoxWrap>
            <div className="inner">
                {/* {imageUrl && <Image src={imageUrl} width={180} />}
                {detailEconomy && (
                    <div>
                        <h3>{detailEconomy.country_nm}</h3>
                        <div>
                            <div>총 GDP</div>
                            <div>{detailEconomy.gdp}</div>
                        </div>
                        <div>
                            <div>1인당 GDP</div>
                            <div>{detailEconomy.gdp_per_capita}</div>
                        </div>
                    </div>
                )} */}
            </div>
        </StyledBoxWrap>
    );
};

const StyledBoxWrap = styled.div`
    position: fixed;
    top: 80px;
    right: 30px;
    width: 400px;
    height: 86vh;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0px 7px 18px rgba(0, 0, 0, 0.1);
    animation: loadEffect3 0.6s ease-in forwards;

    .inner {
        padding: 24px;
    }

    .row-data {
        display: flex;
        padding: 6px 0;
        border-bottom: 1px solid #d3d3d3;

        .row-key {
            width: 110px;
        }
        .row-value {
            width: calc(100% - 110px);
        }
    }

    @keyframes loadEffect3 {
        0% {
            //opacity: 0;
            transform: scale(0.7);
        }
        65% {
            //opacity: 0.65;
            transform: scale(1.01);
        }
        85% {
            //opacity: 0.85;
            transform: scale(0.97);
        }
        100% {
            //opacity: 1;
            transform: scale(1);
        }
    }
`;
