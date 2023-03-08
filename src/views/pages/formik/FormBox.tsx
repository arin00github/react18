import React, { useState } from "react";

import { Formik, Form, Field, FormikProps, FieldProps } from "formik";
import { Col, FormControl, FormGroup, FormLabel, FormText, Row } from "react-bootstrap";
import * as Yup from "yup";

import { ImageField } from "./ImageField";
import { MemberTableForm } from "./MemberTableForm";

export interface memberType {
    name: string;
    id: string;
    major: string;
    desc?: string;
}

export interface FormValue {
    group_name: string;
    members: memberType[];
    upload_icon: File[];
}

export const FormBox = () => {
    const [initialValue, setInitialValue] = useState<FormValue>({
        group_name: "",
        members: [
            { name: "학생1", id: "", major: "", desc: "" },
            { name: "학생2", id: "student2", major: "", desc: "" },
            { name: "학생3", id: "", major: "", desc: "" },
        ],
        upload_icon: [],
    });

    const validationSchema = Yup.object({
        group_name: Yup.string().required("필수 입력값 입니다."),
        members: Yup.array().of<memberType>(
            Yup.object().shape({
                name: Yup.string().required("필수 입력값 입니다"),
                id: Yup.string().required("필수 입력값 입니다"),
                major: Yup.string().required("필수 입력값 입니다"),
                desc: Yup.string().when("major", (values: string[]) => {
                    return values[0] === "multi" ? Yup.string().required("필수 입력값입니다.") : Yup.string();
                }),
            })
        ),
        upload_icon: Yup.array().min(1, "아이콘 이미지는 꼭 첨부해야 합니다."),
    });

    const handleSubmit = (values: FormValue) => {
        console.log("handleSubmit");
    };

    return (
        <div className="form-box">
            <Formik initialValues={initialValue} onSubmit={handleSubmit} validationSchema={validationSchema}>
                {({ values, setFieldValue }: FormikProps<FormValue>) => {
                    return (
                        <Form>
                            <ImageField setFieldValue={setFieldValue} values={values} />
                            <Field name="group_name">
                                {({ field, meta }: FieldProps) => (
                                    <FormGroup style={{ width: "450px", marginBottom: 12 }}>
                                        <div style={{ display: "flex" }}>
                                            <FormLabel style={{ width: "130px" }}>그룹이름</FormLabel>
                                            <FormControl id={field.name} {...field}></FormControl>
                                        </div>
                                        {meta.error && <FormText>{meta.error}</FormText>}
                                    </FormGroup>
                                )}
                            </Field>
                            <MemberTableForm values={values} setFieldValue={setFieldValue} />
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};
