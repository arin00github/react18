export type LayoutItem = {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
    type: string;
};

export type DataType = {
    date: string;
    value: number;
    name: string;
};
interface TooltipProps {
    x: number;
    y: number;
    content: string;
}

export interface LineChartOptionsProps {
    key: string;
    option?: {
        width?: number;
        height?: number;
        title?: string;
        lineStyle?: {
            strokeColor?: string;
            strokeWidth?: number;
        };
        margin?: {
            top: number;
            bottom: number;
            right: number;
            left: number;
        };
        tooltip?: {
            display: boolean;
            formatter?: (value: number) => string;
            renderTooltip?: (props: TooltipProps) => JSX.Element;
        };
        background?: string;
    };
}

export interface LineChartProps<T extends DataType> {
    data: T[];
    option?: {
        width?: number;
        height?: number;
        title?: string;
        lineStyle?: {
            strokeColor?: string;
            strokeWidth?: number;
        };
        margin?: {
            top: number;
            bottom: number;
            right: number;
            left: number;
        };
        tooltip?: {
            display: boolean;
            formatter?: (value: number) => string;
            renderTooltip?: (props: TooltipProps) => JSX.Element;
        };
        background?: string;
    };
}
