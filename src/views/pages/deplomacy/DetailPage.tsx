import React from "react";

import { useParams } from "react-router-dom";

const DeplomacyDetail = () => {
    const param = useParams();
    console.log("param", param);

    return (
        <div>
            <div> DeplomacyDetail</div>
        </div>
    );
};

export default DeplomacyDetail;
