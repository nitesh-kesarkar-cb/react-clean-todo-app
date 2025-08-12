import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { graphQueryKeys } from '../_constants/queryKeys';
import { graphUseCase } from '../application/useCases/graphUseCase';
import type { BarGraphResponse, DonutGraphResponse, HistogramGraphResponse, LineGraphResponse, PieGraphResponse, ScatterGraphResponse } from '../di/GraphInterface';

export const useGraphViewModel = () => {
  function useLineGraphQuery(): UseQueryResult<LineGraphResponse, unknown> {
    return useQuery<LineGraphResponse>({
      queryKey: graphQueryKeys.lineGraph,
      queryFn: () => graphUseCase.lineGraph(),
      staleTime: 5 * 60 * 1000,
    });
  }

  function useBarGraphQuery(): UseQueryResult<BarGraphResponse, unknown> {
    return useQuery<BarGraphResponse>({
      queryKey: graphQueryKeys.barGraph,
      queryFn: () => graphUseCase.barGraph(),
      staleTime: 5 * 60 * 1000,
    });
  }

  function usePieGraphQuery(): UseQueryResult<PieGraphResponse, unknown> {
    return useQuery<PieGraphResponse>({
      queryKey: graphQueryKeys.pieGraph,
      queryFn: () => graphUseCase.pieGraph(),
      staleTime: 5 * 60 * 1000,
    });
  }

  function useHistogramGraphQuery(): UseQueryResult<HistogramGraphResponse, unknown> {
    return useQuery<HistogramGraphResponse>({
      queryKey: graphQueryKeys.histogramGraph,
      queryFn: () => graphUseCase.histogramGraph(),
      staleTime: 5 * 60 * 1000,
    });
  }

  function useDonutGraphQuery(): UseQueryResult<DonutGraphResponse, unknown> {
    return useQuery<DonutGraphResponse>({
      queryKey: ['graph', 'donutGraph'],
      queryFn: () => graphUseCase.getDonutGraph(),
      staleTime: 5 * 60 * 1000,
    });
  }

  function useScatterGraphQuery(): UseQueryResult<ScatterGraphResponse, unknown> {
    return useQuery<ScatterGraphResponse>({
      queryKey: ['graph', 'scatterGraph'],
      queryFn: () => graphUseCase.getScatterGraph(),
      staleTime: 5 * 60 * 1000,
    });
  }

  return {

    useLineGraphQuery,
    useBarGraphQuery,
    usePieGraphQuery,
    useHistogramGraphQuery,
    useDonutGraphQuery,
    useScatterGraphQuery,
  };
};
export type GraphViewModel = ReturnType<typeof useGraphViewModel>;