import { graphContainer } from '../../di/container';

export const graphUseCase = {
  lineGraph: async () => {
    return await graphContainer.graphService.getLineGraph();
  },

  barGraph: async () => {
    return await graphContainer.graphService.getBarGraph();
  },

  pieGraph: async () => {
    return await graphContainer.graphService.getPieGraph();
  },


  histogramGraph: async () => {
    return await graphContainer.graphService.getHistogramGraph();
  },

  getDonutGraph: async () => {
    return await graphContainer.graphService.getDonutGraph();
  },

  getScatterGraph: async () => {
    return await graphContainer.graphService.getScatterGraph();
  }

};
  