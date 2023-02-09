import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { updateIsLogin } from "../../../redux/account/account.slice";
import { useAppDispatch } from "../../../redux/hook";
import { useLocalStorage } from "../../../service/hooks/useLocalStorage";
import { CustomButton, StyledLabel } from "../../../style";
import { PageTitle } from "../../layouts/PageTitle";

type inputItemProp = {
    userid: string;
    email: string;
};

const LoginPage = () => {
    const navigator = useNavigate();

    const dispatch = useAppDispatch();

    const [isLogin, setIsLogin] = useState<boolean>(false);

    const [inputItem, setInputItem] = useState<inputItemProp>({
        userid: "",
        email: "",
    });

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
        loginAPI();
    };

    const loginAPI = async () => {
        console.log("loginAPI");
        await fetch("https://localhost:8080/login", {
            method: "POST",
            body: JSON.stringify(inputItem),
            // headers: {
            //     "Access-Control-Allow-Origin": "*",
            //     "Content-Type": "text/plain",
            // },
        })
            .then((res) => {
                console.log("res", res);
                if (res.status === 200) {
                    setIsLogin(true);
                    dispatch(updateIsLogin(true));
                    navigator("/page02");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <PageTitle title="Login" />

            {!isLogin && (
                <form action="">
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                    <div aria-label="error-box">{error}</div>
                    <CustomButton
                        aria-label="submit-btn"
                        role="button"
                        className="btn"
                        onClick={(e) => {
                            e.preventDefault();
                            onClickSubmitBtn();
                        }}
                    >
                        submit
                    </CustomButton>
                </form>
            )}
            <div>{isLogin && "login success"}</div>
        </div>
    );
};

export default LoginPage;
