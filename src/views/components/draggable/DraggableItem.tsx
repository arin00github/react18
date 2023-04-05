import React, { ReactNode } from "react";

import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { FaCog, FaExpand, FaFigma, FaTrash } from "react-icons/fa";
import { ResizableBox } from "react-resizable";
import styled from "styled-components";

import { useAppSelector } from "../../../redux/hook";
import { LayoutItem } from "../../../types/grid-interface";

import { GridBoxContent } from "./GridBoxContent";

interface DraggableItemProps {
    item: LayoutItem;
    chartType: string;
    onDragStop: (e: DraggableEvent, data: DraggableData, item: LayoutItem) => void;
    onResizeBox: (e: React.SyntheticEvent, item: LayoutItem) => void;
    handleDelete: (id: string) => void;
    handleSetting: (id: string) => void;
}

const DraggableItemComponent = ({
    item,
    chartType,
    onDragStop,
    onResizeBox,
    handleDelete,
    handleSetting,
}: DraggableItemProps) => {
    const storedSelectedChart = useAppSelector((state) => state.grid.selectedChart);

    const dragBoxRef = React.createRef<Draggable>();

    const handleResizeStop = (e: React.SyntheticEvent) => {
        const eventDiv = e.target as HTMLElement;
        let container = eventDiv.parentElement;
        if (container) {
            if (container.id === "handle") {
                container = container.parentElement;
            }
            if (container && container.tagName === "svg") {
                const container2 = container.parentElement;
                container = container2?.parentElement || container;
            }
            if (!container) return;
            const newWidth = Number(container.style.width.replace("px", ""));
            const newHeight = Number(container.style.height.replace("px", ""));
            onResizeBox(e, {
                ...item,
                w: Math.round(newWidth / 20) * 20,
                h: Math.round(newHeight / 20) * 20,
            });
        }
    };

    return (
        <>
            <Draggable
                ref={dragBoxRef}
                defaultClassName={`${item.i === storedSelectedChart && "grid-item"} ${item.i}`}
                key={item.i}
                position={{ x: item.x, y: item.y }}
                grid={[20, 20]}
                cancel="#handle"
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
                    <StyledGridBox aria-label={item.i} chartType={chartType}>
                        <GridBoxContent keyId={item.i} chartType={item.type} />
                    </StyledGridBox>
                    {storedSelectedChart === item.i && (
                        <StyleChartTool aria-label="chart-tool">
                            <div className="tool-icon" onClick={() => handleDelete(item.i)}>
                                <FaTrash />
                            </div>
                            <div
                                className="tool-icon"
                                onClick={(e) => {
                                    console.log("e", e.target);
                                    handleSetting(item.i);
                                }}
                            >
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

const StyledGridBox = styled.div<{ chartType: string }>`
    width: 100%;
    height: 100%;
    outline: ${(props) => (props.chartType ? "none" : "1px #ffffff3e dashed")};
    position: relative;
    box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.1);
`;
const StyledHandle = styled.div`
    bottom: 0;
    right: 0;
    position: absolute;
    text-align: left;
    color: "white";
    color: #fff;
`;

export const DraggableItem = React.memo(DraggableItemComponent);
