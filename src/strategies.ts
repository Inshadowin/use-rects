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
      return { bottom: anchorPosition.bottom };
    }

    return { top: anchorPosition.top };
  },

  left: (anchorPosition, size, flip) => {
    if (flip && anchorPosition.right + size.width >= window.innerWidth) {
      return { right: anchorPosition.right };
    }

    return { left: anchorPosition.left };
  },

  right: (anchorPosition, size, flip) => {
    if (flip && anchorPosition.left + size.width <= 0) {
      return { left: anchorPosition.left };
    }

    return { right: anchorPosition.right };
  },

  bottom: (anchorPosition, size, flip) => {
    if (flip && anchorPosition.bottom + size.height >= window.innerHeight) {
      return { top: anchorPosition.top };
    }

    return { bottom: anchorPosition.bottom };
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
