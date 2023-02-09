import React, { MouseEvent } from "react";

import styled from "styled-components";

import { updateAddCart } from "../../redux/account/account.slice";
import { useAppDispatch } from "../../redux/hook";
import { CustomButton, StyledLabel } from "../../style";
import { ProductState } from "../../types/shopping";

interface IProductDisplay {
    productGroup: ProductState[];
}

const StyledDiv = styled.div`
    margin-bottom: 12px;
`;

export const ProductDisplay = ({ productGroup }: IProductDisplay): JSX.Element => {
    const dispatch = useAppDispatch();

    const handleAddClick = (product: ProductState, e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        dispatch(updateAddCart(product));
    };

    return (
        <div>
            <form action="">
                {productGroup.map((product) => (
                    <StyledDiv key={product.product_id}>
                        <StyledLabel htmlFor={product.product_id}>{product.product_name}</StyledLabel>
                        <CustomButton
                            id={product.product_id}
                            name={product.product_name}
                            value={product.product_name}
                            onClick={(e) => handleAddClick(product, e)}
                        >
                            담기
                        </CustomButton>
                    </StyledDiv>
                ))}
            </form>
        </div>
    );
};
