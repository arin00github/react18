import React, { useEffect, useState } from "react";

import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { FaCog, FaExpand, FaFigma, FaToolbox, FaTrash } from "react-icons/fa";
import { ResizableBox } from "react-resizable";
import styled from "styled-components";

import { LayoutItem } from "../../pages/grid/GridPage2";

interface DraggableItemProps {
    item: { x: number; y: number; w: number; h: number; i: string };
    onDragStop: (e: DraggableEvent, data: DraggableData, item: LayoutItem) => void;
    onResizeBox: (e: React.SyntheticEvent, item: LayoutItem) => void;
    selectedId?: string;
    handleDelete: (id: string) => void;
}

export const DraggableItem = ({ item, onDragStop, onResizeBox, selectedId, handleDelete }: DraggableItemProps) => {
    //const [size, setSize] = useState({ width: item.w, height: item.h });
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: item.x, y: item.y });

    const handleResizeStop = (e: React.SyntheticEvent) => {
        const eventDiv = e.target as HTMLElement;
        let container = eventDiv.parentElement;
        if (container) {
            console.log("😝 prev container", container);
            if (container.id === "handle") {
                container = container.parentElement;
            }
            if (container && container.tagName === "svg") {
                const container2 = container.parentElement;
                container = container2?.parentElement || container;
            }
            console.log("after container", container);
            if (!container) return;

            console.log("w/h", container.style.width, container.style.height);
            const newWidth = Number(container.style.width.replace("px", ""));
            const newHeight = Number(container.style.height.replace("px", ""));
            console.log(`newWidth: ${newWidth} // newHeight: ${newHeight}`);

            onResizeBox(e, {
                ...item,
                w: Math.round(newWidth / 20) * 20,
                h: Math.round(newHeight / 20) * 20,
            });
        }
    };

    useEffect(() => {
        console.log("useEffect gridItembox");
        setPosition({ x: item.x, y: item.y });
    }, [item.x, item.y]);

    return (
        <>
            <Draggable
                defaultClassName={item.i}
                key={item.i}
                position={position}
                grid={[20, 20]}
                cancel="#handle"
                onDrag={(e, data) => onDragStop(e, data, item)}
                onStop={(e, data) => onDragStop(e, data, item)}
            >
                <ResizableBox
                    width={Math.round(item.w / 20) * 20}
                    height={Math.round(item.h / 20) * 20}
                    onResizeStop={handleResizeStop}
                    handle={
                        <StyledHandle id="handle" aria-label="handle">
                            <FaExpand />
                        </StyledHandle>
                    }
                >
                    <StyledBox aria-label={item.i}>{selectedId === item.i ? "클릭" : ""}</StyledBox>
                    {selectedId === item.i && (
                        <StyleChartTool>
                            <div className="tool-icon" onClick={() => handleDelete(item.i)}>
                                <FaTrash />
                            </div>
                            <div className="tool-icon">
                                <FaFigma />
                            </div>
                            <div className="tool-icon">
                                <FaCog />
                            </div>
                        </StyleChartTool>
                    )}
                </ResizableBox>
            </Draggable>
        </>
    );
};

const StyleChartTool = styled.div`
    position: absolute;
    top: 0;
    right: -54px;
    width: 40px;
    height: 160px;
    z-index: 100;

    .tool-icon {
        width: 38px;
        line-height: 38px;
        height: 38px;
        border: 1px solid #f9f9f9;
        background-color: #adadad9d;
        text-align: center;
        color: #fff;
        svg {
            vertical-align: middle;
        }
    }
`;

const StyledBox = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: relative;
    box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.1);
`;
const StyledHandle = styled.div`
    bottom: 0;
    right: 0;
    position: absolute;
    text-align: left;
    color: "white";
`;
