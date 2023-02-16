import React, { useCallback, useEffect, useState } from "react";

import { Image } from "react-bootstrap";
import styled from "styled-components";

import { NewDeplomacyApi } from "../../../../service/api/DeplomacyApi";
import { IOneFilter } from "../../../../types/deplomacy-interface";

interface ICountryBox {
    selectedCountry: IOneFilter;
}

export const CountryBox = (props: ICountryBox) => {
    const { selectedCountry } = props;

    const [imageUrl, setImageUrl] = useState<string>();

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

    const updateFlag = useCallback(async () => {
        const newFlag = await CountryFlagAPI();
        if (newFlag) {
            setImageUrl(newFlag);
        }
    }, [CountryFlagAPI]);

    useEffect(() => {
        updateFlag();
    }, [updateFlag]);

    return (
        <StyledBoxWrap>
            <div className="inner">
                {imageUrl && <Image src={imageUrl} width={180} />}
                <div>CountryBox</div>
            </div>
        </StyledBoxWrap>
    );
};

const StyledBoxWrap = styled.div`
    position: fixed;
    top: 80px;
    right: 30px;
    width: 400px;
    height: 90vh;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0px 7px 18px rgba(0, 0, 0, 0.1);

    .inner {
        padding: 24px;
    }
`;