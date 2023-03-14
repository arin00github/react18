import React, { useRef, useState } from "react";

import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { FaPlus } from "react-icons/fa";
import styled from "styled-components";

import { IconButton } from "../../../style";
import { DraggableItem } from "../../components/draggable/DraggableItem";

export type LayoutItem = {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
};

const GridPage2 = (): JSX.Element => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [layout, setLayout] = useState<LayoutItem[]>([{ x: 100, y: 100, h: 100, w: 100, i: "box_01" }]);

    const [selectedId, setSelectedId] = useState<string>();

    const onDragStop = (e: DraggableEvent, data: DraggableData, item: LayoutItem) => {
        const { x, y } = data;
        const container = containerRef.current;
        if (!container) return;
        const finedItem = layout.find((ly) => ly.i === item.i);
        const removedArray = layout.filter((ly) => ly.i !== item.i);
        const newItem = finedItem ? { ...finedItem, x: x, y: y } : { x: 100, y: 100, h: 100, w: 100, i: item.i };
        setLayout([...removedArray, newItem]);
        setSelectedId(item.i);
    };

    const onResizeBox = (e: React.SyntheticEvent, item: LayoutItem) => {
        const finedItem = layout.find((ly) => ly.i === item.i);
        const removedArray = layout.filter((ly) => ly.i !== item.i);
        const newItem = finedItem
            ? { ...finedItem, w: item.w, h: item.h }
            : { x: 100, y: 100, h: 100, w: 100, i: item.i };
        setLayout([...removedArray, newItem]);
    };

    const handleAddBox = (x: number, y: number, w: number, h: number) => {
        const newBox = { x, y, w, h, i: `box_${Date.now().toString()}` };
        setLayout([...layout, newBox]);
    };

    return (
        <StyledWrap>
            <StyledToolbar>
                <IconButton onClick={() => handleAddBox(100, 100, 100, 100)}>
                    <FaPlus />
                </IconButton>
            </StyledToolbar>
            <StyledContainer
                ref={containerRef}
                onClick={(e) => {
                    console.log(e.target);
                    const eventDiv = e.target as HTMLDivElement;
                    if (eventDiv.getAttribute("aria-label")) return;
                    if (!selectedId) return;
                    const childAr = Array.from(e.currentTarget.children);
                    const checkValid = childAr.some((child) => {
                        return selectedId && child.classList.contains(selectedId);
                    });
                    if (checkValid) {
                        setSelectedId(undefined);
                    }
                }}
            >
                {layout.map((item) => (
                    <DraggableItem
                        selectedId={selectedId}
                        item={item}
                        onDragStop={onDragStop}
                        onResizeBox={onResizeBox}
                    />
                ))}
            </StyledContainer>
        </StyledWrap>
    );
};

export default GridPage2;

const StyledWrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const StyledToolbar = styled.div`
    width: 100%;
    height: 60px;
    background-color: #ffffff40;
`;

const StyledContainer = styled.div`
    position: absolute;
    top: 60;
    left: 0;
    width: 100%;
    height: calc(100vh - 60px);

    .react-resizable {
        position: absolute;
    }
`;
