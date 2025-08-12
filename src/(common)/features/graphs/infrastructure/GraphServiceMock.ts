import type { BarGraphResponse, DonutGraphResponse, HistogramGraphResponse, LineGraphResponse, PieGraphResponse, ScatterGraphResponse } from '../di/GraphInterface';
import type { GraphService } from '../domain/services/GraphService';
import { getLineGraphApi, getBarGraphApi, getPieGraphApi, getHistogramGraphApi, getDonutGraphApi, getScatterGraphApi } from '../domain/api/graphApi';

export const GraphServiceMock: GraphService = {
  getLineGraph: async (): Promise<LineGraphResponse> => {
    const response = await getLineGraphApi();
    return response as LineGraphResponse;
  },

  getBarGraph: async (): Promise<BarGraphResponse> => {
    const response = await getBarGraphApi();
    return response as BarGraphResponse;
  },


  getPieGraph: async (): Promise<PieGraphResponse> => {
    // Mock implementation for pie graph
    const response = await getPieGraphApi();
    return response as PieGraphResponse;
  },

  getHistogramGraph: async (): Promise<HistogramGraphResponse> => {
    const response = await getHistogramGraphApi();
    return response as HistogramGraphResponse;
  },

  getDonutGraph: async (): Promise<DonutGraphResponse> => {
    const response = await getDonutGraphApi();
    return response as DonutGraphResponse;
  },

  getScatterGraph: async (): Promise<ScatterGraphResponse> => {
    const response = await getScatterGraphApi();
    return response as ScatterGraphResponse;
  }

};



