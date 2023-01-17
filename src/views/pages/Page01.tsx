import React, { useState } from "react";

import { useChecks } from "../../service/hooks/UseCheck";

const labels = ["check 1", "check 2", "check 3"];

type inputItemProp = {
    userid: string;
    email: string;
};

const Page01 = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const [isAllChecked, renderChecks] = useChecks(labels);

    const [counts, setCounts] = useState<number>(0);
    const [isSelected, setSelected] = useState<boolean>(false);

    const [inputItem, setInputItem] = useState<inputItemProp>({
        userid: "",
        email: "",
    });

    const [error, setError] = useState<string>();

    const handleAddClick = () => {
        setCounts((prev) => prev + 1);
        setCounts((prev) => prev + 1);
        setSelected((selection) => !selection);
    };

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
        await fetch("https://localhost:8080/login", { method: "POST", body: inputItem })
            .then((res) => {
                if (res.status === 200) {
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
            {/* {renderChecks()} */}
            <p>
                <button disabled={!isAllChecked}>다음</button>
            </p>
            <div>
                <div>{isSelected ? "선택됨" : "선택안됨"}</div>
                <div role="heading">{String(counts)}</div>
                <div>
                    <button role="button" onClick={handleAddClick}>
                        plus
                    </button>
                    <button role="button">minus</button>
                </div>
            </div>
            {!isLogin && (
                <form action="">
                    <div>
                        <label htmlFor="basic-userid">userid</label>
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
                        <label htmlFor="basic-email">email</label>
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
            {isLogin && <div>login success</div>}
        </div>
    );
};

export default Page01;
