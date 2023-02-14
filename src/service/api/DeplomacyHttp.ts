import {
    IResultCode,
    IDeplomacyList,
    ICountryEconomy,
    ICountryMap,
    ICountryEnv,
    IOneFilter,
} from "../../types/deplomacy-interface";

import { IDeplomacyApi } from "./DeplomacyApi";
import { executeRequest } from "./HttpService";

export class DeplomacyHttp implements IDeplomacyApi {
    static readonly baseUrl = "http://apis.data.go.kr/1262000/OverviewKorRelationService/getOverviewKorRelationList";
    static readonly generalUrl = "http://apis.data.go.kr/1262000/CountryGnrlInfoService2";
    static readonly economyUrl = "https://apis.data.go.kr/1262000/CountryEconomyService2/getCountryEconomyList2";
    static readonly mapUrl = "http://apis.data.go.kr/1262000/CountryMapService2/getCountryMapList2";
    static readonly environmentUrl =
        "http://apis.data.go.kr/1262000/EnvironmentalInformationService/getEnvironmentalInformationList";

    static readonly flagUrl = "http://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2";

    public async GetNationInfoList(pageIndex: number): Promise<IResultCode<IDeplomacyList> | undefined> {
        const url = `${DeplomacyHttp.baseUrl}?serviceKey=${process.env.REACT_APP_DEPLO_API_KEY}&pageNo=${pageIndex}&numOfRows=10`;
        const response = await executeRequest(url);

        if (response && response.status === 200) {
            return response.data;
        }

        if (response && response.status == 401) {
            window.location.reload();
        }

        return undefined;
    }

    async GetCountryInfo(options: IOneFilter): Promise<IResultCode<IDeplomacyList> | undefined> {
        const detailStrig = `cond[country_nm::EQ]=${options.name} &cond[country_iso_alp2::EQ]=${options.iso}`;

        const URL = `${DeplomacyHttp.baseUrl}?serviceKey=${process.env.REACT_APP_DEPLO_API_KEY}&pageNo=1&numOfRows=10 ${detailStrig}`;

        const response = await executeRequest(URL, {
            method: "GET",
        });

        if (response && response.data) {
            return response.data as IResultCode<IDeplomacyList>;
        }

        return undefined;
    }

    async GetTotalCountry(pageNo: number, numOfRow?: number): Promise<IResultCode<IDeplomacyList> | undefined> {
        const perPageRows = numOfRow || 10;

        const URL = `${DeplomacyHttp.baseUrl}?serviceKey=${process.env.REACT_APP_DEPLO_API_KEY}&pageNo=${pageNo}&numOfRows=${perPageRows}`;

        const response = await executeRequest(URL, {
            method: "GET",
        });

        if (response && response.data) {
            return response.data as IResultCode<IDeplomacyList>;
        }

        return undefined;
    }

    async GetDetailEconomy(country: { iso: string; name: string }): Promise<IResultCode<ICountryEconomy> | undefined> {
        const detailStrig = `cond[country_nm::EQ]=${country.name} &cond[country_iso_alp2::EQ]=${country.iso}`;

        const URL = `${DeplomacyHttp.economyUrl}?serviceKey=${process.env.REACT_APP_DEPLO_API_KEY}&pageNo=1&numOfRows=10 ${detailStrig}`;

        const response = await executeRequest(URL, {
            method: "GET",
        });

        if (response && response.data) {
            return response.data as IResultCode<ICountryEconomy>;
        }

        return undefined;
    }

    async GetCountryMap(country: { iso: string; name: string }): Promise<IResultCode<ICountryMap> | undefined> {
        const detailStrig = `cond[country_nm::EQ]=${country.name} &cond[country_iso_alp2::EQ]=${country.iso}`;

        const URL = `${DeplomacyHttp.mapUrl}?serviceKey=${process.env.REACT_APP_DEPLO_API_KEY}&pageNo=1&numOfRows=10 ${detailStrig}`;

        const response = await executeRequest(URL, {
            method: "GET",
        });

        if (response && response.data) {
            return response.data as IResultCode<ICountryMap>;
        }

        return undefined;
    }

    async GetCountryEnv(country: { iso: string; name: string }): Promise<IResultCode<ICountryEnv> | undefined> {
        const detailStrig = `cond[country_nm::EQ]=${country.name} &cond[country_iso_alp2::EQ]=${country.iso}`;

        const URL = `${DeplomacyHttp.environmentUrl}?serviceKey=${process.env.REACT_APP_DEPLO_API_KEY}&pageNo=1&numOfRows=10 ${detailStrig}`;

        const response = await executeRequest(URL, {
            method: "GET",
        });

        if (response && response.data) {
            return response.data as IResultCode<ICountryEnv>;
        }

        return undefined;
    }

    async GetCountryFlag(country: { iso: string; name: string }): Promise<IResultCode<ICountryMap> | undefined> {
        const detailStrig = `cond[country_nm::EQ]=${country.name} &cond[country_iso_alp2::EQ]=${country.iso}`;

        const URL = `${DeplomacyHttp.flagUrl}?serviceKey=${process.env.REACT_APP_DEPLO_API_KEY}&pageNo=1&numOfRows=10 ${detailStrig}`;

        const response = await executeRequest(URL, {
            method: "GET",
        });

        if (response && response.data) {
            return response.data as IResultCode<ICountryMap>;
        }
        return undefined;
    }
}
