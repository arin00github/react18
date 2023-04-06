import { ChartTypeOptionsProps, DataType, LayoutItem } from "./grid-interface";

export class ChartItem<T extends DataType> {
    public chartType: string;
    public gridInfo: LayoutItem;
    public data: T[] | undefined;
    public options: ChartTypeOptionsProps | undefined;
    constructor(gridInfo: LayoutItem, data?: T[], options?: ChartTypeOptionsProps) {
        this.gridInfo = gridInfo;
        this.data = data;
        this.options = options;
        this.chartType = gridInfo.type;
    }

    public getData() {
        return this.data;
    }

    public getGridInfo() {
        return this.gridInfo;
    }

    public setGridInfo(newGridInfo: LayoutItem) {
        this.gridInfo = newGridInfo;
        this.chartType = newGridInfo.type;
    }

    public getOptions() {
        return this.options;
    }

    public setOptions(newOptions: ChartTypeOptionsProps) {
        this.options = newOptions;
    }
}
