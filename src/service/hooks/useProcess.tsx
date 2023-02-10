import React, { useState } from "react";

import { IProcessState } from "../../types/common";

export const useProcess = () => {
    const [processState, setProcessState] = useState<IProcessState>({
        process: "init",
        action: "",
        message: "",
    });

    const updateProcess = (newProcessObject: IProcessState) => {
        setProcessState({ ...processState, ...newProcessObject });
    };

    return { processState, updateProcess };
};
