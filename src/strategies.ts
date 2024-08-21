import type {
  SizeType,
  AlignType,
  AlignStrategy,
  ResultPositionType,
  ElementPositionType,
} from './types';

type StrategyType = (
  anchorPosition: ElementPositionType,
  size: SizeType,
  flip: boolean
) => ResultPositionType;

export const strategies: { [x in AlignStrategy]: StrategyType } = {
  top: (anchorPosition, size, flip) => {
    if (flip && anchorPosition.top - size.height <= 0) {
      return strategies.bottom(anchorPosition, size, false);
    }

    return { top: anchorPosition.top };
  },

  left: (anchorPosition, size, flip) => {
    if (flip && anchorPosition.left + size.width >= window.innerWidth) {
      return strategies.right(anchorPosition, size, false);
    }

    return { left: anchorPosition.left };
  },

  right: (anchorPosition, size, flip) => {
    if (flip && anchorPosition.right - size.width <= 0) {
      return strategies.left(anchorPosition, size, false);
    }

    return { left: anchorPosition.right - size.width };
  },

  bottom: (anchorPosition, size, flip) => {
    if (flip && anchorPosition.bottom + size.height >= window.innerHeight) {
      return strategies.top(anchorPosition, size, false);
    }

    return { top: anchorPosition.bottom };
  },
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
