import React, { useState } from "react";

import { useChecks } from "../../service/hooks/UseCheck";

const labels = ["check 1", "check 2", "check 3"];

type inputItemProp = {
    userid: string;
    email: string;
};

const Page02 = () => {
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
        await fetch("https://localhost:8080/login", { method: "POST", body: JSON.stringify(inputItem) })
            .then((res) => {
                if (res.status === 200) {
                    setIsLogin(true);
                    //navigation.navigate('Main');
                }
            })
            .catch((err) => {
                console.log("login err", err);
            });
    };

    // const handleAddClick2 = () => {
    //     flushSync(() => {
    //         setCounts((prev) => prev + 1);
    //     });

    //     flushSync(() => {
    //         setCounts((prev) => prev + 1);
    //         setSelected((selection) => !selection);
    //     });
    // };

    return (
        <div>
            <h3>You are on the page02</h3>
            {!isLogin && (
                <form action="">
                    <div>
                        <label htmlFor="test-userid">userid</label>
                        <input
                            role="textbox"
                            className="input-box"
                            type="text"
                            aria-label="test-userid"
                            id="test-userid"
                            name="userid"
                            placeholder="userid"
                            value={inputItem.userid}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="test-email">email</label>
                        <input
                            role="textbox"
                            className="input-box"
                            type="text"
                            aria-label="test-email"
                            id="test-email"
                            name="email"
                            placeholder="email"
                            value={inputItem.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div aria-label="error-box-2">{error}</div>
                    <button
                        aria-label="submit-btn"
                        role="button"
                        className="btn"
                        onClick={(e) => {
                            e.preventDefault();
                            onClickSubmitBtn();
                        }}
                    >
                        submit
                    </button>
                </form>
            )}
            <div>{isLogin && "login success"}</div>
        </div>
    );
};

export default Page02;
