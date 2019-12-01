
export interface IChartDataSet {
    xAxis: any[]
    ChartLines: IChartLine[]
}

export interface IChartLine {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    borderWidth?: number;
}