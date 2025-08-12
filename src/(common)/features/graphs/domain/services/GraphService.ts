import type { BarGraphResponse, DonutGraphResponse, HistogramGraphResponse, LineGraphResponse, PieGraphResponse, ScatterGraphResponse } from "../../di/GraphInterface";

export interface GraphService {
  getLineGraph(): Promise<LineGraphResponse>;
  getBarGraph(): Promise<BarGraphResponse>;
  getPieGraph(): Promise<PieGraphResponse>;
  getHistogramGraph(): Promise<HistogramGraphResponse>;
  getDonutGraph(): Promise<DonutGraphResponse>;
  getScatterGraph(): Promise<ScatterGraphResponse>;
}