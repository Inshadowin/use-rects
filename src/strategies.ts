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
  flip: boolean,
  pessimistic: boolean
) => ResultPositionType;

type CanApplyStrategyType = (
  anchorPosition: ElementPositionType,
  size: SizeType
) => boolean;

const pessimisticStrategyResult: ResultPositionType = { left: 0, top: 0 };

const canApplyStrategy: { [x in AlignStrategy]: CanApplyStrategyType } = {
  top: (anchor, size) => anchor.top - size.height > 0,
  right: (anchor, size) => anchor.right - size.width > 0,
  left: (anchor, size) => anchor.left + size.width < window.innerWidth,
  bottom: (anchor, size) => anchor.bottom + size.height < window.innerHeight,
};

export const strategies: { [x in AlignStrategy]: StrategyType } = {
  top: (anchorPosition, size, flip, pessimistic) => {
    if (!flip || canApplyStrategy.top(anchorPosition, size)) {
      return { top: anchorPosition.top - size.height };
    }

    if (!pessimistic || canApplyStrategy.bottom(anchorPosition, size)) {
      return strategies.bottom(anchorPosition, size, false, false);
    }

    return pessimisticStrategyResult;
  },

  left: (anchorPosition, size, flip, pessimistic) => {
    if (!flip || canApplyStrategy.left(anchorPosition, size)) {
      return { left: anchorPosition.left };
    }

    if (!pessimistic || canApplyStrategy.right(anchorPosition, size)) {
      return strategies.right(anchorPosition, size, false, false);
    }

    return pessimisticStrategyResult;
  },

  right: (anchorPosition, size, flip, pessimistic) => {
    if (!flip || canApplyStrategy.right(anchorPosition, size)) {
      return { left: anchorPosition.right - size.width };
    }

    if (!pessimistic || canApplyStrategy.left(anchorPosition, size)) {
      return strategies.left(anchorPosition, size, false, false);
    }

    return pessimisticStrategyResult;
  },

  bottom: (anchorPosition, size, flip, pessimistic) => {
    if (!flip || canApplyStrategy.bottom(anchorPosition, size)) {
      return { top: anchorPosition.bottom };
    }

    if (!pessimistic || canApplyStrategy.top(anchorPosition, size)) {
      return strategies.top(anchorPosition, size, false, false);
    }

    return pessimisticStrategyResult;
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
