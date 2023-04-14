import React, { useCallback, useEffect, useRef, useState } from "react";

import { Space } from "antd";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import { IconButton } from "../../../../style";
import { ChartItem } from "../../../../types/ChartItem";
import { LayoutItem } from "../../../../types/grid-interface";
import { ChartMenu } from "../../../components/common/ChartMenu";

interface ChartDrawerProps {
    isOpen: boolean;
    layout: ChartItem<any>[];
    onClose: () => void;
    title: string;
    handleChartClick: (type: string) => void;
    handleChartInsert: (updatedLayout: LayoutItem) => void;
}

export const ChartDrawer = (props: ChartDrawerProps) => {
    const { isOpen, onClose, handleChartInsert, layout } = props;
    const draggableRef = useRef<HTMLDivElement | null>(null);

    const handleDragEnd = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            const event = e.target as HTMLDivElement;
            const findItem = layout.find((ly) => {
                const innerWidth = ly.gridInfo.x + ly.gridInfo.w > e.clientX && ly.gridInfo.x < e.clientX;
                const innerHeight = ly.gridInfo.y + ly.gridInfo.h > e.clientY && ly.gridInfo.y < e.clientY;
                return innerWidth && innerHeight;
            });

            if (findItem && event.textContent) {
                handleChartInsert({ ...findItem.gridInfo, type: event.textContent });
            }
        },

        [handleChartInsert, layout]
    );

    return (
        <StyledDrawer className={isOpen ? "openDrawer" : "closeDrawer"}>
            <Space dir="vertical" style={{ padding: 12 }}>
                <Space>
                    <IconButton onClick={onClose}>
                        <FaTimes color="#fff" />
                    </IconButton>
                </Space>
                {ChartMenu.map((menu, idx) => {
                    return (
                        <StyledCard
                            onDragEnd={(e) => handleDragEnd(e)}
                            aria-label={menu.type}
                            ref={draggableRef}
                            key={`chart_category_${idx}`}
                            index={idx + 1}
                            draggable={true}
                        >
                            {menu.type}
                        </StyledCard>
                    );
                })}
            </Space>
        </StyledDrawer>
    );
};

const StyledCard = styled.div<{ index: number }>`
    padding: 12px;
    margin-bottom: 8px;
    position: absolute;
    width: 180px;
    left: 12px;
    top: ${(props) => `${props.index * 60}px`};
    color: #fff;
    border: 1px solid #fff;
`;

const StyledDrawer = styled.div`
    color: black;
    position: absolute;
    width: 240px;
    height: 100%;
    right: 0px;
    top: 0px;
    z-index: 2000;
    background-color: #1f1f1f;
    border-left: 1px solid #898989;
    &.openDrawer {
        animation-name: openDrawer;
    }

    &.closeDrawer {
        animation-name: closeDrawer;
    }
    animation-duration: 1000ms;
    animation-fill-mode: forwards;

    @keyframes openDrawer {
        from {
            transform: translate(240px, 0px);
        }
        to {
            transform: translate(0px, 0px);
        }
    }

    @keyframes closeDrawer {
        from {
            transform: translate(0px, 0px);
        }
        to {
            transform: translate(240px, 0px);
        }
    }
`;
