import React, { useState } from "react";

import { Checks } from "../../views/components/Checks";

type UseChecksResult = [boolean, () => JSX.Element];

export const useChecks = (labels: readonly string[]): UseChecksResult => {
    const [checkList, setCheckList] = useState(() => labels.map(() => false));

    const handleCheckClick = (index: number) => {
        setCheckList((checks) => checks.map((c, i) => (i === index ? !c : c)));
    };

    const isAllChecked = checkList.every((x) => x);

    const renderChecks = () => <Checks checkList={checkList} labels={labels} onCheck={handleCheckClick} />;

    return [isAllChecked, renderChecks];
};
