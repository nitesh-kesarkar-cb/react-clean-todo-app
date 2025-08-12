export interface LineGraphResponse {
    data: number[];
    title?: string;
}

export interface BarGraphResponse {
    dataUrl?: string;
    title?: string;
}

export interface PieGraphResponse {
    pieData: { label: string; value: number }[];
    title?: string;
}

export interface HistogramGraphResponse extends BarGraphResponse {
    bins: { label: string; value: number }[];
    title?: string;
}

export interface DonutGraphResponse {
    title: string;
    innerSize?: string;
    data: {
        name: string;
        value: number;
    }[];
}

export interface ScatterGraphResponse {
    data: { date: number; value: number }[];
    title?: string;
}