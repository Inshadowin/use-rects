import { getAlignFromStrategies } from './strategies';
import type { StrategyResultType, MergedStrategyResultType } from '../types';

type MergeResultsType = (
  strategiesResults: StrategyResultType[]
) => MergedStrategyResultType;

export const mergeStrategiesResults: MergeResultsType = results => {
  const strategies = results
    .map(result => result.meta?.strategy)
    .filter(Boolean);

  return {
    position: results.reduce((acc, curr) => ({ ...acc, ...curr.position }), {}),

    meta: {
      strategies,
      flip: results.some(r => r.meta?.flip),
      align: getAlignFromStrategies(strategies),
      pessimistic: results.some(r => r.meta?.pessimistic),
    },
  };
};
