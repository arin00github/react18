import React from "react";

import { ProductDisplay } from "../../components/ProductDisplay";
import { PageTitle } from "../../layouts/PageTitle";

const productData = [
    { product_name: "banana", product_id: "fruit_A003" },
    { product_name: "apple", product_id: "fruit_A005" },
    { product_name: "orange", product_id: "fruit_A002" },
];

const Shopping01 = () => {
    return (
        <div>
            <div>
                <PageTitle title="Fruit Block" />
                <ProductDisplay productGroup={productData} />
            </div>
        </div>
    );
};

export default Shopping01;
