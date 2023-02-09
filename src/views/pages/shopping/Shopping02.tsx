import React from "react";

import { ProductDisplay } from "../../components/ProductDisplay";
import { PageTitle } from "../../layouts/PageTitle";

const productData = [
    { product_name: "sprite", product_id: "drink_A001" },
    { product_name: "coca colar", product_id: "drink_A003" },
    { product_name: "green tea", product_id: "drink_A002" },
];

const Shopping02 = () => {
    return (
        <div>
            <PageTitle title="Drink Block" />
            <ProductDisplay productGroup={productData} />
        </div>
    );
};

export default Shopping02;
