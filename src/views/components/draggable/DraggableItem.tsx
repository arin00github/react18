import React, { useEffect, useState } from "react";

import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { FaExpand } from "react-icons/fa";
import { ResizableBox } from "react-resizable";
import styled from "styled-components";

import { LayoutItem } from "../../pages/grid/GridPage2";

interface DraggableItemProps {
    item: { x: number; y: number; w: number; h: number; i: string };
    onDragStop: (e: DraggableEvent, data: DraggableData, item: LayoutItem) => void;
    onResizeBox: (e: React.SyntheticEvent, item: LayoutItem) => void;
    selectedId?: string;
}

export const DraggableItem = ({ item, onDragStop, onResizeBox, selectedId }: DraggableItemProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [size, setSize] = useState({ width: item.w, height: item.h });
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: item.x, y: item.y });

    const handleResize = () => {
        setIsDragging(false);
    };
    const handleResizeStop = (e: React.SyntheticEvent) => {
        const eventDiv = e.target as HTMLDivElement;
        let container = eventDiv.parentElement;
        if (container) {
            if (container.id === "handle") {
                container = container.parentElement;
            }
            if (!container) return;
            console.log("eventDiv.parentElement", eventDiv.parentElement);
            const newWidth = Number(container.style.width.replace("px", ""));

            const newHeight = Number(container.style.height.replace("px", ""));

            onResizeBox(e, {
                ...item,
                w: Math.round(newWidth / 20) * 20,
                h: Math.round(newHeight / 20) * 20,
            });
        }
        setIsDragging(true);
    };

    const handleResizeStart = () => {
        setIsDragging(false);
    };
    useEffect(() => {
        console.log("useEffect gridItembox");
        setSize({ width: item.w, height: item.h });
        setPosition({ x: item.x, y: item.y });
    }, [item]);

    return (
        <Draggable
            defaultClassName={item.i}
            key={item.i}
            position={position}
            grid={[20, 20]}
            cancel="#handle"
            onDrag={(e, data) => {
                console.log("onDrag", e);
                const event = e.target as HTMLDivElement;
                if (event.id === "handle") {
                    setIsDragging(true);
                } else {
                    onDragStop(e, data, item);
                    setIsDragging(false);
                }
            }}
            onStop={(e, data) => {
                onDragStop(e, data, item);
            }}
            onMouseDown={(e) => {
                console.log(e.currentTarget);
            }}
        >
            <ResizableBox
                width={Math.round(item.w / 20) * 20}
                height={Math.round(item.h / 20) * 20}
                onResizeStart={handleResizeStart}
                onResize={handleResize}
                onResizeStop={handleResizeStop}
                handle={
                    <StyledHandle id="handle">
                        <FaExpand />
                    </StyledHandle>
                }
            >
                <StyledBox
                    aria-label={item.i}
                    style={{
                        background: !isDragging ? "red" : "white",
                        boxShadow: selectedId === item.i ? "0px 0px 8px #ffff22" : "none",
                        borderColor: selectedId === item.i ? "yallow" : "white",
                        borderWidth: 2,
                    }}
                >
                    box
                </StyledBox>
            </ResizableBox>
        </Draggable>
    );
};

const StyledBox = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
`;
const StyledHandle = styled.div`
    bottom: 0;
    right: 0;
    position: absolute;
    text-align: left;
    color: "white";
`;
