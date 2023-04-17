export type LayoutItem = {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
    type: string;
};

export type BeerDataProps = {
    id: number;
    uid: string;
    brand: string;
    name: string;
    style: string;
    hop: string;
    yeast: string;
    malts: string;
    ibu: string;
    alcohol: string;
    big: string;
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
export interface ChartOptionsProps {
    key: string;
    option?: {
        width?: number;
        height?: number;
        title?: string;
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

export interface LineChartOptionsProps extends ChartOptionsProps {
    lineOptions?: {
        strokeColor?: string;
        strokeWidth?: number;
    };
}

export interface BarChartOptionsProps extends ChartOptionsProps {
    barOptions?: {
        barColor?: string;
    };
}

export type ChartTypeOptionsProps = LineChartOptionsProps | BarChartOptionsProps;
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

export interface BarChartProps<T extends DataType> {
    data: T[];
    option?: {
        width?: number;
        height?: number;
        title?: string;
        barStyle?: {
            barColor?: string;
            barWidth?: number;
        };
        margin?: {
            top: number;
            bottom: number;
            right: number;
            left: number;
        };
        tooltip?: {
            formatter?: (value: number) => string;
            renderTooltip?: (props: TooltipProps) => JSX.Element;
        };
        background?: string;
    };
}

export interface PieChartProps<T extends DataType> {
    data: T[];
    option?: {
        width?: number;
        height?: number;
        title?: string;
        lineStyle?: {
            lineColor?: string;
            strokeWidth?: number;
        };
        margin?: {
            top: number;
            bottom: number;
            right: number;
            left: number;
        };
        tooltip?: {
            formatter?: (value: number) => string;
            renderTooltip?: (props: TooltipProps) => JSX.Element;
        };
        background?: string;
    };
}

export type AllChartProps<T extends DataType> = {
    type: string;
    chart: LineChartProps<T> | PieChartProps<T> | BarChartProps<T>;
};
