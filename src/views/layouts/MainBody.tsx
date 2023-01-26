import React, { ReactNode } from "react";

type MainBodyProps = {
    children: ReactNode;
};

export function MainBody({ children }: MainBodyProps) {
    return (
        <div id="main-body">
            <div className="body-inner">{children}</div>
        </div>
    );
}
