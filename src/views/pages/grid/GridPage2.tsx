import React, { useRef, useState } from "react";

import { DraggableData, DraggableEvent } from "react-draggable";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { setStoredGridLayout } from "../../../redux/grid/grid.slice";
import { useAppSelector } from "../../../redux/hook";
import { IconButton } from "../../../style";
import { LayoutItem } from "../../../types/grid-interface";
import { DraggableItem } from "../../components/draggable/DraggableItem";

const GridPage2 = (): JSX.Element => {
    const dispatch = useDispatch();

    const defaultWidth = 400;

    const containerRef = useRef<HTMLDivElement>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const storedGrid = useAppSelector((state) => state.grid);

    const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

    const [drawedRect, setDrawedRect] = useState({ width: 0, height: 0 });

    const [isCreating, setIsCreating] = useState<boolean>(false);

    const [layout, setLayout] = useState<LayoutItem[]>(storedGrid.layout);

    const [selectedId, setSelectedId] = useState<string>();

    console.log("layout", layout);

    // function removeDuplicates(arr: number[]): number[] {
    //     const uniqueArr = Array.from(new Set(arr));
    //     uniqueArr.sort((a, b) => a - b);
    //     return uniqueArr;
    // }

    /**
     * @name onDragStop
     * @param {DraggableEvent} e 이벤트객체
     * @param {DraggableData} data 이벤트관련 데이터
     * @param {LayoutItem} item 박스 정보
     * @description 드래그 stop시 실행하는 함수
     */
    const onDragStop = (e: DraggableEvent, data: DraggableData, item: LayoutItem) => {
        const { x, y } = data;
        const container = containerRef.current;
        if (!container) return;
        const finedItem = layout.find((ly) => ly.i === item.i);
        const removedArray = layout.filter((ly) => ly.i !== item.i);
        const newItem = finedItem ? { ...finedItem, x: x, y: y } : { x: 20, y: 20, h: 300, w: defaultWidth, i: item.i };
        setLayout([...removedArray, newItem]);
        dispatch(setStoredGridLayout([...removedArray, newItem]));
        setSelectedId(item.i);
    };

    /**
     * @name onResizeBox
     * @param {DraggableEvent} e 이벤트객체
     * @param {LayoutItem} item 박스 정보
     * @description 박스 리사이징하는 함수
     */
    const onResizeBox = (e: React.SyntheticEvent, item: LayoutItem) => {
        const finedItem = layout.find((ly) => ly.i === item.i);
        const removedArray = layout.filter((ly) => ly.i !== item.i);
        const newItem = finedItem
            ? { ...finedItem, w: item.w, h: item.h }
            : { x: 100, y: 100, h: 100, w: 100, i: item.i };
        setLayout([...removedArray, newItem]);
        dispatch(setStoredGridLayout([...removedArray, newItem]));
    };

    /**
     * @name handleAddBox
     * @description 그리드에 박스 추가하는 함수
     * @param x 드래그 시작 포인트 x 값
     * @param y 드래그 시작 포인트 y 값
     * @param w 드래그 넓이
     * @param h 드래고 높이
     * @returns void
     */
    const handleAddBox = (x: number, y: number, w: number, h: number) => {
        if (!containerRef.current) return;
        if (containerRef.current?.clientHeight < y + h) {
            alert("더 이상 추가 할 수 없습니다.");
            return;
        }
        const newBox = { x, y, w, h, i: `box_${Date.now().toString()}` };
        setLayout([...layout, newBox]);
        dispatch(setStoredGridLayout([...layout, newBox]));
    };

    /**
     * @name handleDeleteBox
     * @param id 삭제할 박스의 id 값
     * @description 선택한 박스 삭제하는 함수
     */
    const handleDeleteBox = (id: string) => {
        setLayout(layout.filter((lay) => lay.i !== id));
        dispatch(setStoredGridLayout(layout.filter((lay) => lay.i !== id)));
    };

    /**
     * @name handleMouseDown
     * @param e 이벤트 객체
     * @description mouseDown 시 실행하는 함수
     */
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setStartPos({ x: Math.round(x / 20) * 20, y: Math.round(y / 20) * 20 });
    };

    /**
     * @name handleMouseUp
     * @param e 이벤트 객체
     * @description mouseUp 시 실행하는 함수
     */
    const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (startPos) {
            setDrawedRect({
                width: x - startPos.x,
                height: y - startPos.y,
            });
            drawRect();
        }
    };

    /**
     * @name handleClickCanvas
     * @description 드래그로 박스를 그린 후 클릭 시 실행하는 함수
     */
    const handleClickCanvas = () => {
        if (isCreating && startPos) {
            handleAddBox(startPos.x, startPos.y, drawedRect.width, drawedRect.height);
            setDrawedRect({ width: 0, height: 0 });
            setStartPos(null);
            setIsCreating(false);
        }
    };

    /**
     * @name drawRect
     * @description 드래그로 사각형을 그려주는 함수
     * @returns 함수 종료로 사용
     */
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

    /**
     * @name handleClickBackGroud
     * @description 배경 클릭 시 실행되는 함수. 박스 선택을 취소함.
     * @param e 이벤트 객체
     * @returns
     */
    const handleClickBackGroud = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
    };

    return (
        <StyledWrap>
            <StyledToolbar>
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
                onClick={handleClickCanvas}
                style={{ zIndex: isCreating ? 10 : -10, cursor: "crosshair" }}
            />
            <StyledContainer ref={containerRef} onClick={handleClickBackGroud}>
                {layout.map((item, index) => (
                    <DraggableItem
                        key={`${item.i}_${index}`}
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
    // overflow: hidden;
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
    overflow: hidden;
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
