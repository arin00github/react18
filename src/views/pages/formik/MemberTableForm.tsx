import React, { useState } from "react";

import { FieldArray, Field, FieldProps } from "formik";
import { FormControl, FormGroup, FormText } from "react-bootstrap";
import { FaList, FaTrash } from "react-icons/fa";
import styled from "styled-components";

import { FormValue, memberType } from "./FormBox";

interface MemberTableFormProps {
    values: FormValue;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export const MemberTableForm = ({ values, setFieldValue }: MemberTableFormProps) => {
    const [draggedItem, setDraggedItem] = useState<memberType | null>(null);

    /**
     * @name handleDragStart
     * @param e Drag 이벤트 오브젝트
     * @param index 배열의 인덱스값
     * @description 드래그 시작 시 실행하는 이벤트 핸들러.
     */
    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedItem(values.members[index]);
        if (e.currentTarget.parentElement) {
            e.currentTarget.parentElement.className = "selected";
        }
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", "");
        e.dataTransfer.setDragImage(e.currentTarget.parentElement as HTMLElement, 20, 20);
    };

    /**
     * @name handleDragOver
     * @param e Drag 이벤트 오브젝트
     * @param index 배열의 인덱스값
     * @returns 함수 종료를 위해 return 사용
     * @description 드래그 진행(ex.다른 요소들 위로 이동) 시 실행되는 이벤트 핸들러
     */
    const handleDragOver = (e: React.DragEvent, index: number) => {
        const draggedOverItem = values.members[index];
        if (draggedItem === draggedOverItem) return;
        if (e.currentTarget.parentElement) {
            const tbodyChildren = e.currentTarget.parentElement.parentElement?.children;
            if (tbodyChildren) {
                Array.from(tbodyChildren).forEach((child) => {
                    child.className = "";
                });
            }
            e.currentTarget.parentElement.className = "selected";
        }
        const attributesCopy = values.members.filter((item) => item !== draggedItem);
        attributesCopy.splice(index, 0, draggedItem as memberType);
        setFieldValue("members", attributesCopy);
    };

    /**
     * @name handleDragEnd
     * @param e Drag 이벤트 오브젝트
     * @description 드래그 끝날 시 실행되는 이벤트 핸들러
     */
    const handleDragEnd = (e: React.DragEvent) => {
        const attrReodering = values.members.map((attr, index) => {
            return { ...attr, ordering: index + 1 };
        });
        setFieldValue("members", attrReodering);
        if (e.currentTarget.parentElement) {
            const tbodyChildren = e.currentTarget.parentElement.parentElement?.children;
            if (tbodyChildren) {
                Array.from(tbodyChildren).forEach((child) => {
                    child.className = "";
                });
            }
        }
    };

    return (
        <FieldArray name="members">
            {({ push, remove }) => (
                <div>
                    <table className="group-table">
                        <thead>
                            <tr>
                                <th style={{ width: "3%" }}></th>
                                <th style={{ width: "7%" }}>순서</th>
                                <th style={{ width: "23%" }}>항목이름</th>
                                <th style={{ width: "23%" }}>항목코드</th>
                                <th style={{ width: "17%" }}>유형</th>
                                <th style={{ width: "17%" }}>코드유형</th>
                                <th style={{ width: "10%" }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {values.members.map((input, index) => (
                                <tr key={`member_${index}`}>
                                    <td
                                        style={{ width: "3%" }}
                                        draggable={true}
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragOver={(e) => handleDragOver(e, index)}
                                        onDragEnd={(e) => handleDragEnd(e)}
                                    >
                                        <FaList />
                                    </td>
                                    <td style={{ width: "7%" }}>
                                        <span>{index + 1}</span>
                                    </td>
                                    <td style={{ width: "23%" }}>
                                        <Field name={`members.${index}.name`}>
                                            {({ field, meta }: FieldProps) => (
                                                <FormGroup>
                                                    <FormControl id={field.name} {...field}></FormControl>
                                                    {meta.error && <FormText>{meta.error}</FormText>}
                                                </FormGroup>
                                            )}
                                        </Field>
                                    </td>
                                    <td style={{ width: "23%" }}>
                                        <Field name={`members.${index}.id`}>
                                            {({ field, meta }: FieldProps) => (
                                                <FormGroup>
                                                    <FormControl id={field.name} {...field}></FormControl>
                                                    {meta.error && <FormText>{meta.error}</FormText>}
                                                </FormGroup>
                                            )}
                                        </Field>
                                    </td>
                                    <td style={{ width: "17%" }}>
                                        <Field name={`members.${index}.major`}>
                                            {({ field, meta }: FieldProps) => (
                                                <FormGroup>
                                                    <FormControl id={field.name} {...field}></FormControl>
                                                    {meta.error && <FormText>{meta.error}</FormText>}
                                                </FormGroup>
                                            )}
                                        </Field>
                                    </td>
                                    <td style={{ width: "17%" }}>
                                        <Field name={`members.${index}.desc`}>
                                            {({ field, meta }: FieldProps) => (
                                                <FormGroup>
                                                    <FormControl id={field.name} {...field}></FormControl>
                                                    {meta.error && <FormText>{meta.error}</FormText>}
                                                </FormGroup>
                                            )}
                                        </Field>
                                    </td>
                                    <td style={{ width: "10%" }}>
                                        <IconButton onClick={() => remove(index)}>
                                            <FaTrash />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </FieldArray>
    );
};
const IconButton = styled.button`
    width: 32px;
    height: 32px;
    line-height: 32px;
    background-color: transparent;
    color: #696969;
    border: 1px solid transparent;

    &:hover,
    :focus {
        background-color: #fff;
        color: #696969;
        border-color: #696969;
    }
`;
