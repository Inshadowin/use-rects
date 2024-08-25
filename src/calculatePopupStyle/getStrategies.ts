import { executeStrategy } from './executeStrategy';
import type { AlignType, StrategyType, AlignStrategy } from '../types';

const strategies: { [x in AlignStrategy]: StrategyType } = {
  top: (...params) => executeStrategy('top', ...params),
  left: (...params) => executeStrategy('left', ...params),
  right: (...params) => executeStrategy('right', ...params),
  bottom: (...params) => executeStrategy('bottom', ...params),
};

export const getStrategies = (
  align: AlignType
): [StrategyType, StrategyType] => {
  switch (align) {
    case 'bottomleft':
      return [strategies.bottom, strategies.left];
    case 'bottomright':
      return [strategies.bottom, strategies.right];
    case 'topleft':
      return [strategies.top, strategies.left];
    case 'topright':
      return [strategies.top, strategies.right];
    default:
      return [strategies.bottom, strategies.left];
  }
};
