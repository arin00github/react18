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

    const [layout, setLayout] = useState<LayoutItem[]>([{ x: 20, y: 20, h: 300, w: 300, i: "box_01" }]);

    const [selectedId, setSelectedId] = useState<string>();

    const onDragStop = (e: DraggableEvent, data: DraggableData, item: LayoutItem) => {
        const { x, y } = data;
        const container = containerRef.current;
        if (!container) return;
        const finedItem = layout.find((ly) => ly.i === item.i);
        const removedArray = layout.filter((ly) => ly.i !== item.i);
        const newItem = finedItem ? { ...finedItem, x: x, y: y } : { x: 20, y: 20, h: 300, w: 300, i: item.i };
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
        console.log("finalArr", finalArr);

        //중간에 칸 너비
        if (finalArr.length >= 2) {
            let findGap = 0;
            let findIndex = 0;
            for (let i = 0; i < finalArr.length - 1; i++) {
                findGap = finalArr[i + 1].x - finalArr[i].x - finalArr[i].w - gap;
                findIndex = i;
                if (findGap >= 300) break;
            }
            console.log("findGap", findGap, "findIndex", findIndex);
            if (findGap >= 300) {
                return [finalArr[findIndex].x + finalArr[findIndex].w + 20, finalArr[findIndex].y];
            }
        }
        const filterArr = layout.filter((ly) => ly.y === yMax);

        const xArray = filterArr.map((ly) => ly.x);
        const max = xArray.reduce((a, b) => Math.max(a, b), -Infinity);
        const findPrevX = filterArr.find((ly) => ly.x === max);
        console.log("findPrevX", findPrevX);
        let returnX = 20;
        let returnY = yMax;
        const returnW = findPrevX ? findPrevX.w : 300;
        if (max + 300 + gap <= 1400) {
            returnX = max + returnW + gap;
        } else {
            returnY = yMax + returnW + gap;
        }
        return [returnX, returnY];
    };

    return (
        <StyledWrap>
            <StyledToolbar>
                <IconButton onClick={() => handleAddBox(calculateXY()[0], calculateXY()[1], 300, 300)}>
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
