import type { BarGraphResponse, DonutGraphResponse, HistogramGraphResponse, LineGraphResponse, PieGraphResponse, ScatterGraphResponse } from "../../di/GraphInterface";

export const getLineGraphApi = (): Promise<LineGraphResponse> => {
    return new Promise((resolve, reject) => {
        try {
            const randomNumbers = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));
            resolve({ data: randomNumbers });
        } catch (error) {
            reject(error);
        }
    });
}

export const getBarGraphApi = (): Promise<BarGraphResponse> => {
    return new Promise((resolve, reject) => {
        try {
            resolve({ dataUrl: "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", title: 'Sample Bar Graph' });
        } catch (error) {
            reject(error);
        }
    });
}

export const getPieGraphApi = (): Promise<PieGraphResponse> => {
    return new Promise((resolve, reject) => {
        try {
            const categories = ['Category A', 'Category B', 'Category C', 'Category D'];
            const pieData = categories.map(label => ({
                label,
                value: Math.floor(Math.random() * 100) + 1
            }));
            resolve({ pieData, title: 'Sample Pie Graph' });
        } catch (error) {
            reject(error);
        }
    });
}

export const getHistogramGraphApi = (): Promise<HistogramGraphResponse> => {
    return new Promise((resolve, reject) => {
        try {
            const bins = Array.from({ length: 10 }, (_, i) => ({
                label: `Bin ${i + 1}`,
                value: Math.floor(Math.random() * 50) + 1
            }));
            resolve({ bins, title: 'Sample Histogram Graph' });
        } catch (error) {
            reject(error);
        }
    });
}

export const getDonutGraphApi = (): Promise<DonutGraphResponse> => {
    return new Promise((resolve, reject) => {
        try {
            const completed = Math.floor(Math.random() * 100);
            const remaining = 100 - completed;
            const segments = [
                { name: 'Completed', value: completed },
                { name: 'Remaining', value: remaining },
                { name: 'In Progress', value: Math.floor(Math.random() * remaining) },
                { name: 'On Hold', value: Math.floor(Math.random() * remaining) }
            ];
            const total = segments.reduce((sum, seg) => sum + seg.value, 0);
            const scale = 100 / total;
            const scaledSegments = segments.map(seg => ({
                name: seg.name,
                value: Math.round(seg.value * scale)
            }));
            resolve({
                title: 'Donut Progress',
                innerSize: '50%',
                data: scaledSegments
            });
        } catch (error) {
            reject(error);
        }
    });
}

export const getScatterGraphApi = (): Promise<ScatterGraphResponse> => {
    return new Promise((resolve, reject) => {
        try {
            const points = Array.from({ length: 50 }, (_, i) => ({
                date: i+1 as number,
                value: Math.floor(Math.random() * 100)
            }))
            resolve({ data: points, title: 'Scatter Graph' });
        } catch (error) {
            reject(error);
        }
    });
}