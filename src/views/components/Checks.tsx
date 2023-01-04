import React from "react";

type Props = {
    checkList: boolean[];
    labels: readonly string[];
    onCheck: (index: number) => void;
};

export const Checks: React.FunctionComponent<Props> = ({ checkList, labels, onCheck }) => {
    return (
        <ul>
            {labels.map((label, idx) => (
                <li key={idx}>
                    <label>
                        <input type="checkbox" checked={checkList[idx]} onClick={() => onCheck(idx)} />
                        {label}
                    </label>
                </li>
            ))}
        </ul>
    );
};
