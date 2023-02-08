import React from "react";

import { ProductDisplay } from "../../components/ProductDisplay";
import { PageTitle } from "../../layouts/PageTitle";

const Shopping01 = () => {
    return (
        <div>
            <div>
                <PageTitle title="Product" />
                <ProductDisplay />
            </div>
        </div>
    );
};

export default Shopping01;
