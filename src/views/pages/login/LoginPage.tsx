import React, { useState } from "react";

import { Col, FormText } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { updateIsLogin } from "../../../redux/account/account.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { CustomButton, StyledLabel } from "../../../style";
import { PageTitle } from "../../layouts/PageTitle";

type inputItemProp = {
    userid: string;
    email: string;
};

const LoginPage = () => {
    const navigator = useNavigate();

    const dispatch = useAppDispatch();

    const [inputItem, setInputItem] = useState<inputItemProp>({
        userid: "",
        email: "",
    });

    const storedIsLogin = useAppSelector((state) => state.account.isLogin);

    const [error, setError] = useState<string>();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputItem({ ...inputItem, [name]: value });
        setError(undefined);
    };

    const onClickSubmitBtn = () => {
        const regUserId = new RegExp("^[a-zA-Z0-9\\-]{3,15}$");
        const regEmail = new RegExp("^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$");
        if (inputItem.email === "" || inputItem.userid === "") {
            setError("required all input form");
            return;
        }

        if (!regUserId.test(inputItem.userid)) {
            setError("invalid userid");
            return;
        }

        if (!regEmail.test(inputItem.email)) {
            setError("invalid email");
            return;
        }
        if (process.env.NODE_ENV === "development") {
            dispatch(updateIsLogin(true));
            navigator("/main");
        } else {
            loginAPI();
        }
    };

    const loginAPI = async () => {
        await fetch("https://localhost:8080/login", {
            method: "POST",
            body: JSON.stringify(inputItem),
        })
            .then((res) => {
                if (res.status === 200) {
                    dispatch(updateIsLogin(true));
                    navigator("/main");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <PageTitle title="Login" />

            <form action="">
                <Col sm="12" className="mb-4">
                    <StyledLabel htmlFor="basic-userid">userid</StyledLabel>
                    <input
                        role="textbox"
                        className="input-box"
                        type="text"
                        aria-label="basic-userid"
                        id="basic-userid"
                        name="userid"
                        placeholder="userid"
                        value={inputItem.userid}
                        onChange={handleInputChange}
                    />
                </Col>
                <Col sm="12" className="mb-4">
                    <StyledLabel htmlFor="basic-email">email</StyledLabel>
                    <input
                        role="textbox"
                        className="input-box"
                        type="text"
                        aria-label="basic-email"
                        id="basic-email"
                        name="email"
                        placeholder="email"
                        value={inputItem.email}
                        onChange={handleInputChange}
                    />
                </Col>
                <FormText aria-label="error-box">{error}</FormText>
                <CustomButton
                    aria-label="submit-btn"
                    role="button"
                    className="btn w-100"
                    onClick={(e) => {
                        e.preventDefault();
                        onClickSubmitBtn();
                    }}
                >
                    submit
                </CustomButton>
            </form>
            <div>{storedIsLogin && <div>login success in testing library</div>}</div>
        </div>
    );
};

export default LoginPage;
