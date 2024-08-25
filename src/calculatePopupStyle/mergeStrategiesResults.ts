import type { StrategyResultType } from '../types';

type MergeResultsType = (
  strategiesResults: StrategyResultType[]
) => StrategyResultType;

export const mergeStrategiesResults: MergeResultsType = results => {
  return {
    position: results.reduce((acc, curr) => ({ ...acc, ...curr.position }), {}),

    meta: {
      flip: results.some(r => r.meta?.flip),
      pessimistic: results.some(r => r.meta?.pessimistic),
    },
  };
};
