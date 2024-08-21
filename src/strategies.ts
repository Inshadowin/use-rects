import type { SizeType, AlignStrategy, PositionType } from './types';

type StrategyType = (size: SizeType) => PositionType;

export const strategies: { [x in AlignStrategy]: StrategyType } = {
  top: () => ({}),
  left: () => ({}),
  right: () => ({}),
  bottom: () => ({}),
};
