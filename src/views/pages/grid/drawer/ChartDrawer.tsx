import React from "react";

import { Card, Col, Space } from "antd";
import { Drawer } from "antd";
import Draggable from "react-draggable";
import styled from "styled-components";

import { ChartMenu } from "../../../components/common/ChartMenu";

interface ChartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    handleChartClick: (type: string) => void;
}

export const ChartDrawer = (props: ChartDrawerProps) => {
    const { isOpen, onClose, title, handleChartClick } = props;

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log("mouseUp", e.clientX, e.clientY);
    };

    return (
        <StyledDrawer mask={false} title={title} placement="right" open={isOpen} onClose={onClose}>
            {ChartMenu.map((menu, idx) => {
                return (
                    <StyledCard
                        onMouseUp={(e) => {
                            handleMouseUp(e);
                            handleChartClick(menu.type);
                        }}
                        key={`chart_category_${idx}`}
                        index={idx + 1}
                        draggable={true}
                    >
                        {menu.title}
                    </StyledCard>
                );
            })}
        </StyledDrawer>
    );
};

const StyledCard = styled.div<{ index: number }>`
    padding: 12px;
    margin-bottom: 8px;
    position: absolute;
    width: 180px;
    top: ${(props) => `${props.index * 60}px`};
`;

const StyledDrawer = styled(Drawer)`
    color: black;

    .ant-drawer-wrapper-body {
        position: relative;
        .ant-drawer-body {
            position: relative;
        }
    }
`;
