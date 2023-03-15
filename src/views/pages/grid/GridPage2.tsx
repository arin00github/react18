import React, { useRef, useState } from "react";

import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { FaDrawPolygon, FaPlus } from "react-icons/fa";
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

    const defaultWidth = 400;
    const defaultHeight = 300;

    const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
    const [endPos, setEndPos] = useState({ x: 0, y: 0 });
    const [drawedRect, setDrawedRect] = useState({ width: 0, height: 0 });

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [isCreating, setIsCreating] = useState<boolean>(false);

    const [layout, setLayout] = useState<LayoutItem[]>([{ x: 20, y: 20, h: 300, w: defaultWidth, i: "box_01" }]);

    const [selectedId, setSelectedId] = useState<string>();

    const onDragStop = (e: DraggableEvent, data: DraggableData, item: LayoutItem) => {
        const { x, y } = data;
        const container = containerRef.current;
        if (!container) return;
        const finedItem = layout.find((ly) => ly.i === item.i);
        const removedArray = layout.filter((ly) => ly.i !== item.i);
        const newItem = finedItem ? { ...finedItem, x: x, y: y } : { x: 20, y: 20, h: 300, w: defaultWidth, i: item.i };
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
        if (!containerRef.current) return;
        if (containerRef.current?.clientHeight < y + h) {
            alert("더 이상 추가 할 수 없습니다.");
            return;
        }
        const newBox = { x, y, w, h, i: `box_${Date.now().toString()}` };
        setLayout([...layout, newBox]);
    };

    function removeDuplicates(arr: number[]): number[] {
        const uniqueArr = Array.from(new Set(arr));
        uniqueArr.sort((a, b) => a - b);
        return uniqueArr;
    }

    const handleDeleteBox = (id: string) => {
        setLayout(layout.filter((lay) => lay.i !== id));
    };

    const gap = 20;

    /***
     * 가장 오른쪽, 가장 아래있는 요소
     * row에서 마지막 박스는 width 값을 체크해야 함.
     * 중간에 칸이 넗게 빌 수도 있음. (체크필요)
     *
     */
    const calculateXY = () => {
        const yCategory = removeDuplicates(layout.map((ly) => ly.y));
        const yMax = yCategory.reduce((a, b) => Math.max(a, b));

        const arrangedArr: LayoutItem[][] = yCategory.map((yVal) => {
            return layout.filter((ly) => ly.y === yVal).sort((a, b) => a.x - b.x);
        });
        const finalArr = arrangedArr.reduce((a, b) => a.concat(b));

        //중간에 가로값 칸 너비
        if (finalArr.length >= 2) {
            let findGap = 0;
            let findIndex = 0;
            for (let i = 0; i < finalArr.length - 1; i++) {
                const coincidenceY = finalArr[i + 1].y === finalArr[i].y;
                if (coincidenceY) {
                    findGap = finalArr[i + 1].x - finalArr[i].x - finalArr[i].w - gap;
                } else {
                    findGap = finalArr[i + 1].x - gap;
                }

                findIndex = i;
                if (findGap >= 300) {
                    return [
                        coincidenceY ? finalArr[findIndex].x + finalArr[findIndex].w + 20 : 20,
                        coincidenceY ? finalArr[findIndex].y : finalArr[findIndex + 1].y,
                    ];
                    break;
                }
            }
        }
        const filterArr = layout.filter((ly) => ly.y === yMax);

        const xArray = filterArr.map((ly) => ly.x);
        const max = xArray.reduce((a, b) => Math.max(a, b), -Infinity);
        const findPrevX = filterArr.find((ly) => ly.x === max);
        let returnX = 20;
        let returnY = yMax;
        const returnW = findPrevX ? findPrevX.w : defaultWidth;
        if (max + defaultWidth + gap <= 1400) {
            returnX = max + returnW + gap;
        } else {
            returnY = yMax + defaultHeight + gap;
        }
        return [returnX, returnY];
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const target = e.currentTarget as HTMLElement;
        console.log("target", target);
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setStartPos({ x: Math.round(x / 20) * 20, y: Math.round(y / 20) * 20 });
        console.log("moseDown", Math.round(x / 20) * 20, Math.round(y / 20) * 20);
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setEndPos({ x: x, y: y });
        if (startPos) {
            setDrawedRect({
                width: x - startPos.x,
                height: y - startPos.y,
            });
            drawRect();
        }
    };

    const drawRect = () => {
        console.log("drawReact");
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "#fff";
            ctx.fillStyle = "#9ac7ff5c";
            if (startPos) {
                ctx.fillRect(startPos.x, startPos.y, drawedRect.width, drawedRect.height);
                ctx.strokeRect(startPos.x, startPos.y, drawedRect.width, drawedRect.height);
            }
        }
    };

    return (
        <StyledWrap>
            <StyledToolbar>
                {/* <IconButton
                    onClick={() => {
                        handleAddBox(calculateXY()[0], calculateXY()[1], defaultWidth, defaultHeight);
                    }}
                >
                    <FaPlus />
                </IconButton> */}
                <IconButton
                    onClick={() => {
                        setIsCreating(true);
                        if (!canvasRef.current) return;
                        const canvas = canvasRef.current;
                        const ctx = canvas.getContext("2d");
                        if (ctx) {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                        }
                    }}
                >
                    <FaPlus />
                </IconButton>
            </StyledToolbar>
            <StyledCanvas
                ref={canvasRef}
                width={containerRef.current?.clientWidth}
                height={containerRef.current?.clientHeight}
                onMouseDown={(e) => handleMouseDown(e)}
                onMouseMove={(e) => handleMouseUp(e)}
                onMouseUp={(e) => drawRect()}
                onClick={() => {
                    if (isCreating && startPos) {
                        handleAddBox(startPos.x, startPos.y, drawedRect.width, drawedRect.height);
                        setDrawedRect({ width: 0, height: 0 });
                        setStartPos(null);
                        setIsCreating(false);
                    }
                }}
                style={{ zIndex: isCreating ? 10 : -10, cursor: "crosshair" }}
            />
            <StyledContainer
                ref={containerRef}
                // onMouseDown={(e) => handleMouseDown(e)}
                // onMouseUp={(e) => handleMouseUp(e)}
                onClick={(e) => {
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
                        handleDelete={handleDeleteBox}
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

const StyledCanvas = styled.canvas`
    position: absolute;
    top: 60;
    left: 0;
    width: 100%;
    height: calc(100vh - 60px);
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
