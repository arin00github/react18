import React, { useCallback, useMemo, useState } from "react";

import { Input, Form, Button, Radio } from "antd";
import { Drawer } from "antd";

import { useAppSelector } from "../../../../redux/hook";
import { LineChartOptionsProps } from "../../../../types/grid-interface";

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
    title: string;
}

export const ChartDetailDrawer = (props: ChartDetailDrawerProps) => {
    //data

    const { isOpen, onClose, title } = props;

    const storedGrid = useAppSelector((state) => state.grid);

    const { selectedChart, chartOptionArray } = storedGrid;

    const chartOptionObject: LineChartOptionsProps | null = useMemo(() => {
        if (selectedChart) {
            const answer = chartOptionArray.find((option) => option.key === selectedChart);
            if (answer === undefined) {
                return null;
            }
            return answer;
        } else {
            return null;
        }
    }, [chartOptionArray, selectedChart]);

    const [chartOption, setChartOption] = useState<LineChartOption>({
        backgroundColor: chartOptionObject?.option?.background || "",
        strokeColor: chartOptionObject?.lineOptions?.strokeColor || "",
        tooltip: chartOptionObject?.option?.tooltip?.display || false,
        title: chartOptionObject?.option?.title || "",
    });

    console.log("chartOptionObject", chartOptionObject);

    const onFinish = (values: LineChartOption) => {
        console.log("values", values);
    };

    const onFinishFailed = (errors: any) => {
        console.log("Failed :", errors);
    };

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target as HTMLInputElement;
            setChartOption({
                ...chartOption,
                [name]: value,
            });
        },
        [chartOption]
    );

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
                <Form.Item label="title" name="title">
                    <Input value={chartOption.title} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item label="backgroundColor" name="backgroundColor">
                    <Input value={chartOption.backgroundColor} onChange={handleInputChange} />
                </Form.Item>

                <Form.Item label="strokeColor" name="strokeColor">
                    <Input value={chartOption.strokeColor} onChange={handleInputChange} />
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
