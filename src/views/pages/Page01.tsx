import React, { useState } from "react";

import { flushSync } from "react-dom";

import { useChecks } from "../../service/hooks/UseCheck";

const labels = ["check 1", "check 2", "check 3"];

const Page01 = () => {
    const [isAllChecked, renderChecks] = useChecks(labels);

    const [counts, setCounts] = useState<number>(0);
    const [isSelected, setSelected] = useState<boolean>(false);

    const handleAddClick = () => {
        setCounts((prev) => prev + 1);
        setCounts((prev) => prev + 1);
        setSelected((selection) => !selection);
    };

    const handleAddClick2 = () => {
        flushSync(() => {
            setCounts((prev) => prev + 1);
        });

        flushSync(() => {
            setCounts((prev) => prev + 1);
            setSelected((selection) => !selection);
        });
    };

    return (
        <div>
            {/* {renderChecks()} */}
            <p>
                <button disabled={!isAllChecked}>다음</button>
            </p>
            <div>
                <div>{isSelected ? "선택됨" : "선택안됨"}</div>
                <div>{counts}</div>
                <div>
                    <button onClick={handleAddClick2}>+</button>
                    <button>-</button>
                </div>
            </div>
        </div>
    );
};

export default Page01;
