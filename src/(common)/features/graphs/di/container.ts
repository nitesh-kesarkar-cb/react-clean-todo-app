import { GraphServiceMock } from '../infrastructure/GraphServiceMock';

export const graphContainer = {
  graphService: GraphServiceMock,
};

export type GraphContainer = typeof graphContainer;
