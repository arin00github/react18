import React, { useMemo, useRef, ChangeEvent, useState, useCallback } from "react";

import { Field, FieldProps } from "formik";
import { Button, FormControl, FormGroup, Image } from "react-bootstrap";

import { FormValue } from "./FormBox";

interface ImageFieldProps {
    values: FormValue;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

interface Preview {
    url: string;
    imageId?: string;
}

export const FILE_ERROR_FORMAT = "file_error_format";
export const FILE_ERROR_SIZE = "file_error_size";
export const FILE_ERROR_COUNT = "file_error_count";
export type FILE_ERROR_TYPE = typeof FILE_ERROR_FORMAT | typeof FILE_ERROR_SIZE | typeof FILE_ERROR_COUNT;

export const ImageField = (props: ImageFieldProps) => {
    const { values, setFieldValue } = props;

    const [previewImage, setPreviewImage] = useState<Preview>();

    const [errors, setErrors] = useState<FILE_ERROR_TYPE[]>([]);
    const IMG_FILE_FORMATS = useMemo(() => ["image/svg+xml", "image/png"], []);

    const IMG_FILE_SIZE = 10 * 1024 * 1024; // 파일 업로드 최대 용령: 10MB
    const fileRef = useRef<HTMLInputElement>(null);

    const checkFileArrayIsInvalid = useCallback(
        (fileArr: File[]) => {
            const _errors: FILE_ERROR_TYPE[] = [];

            if (fileArr.length > 1) {
                _errors.push(FILE_ERROR_COUNT);
            }

            const filteredByFormats = fileArr.filter((file) => !IMG_FILE_FORMATS.includes(file.type));
            if (filteredByFormats.length > 0) {
                _errors.push(FILE_ERROR_FORMAT);
            }

            const filteredBySize = fileArr.filter((file) => file.size > IMG_FILE_SIZE);
            if (filteredBySize.length > 0) {
                _errors.push(FILE_ERROR_SIZE);
            }

            setErrors(_errors);

            return _errors.length > 0;
        },
        [IMG_FILE_FORMATS, IMG_FILE_SIZE]
    );

    const handleFileImageChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                const fileArr = Array.from(e.target.files);
                if (checkFileArrayIsInvalid(fileArr)) {
                    return;
                }
                e.target.value = "";
                if (fileArr.length === 1) {
                    setPreviewImage({ url: URL.createObjectURL(fileArr[0]) });
                    setFieldValue("upload-icon", fileArr);
                }
            }
        },
        [checkFileArrayIsInvalid, setFieldValue]
    );

    /**
     * @name handleUploadClick
     * @function
     * @description 업로드 버튼 클릭 이벤트 핸들러
     * @return {void}
     */
    const handleUploadClick = useCallback((): void => {
        fileRef.current?.click();
    }, []);

    return (
        <Field name="upload_icon">
            {({ meta, field }: FieldProps) => (
                <FormGroup className="mb-8">
                    <div>
                        {previewImage ? (
                            <Image src={previewImage.url} width="80px" height="80px" />
                        ) : (
                            <div style={{ width: "80px", height: "80px", background: "#e4e4e4" }}>이미지 첨부</div>
                        )}
                    </div>
                    <div>
                        <Button onClick={handleUploadClick}>{previewImage ? "파일변경" : "파일선택"}</Button>
                    </div>
                    <FormControl
                        name={field.name}
                        type="file"
                        accept={IMG_FILE_FORMATS.toString()}
                        hidden={true}
                        ref={fileRef}
                        onChange={handleFileImageChange}
                    />
                </FormGroup>
            )}
        </Field>
    );
};
