import styled from "styled-components";

export const StyledLabel = styled.label`
    line-height: 32px;
    height: 32px;
    margin-right: 12px;
    font-size: 18px;
    color: "#2f77ea";
`;

export const StyledInput = styled.input`
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
`;

export const IconButton = styled.button`
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: transparent;
    outline: none;
    border: none;
    color: #fff;
    &:hover {
        background-color: #ffffff40;
    }
`;

export const CustomButton = styled.button`
    outline: none;
    border: none;
    padding: 0.5rem 1.25rem;
    background-color: #121b9e;
    color: #fff;
    border-radius: 4px;
    &.sm {
        padding: 0.3rem 1rem;
        font-size: 13px;
    }

    &.w-100 {
        width: 100%;
    }
`;

const ChartBoxWrap = styled.div<{ background?: string }>`
    width: 100%;
    height: 100%;
    background-color: ${(props) => (props.background ? props.background : "#ffffff31")};
`;

export const StyledBox = { StyledInput, StyledLabel, IconButton, CustomButton, ChartBoxWrap };
