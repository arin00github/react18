import React, { useReducer, useRef, useState, useEffect } from "react";

import { Select } from "antd";
import { DraggableData, DraggableEvent } from "react-draggable";
import { FaChevronLeft, FaCog, FaPlus } from "react-icons/fa";
import styled from "styled-components";

import { setStoredCommonAsideOpend } from "../../../../redux/common/common.slice";
import { setStoredGridLayout, setStoredGridSelectedChart } from "../../../../redux/grid/grid.slice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import { layoutReducer } from "../../../../service/reducer/grid-reducer";
import { IconButton } from "../../../../style";
import { LayoutItem } from "../../../../types/grid-interface";
import { DraggableItem } from "../../../components/draggable/DraggableItem";
import { ChartDetailDrawer } from "../drawer/ChartDetailDrawer";
import { ChartDrawer } from "../drawer/ChartDrawer";

const chartLibrary = [
    { title: "rechart", key: "rechart" },
    { title: "chart.js", key: "chart.js" },
    { title: "echarts", key: "echarts" },
    { title: "d3", key: "d3" },
];

export const GridEntryContainer = () => {
    const dispatch = useAppDispatch();

    const defaultWidth = 400;

    const containerRef = useRef<HTMLDivElement>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const storedCommon = useAppSelector((state) => state.common);

    const storedGridLayout = useAppSelector(
        (state) => state.grid.layout,
        (prev, curr) => prev === curr
    );

    const [selectedLibrary, setSelectedLibrary] = useState("rechart");

    const { selectedChart } = useAppSelector((state) => state.grid);

    // 박스생성 시작점
    const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

    // 차트타입
    const [chartType, setChartType] = useState<string | undefined>(undefined);

    const [drawedRect, setDrawedRect] = useState({ width: 0, height: 0 });

    // 차트생성 상태 (canvas 태그 파싱 여부)
    const [isCreating, setIsCreating] = useState<boolean>(false);

    // 레아이웃
    const [layout, dispatchLayout] = useReducer(layoutReducer, storedGridLayout);

    // 레아이웃(useState 예시자료)
    const [layout2, setLayout2] = useState(storedGridLayout);

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const [detailDrawerOpen, setDetailDrawerOpen] = useState<boolean>(false);

    /**
     * @name onDragStop
     * @param {DraggableEvent} e 이벤트객체
     * @param {DraggableData} data 이벤트관련 데이터
     * @param {LayoutItem} item 박스 정보
     * @description 드래그 stop시 실행하는 함수
     */
    const onDragStop = (e: DraggableEvent, data: DraggableData, item: LayoutItem) => {
        console.log("e.target stop", e.target);
        console.log("e.currenttarget", e.currentTarget);
        const { x, y } = data;
        const container = containerRef.current;
        if (!container) return;
        const finedItem = layout.find((ly) => ly.i === item.i);
        const keepArray = layout.filter((ly) => ly.i !== item.i);
        const newItem = finedItem
            ? { ...finedItem, x: x, y: y }
            : { x: 20, y: 20, h: 300, w: defaultWidth, i: item.i, type: "" };

        dispatchLayout({ type: "UPDATE_ITEM", payload: newItem });
        dispatch(setStoredGridLayout([...keepArray, newItem]));
        setLayout2([...keepArray, newItem]);
        dispatch(setStoredGridSelectedChart(item.i));
    };

    /**
     * @name onResizeBox
     * @param {DraggableEvent} e 이벤트객체
     * @param {LayoutItem} item 박스 정보
     * @description 박스 리사이징하는 함수
     */
    const onResizeBox = (e: React.SyntheticEvent, item: LayoutItem) => {
        console.log("onResizeBox");
        const finedItem = layout.find((ly) => ly.i === item.i);
        const removedArray = layout.filter((ly) => ly.i !== item.i);
        const newItem = finedItem
            ? { ...finedItem, w: item.w, h: item.h }
            : { x: 100, y: 100, h: 100, w: 100, i: item.i, type: "" };

        dispatchLayout({ type: "UPDATE_ITEM", payload: newItem });
        dispatch(setStoredGridLayout([...removedArray, newItem]));
        setLayout2([...removedArray, newItem]);
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
        const newBox = { x, y, w, h, i: `box_${Date.now().toString()}`, type: chartType ? chartType : "" };

        dispatchLayout({ type: "ADD_ITEM", payload: newBox });
        dispatch(setStoredGridLayout([...layout, newBox]));
        //setLayout2([...layout, newBox]);
    };

    /**
     * @name handleDeleteBox
     * @param id 삭제할 박스의 id 값
     * @description 선택한 박스 삭제하는 함수
     */
    const handleDeleteBox = (id: string) => {
        dispatchLayout({ type: "DELETE_ITEM", payload: id });
        dispatch(setStoredGridLayout(layout.filter((lay) => lay.i !== id)));
        setLayout2(layout.filter((lay) => lay.i !== id));
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
        console.log("handleClickCanvas");
        if (isCreating && startPos) {
            handleAddBox(startPos.x, startPos.y, drawedRect.width, drawedRect.height);
            setDrawedRect({ width: 0, height: 0 });
            setStartPos(null);
            setIsCreating(false);
            setChartType(undefined);
        }
    };

    /**
     * @name drawRect
     * @description 드래그로 사각형을 그려주는 함수
     * @returns 함수 종료로 사용
     */
    const drawRect = () => {
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
        console.log("handleClickBackGroud", e);
        const eventDiv = (e.target as HTMLDivElement) || HTMLElement;
        if (eventDiv.getAttribute("aria-label")) return;
        if (!selectedChart) return;
        //e.target이나, 그 자식노드가 "container"라는 id 있는 경우를 체크
        const hasIdContainer = eventDiv.id === "container";
        const childAr = Array.from(e.currentTarget.children);
        const hansChildIdContainer = childAr.some((child) => {
            return child.id === "container";
        });
        if (hasIdContainer || hansChildIdContainer) {
            dispatch(setStoredGridSelectedChart(undefined));
        }
    };

    const handleClickAddBtn = () => {
        setIsCreating(true);
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    // useEffect(() => {
    //     const navigationTiming = performance.getEntriesByType("navigation");
    //     console.log(" navigationTiming", navigationTiming);
    // }, []);

    return (
        <>
            <StyledWrap>
                <StyledToolbar>
                    <IconButton onClick={() => dispatch(setStoredCommonAsideOpend(!storedCommon.isOpenedAside))}>
                        <FaChevronLeft />
                    </IconButton>
                    <IconButton onClick={handleClickAddBtn}>
                        <FaPlus />
                    </IconButton>
                    <IconButton onClick={() => setDrawerOpen(true)}>
                        <FaCog />
                    </IconButton>
                    <Select
                        style={{ width: 180 }}
                        value={selectedLibrary}
                        onChange={(value) => setSelectedLibrary(value)}
                    >
                        {chartLibrary.map((list) => {
                            return (
                                <option value={list.key} key={list.key}>
                                    {list.title}
                                </option>
                            );
                        })}
                    </Select>
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
                <StyledContainer id="container" ref={containerRef} onClick={handleClickBackGroud}>
                    {/* {layout2.map((item, index) => (
                        <DraggableItem
                            chartType={item.type}
                            key={`${item.i}_${index}`}
                            item={item}
                            onDragStop={onDragStop}
                            onResizeBox={onResizeBox}
                            handleDelete={handleDeleteBox}
                            handleSetting={() => setDetailDrawerOpen(true)}
                        ></DraggableItem>
                    ))} */}
                    {layout.map((item, index) => (
                        <DraggableItem
                            selectedLibrary={selectedLibrary}
                            chartType={item.type}
                            key={`${item.i}_${index}`}
                            item={item}
                            onDragStop={onDragStop}
                            onResizeBox={onResizeBox}
                            handleDelete={handleDeleteBox}
                            handleSetting={() => setDetailDrawerOpen(true)}
                        ></DraggableItem>
                    ))}
                    <ChartDrawer
                        title="Chart Category"
                        isOpen={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        handleChartInsert={(newItem: LayoutItem) => {
                            dispatchLayout({ type: "UPDATE_ITEM", payload: newItem });
                            setLayout2(layout2.map((ly) => (ly.i === newItem.i ? newItem : ly)));
                        }}
                        handleChartClick={(type: string) => {
                            setDrawerOpen(false);
                            handleClickAddBtn();
                            setChartType(type);
                        }}
                    />
                    <ChartDetailDrawer
                        isOpen={detailDrawerOpen}
                        onClose={() => setDetailDrawerOpen(false)}
                        title="차트 상세 설정"
                    />
                </StyledContainer>
            </StyledWrap>
        </>
    );
};

const StyledWrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    // overflow: hidden;
`;

const StyledToolbar = styled.div`
    width: 100%;
    height: 48px;
    background-color: #ffffff24;
`;

const StyledCanvas = styled.canvas`
    position: absolute;
    top: 48px;
    left: 0;
    width: 100%;
    height: calc(100vh - 48px);
    overflow: hidden;
`;

const StyledContainer = styled.div`
    position: absolute;
    top: 48px;
    left: 0;
    width: 100%;
    height: calc(100vh - 48px);
    overflow: hidden;

    .react-resizable {
        position: absolute;
        border: 1px solid transparent;

        &.grid-item {
            z-index: 100;
            border: 1px solid yellow;
            // box-sizing: border-box;
        }
    }
`;
