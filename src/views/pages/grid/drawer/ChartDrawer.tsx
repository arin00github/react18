import React, { useCallback, useEffect, useRef, useState } from "react";

import { Card, Col, Space } from "antd";
import { Drawer } from "antd";
import Draggable from "react-draggable";
import { Dispatch } from "redux";
import styled from "styled-components";

import { setStoredGridLayout } from "../../../../redux/grid/grid.slice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import { updateArrayWithObject } from "../../../../service/util/utils";
import { LayoutItem } from "../../../../types/grid-interface";
import { ChartMenu } from "../../../components/common/ChartMenu";

interface ChartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    handleChartClick: (type: string) => void;
    handleChartInsert: (updatedLayout: LayoutItem) => void;
}

export const ChartDrawer = (props: ChartDrawerProps) => {
    const dispatch = useAppDispatch();

    const storedGrid = useAppSelector((state) => state.grid);

    const { layout } = storedGrid;

    const { isOpen, onClose, title, handleChartInsert } = props;
    const draggableRef = useRef<HTMLDivElement | null>(null);

    const [isDragging, setIsDragging] = useState<boolean>(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (isDragging) {
                console.log("mousemove", e.screenX, e.screenY);
            }
        },
        [isDragging]
    );

    const handleMouseDown = useCallback((e: MouseEvent) => {
        setIsDragging(true);
        console.log("mouseDown", e.screenX, e.screenY);
    }, []);

    const handleMouseUp = useCallback(
        (e: MouseEvent) => {
            setIsDragging(false);

            const event = e.target as HTMLDivElement;
            const findItem = layout.find((ly) => {
                const innerWidth = ly.x + ly.w > e.x && ly.x < e.x;
                const innerHeight = ly.y + ly.h > e.y && ly.y < e.y;
                return innerWidth && innerHeight;
            });

            const updatedArray = findItem ? updateArrayWithObject(layout, findItem, { type: event.innerText }) : layout;
            console.log("handleMouseUp", updatedArray);
            if (findItem) {
                handleChartInsert({ ...findItem, type: event.innerText });
            }

            dispatch(setStoredGridLayout(updatedArray));
        },

        [dispatch, handleChartInsert, layout]
    );

    useEffect(() => {
        document.addEventListener("dragstart", handleMouseDown);
        document.addEventListener("dragend", handleMouseUp);
        document.addEventListener("drag", handleMouseMove);

        return () => {
            document.removeEventListener("dragend", handleMouseUp);
            document.removeEventListener("dragstart", handleMouseDown);
            document.removeEventListener("drag", handleMouseMove);
        };
    }, [handleMouseMove, handleMouseUp, handleMouseDown]);

    return (
        <StyledDrawer isOpen={isOpen}>
            <Space dir="vertical" style={{ padding: 12 }}>
                {ChartMenu.map((menu, idx) => {
                    return (
                        <StyledCard
                            ref={draggableRef}
                            // onMouseUp={(e) => handleMouseUp(e)}
                            // onMouseMove={(e) => handleMouseMove(e)}
                            // onMouseDown={(e) => handleMouseDown(e)}
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

const StyledDrawer = styled.div<{ isOpen: boolean }>`
    color: black;
    position: absolute;
    width: 240px;
    height: 100%;
    right: 0px;
    top: 0px;
    z-index: 2000;
    background-color: #1f1f1f;
    border-left: 1px solid #898989;
    transform: ${(props) => (props.isOpen ? "translate(0px, 0px)" : "translate(240px, 0px)")};
`;
