import React, { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { NewDeplomacyApi } from "../../../service/api/DeplomacyApi";
import usePagination from "../../../service/hooks/usePagination";
import { IDeplomacyList, IResultCode } from "../../../types/deplomacy-interface";
import { ITableColumn } from "../../../types/table-inteface";
import { CustomTable, Pagination } from "../../components/table";
import { FloatPageLayout } from "../../layouts/FloatPageLayout";
import { PageTitle } from "../../layouts/PageTitle";

const StyledSpan = styled.span`
    display: block;
    max-width: 600px;
    min-width: 400px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const countryColumns: ITableColumn<IDeplomacyList>[] = [
    { access: "country_nm", header: "국가명", sortable: false, width: "10%" },
    {
        access: "country_eng_nm",
        header: "영문명",
        sortable: false,
        width: "20%",
        cell: (value) => `${value.country_eng_nm} (${value.country_iso_alp2})`,
    },
    {
        access: "export_amount",
        header: "수출액",
        sortable: false,
        width: "12%",
    },
    { access: "import_amount", header: "수입", sortable: false, width: "12%" },
    {
        access: "diplomatic_relations",
        header: "수교",
        sortable: false,
        width: "46%",
        cell: (value) => {
            return <StyledSpan>{value.diplomatic_relations}</StyledSpan>;
        },
    },
];

const DeplomacyListPage = () => {
    const navigator = useNavigate();

    const [deplomacy, setDeplomacy] = useState<IResultCode<IDeplomacyList>>();

    const { currentIndex, updatePagination, pageIndexArray, updateCurrentIndex } = usePagination();

    const getListAPI = useCallback(
        async (pageNumber: number) => {
            const service = NewDeplomacyApi();
            const getResponse = await service.GetNationInfoList(pageNumber);

            if (getResponse) {
                setDeplomacy({ ...getResponse });
                updatePagination(getResponse.totalCount, pageNumber);
            }
        },
        [updatePagination]
    );
    useEffect(() => {
        getListAPI(currentIndex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    return (
        <FloatPageLayout>
            <PageTitle title="DeplomacyList" />
            <div className="mt-4">
                {deplomacy && (
                    <CustomTable
                        columns={countryColumns}
                        data={deplomacy.data}
                        aria_title="deplomacy"
                        handleSort={() => {
                            console.log("handleSort");
                        }}
                        handleRowClick={(row) =>
                            navigator(`/deplomacy/&name=${row.country_eng_nm}&iso=${row.country_iso_alp2}`, {
                                state: { detail: `&name=${row.country_eng_nm}&iso=${row.country_iso_alp2}` },
                            })
                        }
                    />
                )}
                <div className="d-flex justify-content-center mt-5">
                    {pageIndexArray && deplomacy && (
                        <Pagination
                            currentIndex={currentIndex}
                            totalDataLength={deplomacy.totalCount}
                            indexArray={pageIndexArray}
                            goToPrev={(pageNumber) => updateCurrentIndex(pageNumber)}
                            goToBack={() => updateCurrentIndex(Math.ceil(deplomacy.totalCount / 10))}
                            goToFront={() => updateCurrentIndex(0)}
                            goToNext={(pageNumber) => updateCurrentIndex(pageNumber)}
                            onClickIndex={(pageNumber) => updateCurrentIndex(pageNumber)}
                        />
                    )}
                </div>
            </div>
        </FloatPageLayout>
    );
};

export default DeplomacyListPage;
