import React, { useState } from "react";

type initialValue = {
    defaultVisible: boolean;
};

export const UseDiscloser = ({ defaultVisible }: initialValue) => {
    const [visible, setVisible] = useState<boolean>(defaultVisible);

    const onClose = () => {
        setVisible(() => false);
    };

    const onOpen = () => {
        setVisible(() => true);
    };

    return { visible, onClose, onOpen };
};
