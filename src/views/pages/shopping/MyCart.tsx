import React, { MouseEvent } from "react";

import { updateAddCart, updateRemoveCart, updateSubtractCart } from "../../../redux/account/account.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { CustomButton, StyledLabel } from "../../../style";
import { IconButton } from "../../../style/component";
import { CartState } from "../../../types/shopping";
import { PageTitle } from "../../layouts/PageTitle";

const MyCartPage = () => {
    const storedCart = useAppSelector((state) => state.account.cart);

    const dispatch = useAppDispatch();

    const handleAddCart = (addItem: CartState) => {
        dispatch(updateAddCart({ product_id: addItem.product_id, product_name: addItem.product_name }));
    };

    const handleSubtractCart = (addItem: CartState) => {
        if (addItem.product_cnt > 0) {
            dispatch(updateSubtractCart({ product_id: addItem.product_id, product_name: addItem.product_name }));
        }
    };

    const handleRemoveCart = (addItem: CartState, e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        dispatch(updateRemoveCart({ product_id: addItem.product_id, product_name: addItem.product_name }));
    };
    return (
        <div>
            <PageTitle title="My Cart" />

            {storedCart && storedCart.length ? (
                <div>
                    {storedCart.map((product) => {
                        return (
                            <div>
                                <StyledLabel htmlFor={product.product_id}>{product.product_name}</StyledLabel>
                                <StyledLabel htmlFor="">{product.product_cnt}</StyledLabel>
                                <IconButton
                                    id={product.product_id}
                                    value={product.product_cnt}
                                    name={product.product_name}
                                    onClick={() => handleAddCart(product)}
                                >
                                    +
                                </IconButton>
                                <IconButton
                                    id={product.product_id}
                                    value={product.product_cnt}
                                    name={product.product_name}
                                    onClick={(e) => handleSubtractCart(product)}
                                >
                                    -
                                </IconButton>
                                <CustomButton className="sm" onClick={(e) => handleRemoveCart(product, e)}>
                                    삭제
                                </CustomButton>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div>장바구니에 담긴 상품이 없습니다</div>
            )}
        </div>
    );
};

export default MyCartPage;
