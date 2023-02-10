import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * @name executeRequest
 * @async
 * @function
 * @description REST API 요청 실행 함수
 * @return {Promise<AxiosResponse | null>}
 */
export const executeRequest = async (path: string, config?: AxiosRequestConfig): Promise<AxiosResponse | null> => {
    try {
        return await axios(path, config);
    } catch (err) {
        const anyResult = err as AxiosError;
        if (anyResult && anyResult.response) {
            return anyResult.response;
        }
    }
    return null;
};
