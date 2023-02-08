import React, { useState } from "react";

import styled from "styled-components";

import { updateAddCart } from "../../redux/account/account.slice";
import { useAppDispatch } from "../../redux/hook";
import { ProductState } from "../../types/shopping";

const StyledInput = styled.input`
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
`;

export const ProductDisplay = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const [productGroup, setProductGroup] = useState<ProductState[]>([
        { product_id: "fruit_A001", product_name: "banana" },
        { product_id: "fruit_A002", product_name: "apple" },
        { product_id: "fruit_A003", product_name: "orange" },
    ]);

    const handleInputChange = (product: ProductState) => {
        dispatch(updateAddCart(product));
    };

    return (
        <div>
            <form action="">
                {productGroup.map((product) => (
                    <div key={product.product_id}>
                        <label htmlFor={product.product_id}>{product.product_name}</label>
                        <StyledInput
                            type="button"
                            id={product.product_id}
                            name={product.product_name}
                            value={product.product_name}
                            onClick={() => handleInputChange(product)}
                        />
                    </div>
                ))}
            </form>
        </div>
    );
};
