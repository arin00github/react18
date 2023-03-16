import React, { useState } from "react";

import { Card, Col, Space, Input, Form, Switch, Checkbox, Button, Radio } from "antd";
import { Drawer } from "antd";
import Draggable from "react-draggable";
import styled from "styled-components";

import { ChartMenu } from "../../../components/common/ChartMenu";

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

    const [chartOption, setChartOption] = useState<LineChartOption>({
        backgroundColor: "",
        strokeColor: "",
        tooltip: false,
    });

    const onFinish = (values: LineChartOption) => {
        console.log("values", values);
    };

    const onFinishFailed = (errors: any) => {
        console.log("Failed :", errors);
    };

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
                    <Input />
                </Form.Item>

                <Form.Item label="strokeColor" name="strokeColor">
                    <Input />
                </Form.Item>
                <Form.Item label="tooltip" name="tooltip">
                    <Radio.Group>
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
