import {
    ICountryEconomy,
    ICountryEnv,
    ICountryMap,
    IDeplomacyList,
    IOneFilter,
    IResultCode,
} from "../../types/deplomacy-interface";

import { DeplomacyHttp } from "./DeplomacyHttp";

export interface IDeplomacyApi {
    GetNationInfoList(pageIndex: number): Promise<IResultCode<IDeplomacyList> | undefined>;

    GetTotalCountry(pageNo: number, numOfRow?: number): Promise<IResultCode<IDeplomacyList> | undefined>;
    GetCountryInfo(options: IOneFilter): Promise<IResultCode<IDeplomacyList> | undefined>;
    GetCountryMap(country: { iso: string; name: string }): Promise<IResultCode<ICountryMap> | undefined>;
    GetCountryEnv(country: { iso: string; name: string }): Promise<IResultCode<ICountryEnv> | undefined>;
    GetCountryFlag(country: { iso: string; name: string }): Promise<IResultCode<ICountryMap> | undefined>;
    GetDetailEconomy(country: { iso: string; name: string }): Promise<IResultCode<ICountryEconomy> | undefined>;
}

export const NewDeplomacyApi = (): IDeplomacyApi => {
    return new DeplomacyHttp();
};
