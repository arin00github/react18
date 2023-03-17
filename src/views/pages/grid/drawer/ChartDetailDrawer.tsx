import React, { useMemo, useState } from "react";

import { Card, Col, Space, Input, Form, Switch, Checkbox, Button, Radio } from "antd";
import { Drawer } from "antd";

import { useAppSelector } from "../../../../redux/hook";

interface ChartDetailDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    //handleChartClick: (type: string) => void;
}

interface LineChartOption {
    backgroundColor: string;
    strokeColor: string;
    tooltip: boolean;
}

export const ChartDetailDrawer = (props: ChartDetailDrawerProps) => {
    const { isOpen, onClose, title } = props;

    const storedGrid = useAppSelector((state) => state.grid);

    const { selectedChart, chartOptionArray } = storedGrid;

    const selectedChartOption = useMemo(() => {
        if (selectedChart) {
            return chartOptionArray.find((option) => option.key === selectedChart);
        } else {
            return null;
        }
    }, [chartOptionArray, selectedChart]);

    const [chartOption, setChartOption] = useState<LineChartOption>({
        backgroundColor: selectedChartOption?.option?.background || "",
        strokeColor: selectedChartOption?.option?.lineStyle?.strokeColor || "",
        tooltip: selectedChartOption?.option?.tooltip?.display || false,
    });

    const onFinish = (values: LineChartOption) => {
        console.log("values", values);
    };

    const onFinishFailed = (errors: any) => {
        console.log("Failed :", errors);
    };
    console.log("chartOption", chartOption);

    return (
        <Drawer size="large" mask={false} title={title} placement="right" open={isOpen} onClose={onClose}>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                initialValues={chartOption}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item label="backgroundColor" name="backgroundColor">
                    <Input value={chartOption.backgroundColor} />
                </Form.Item>

                <Form.Item label="strokeColor" name="strokeColor">
                    <Input value={chartOption.strokeColor} />
                </Form.Item>
                <Form.Item label="tooltip" name="tooltip">
                    <Radio.Group value={chartOption.tooltip}>
                        <Radio value={true}> 사용 </Radio>
                        <Radio value={false}> 사용안함 </Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        저장
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};
