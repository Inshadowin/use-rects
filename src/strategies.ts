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

type ApplyStrategyType = (
  anchorPosition: ElementPositionType,
  size: SizeType
) => ResultPositionType;

const pessimisticStrategyResult: ResultPositionType = { left: 0, top: 0 };
const fallbackStrategy: { [x in AlignStrategy]: AlignStrategy } = {
  bottom: 'top',
  top: 'bottom',
  left: 'right',
  right: 'left',
};
const canApplyStrategy: { [x in AlignStrategy]: CanApplyStrategyType } = {
  top: (anchor, size) => anchor.top - size.height > 0,
  left: (anchor, size) => anchor.left + size.width < window.innerWidth,
  right: (anchor, size) => anchor.right - size.width > 0,
  bottom: (anchor, size) => anchor.bottom + size.height < window.innerHeight,
};
const applyStrategy: { [x in AlignStrategy]: ApplyStrategyType } = {
  top: (anchor, size) => ({ top: anchor.top - size.height }),
  left: (anchor, _size) => ({ left: anchor.left }),
  right: (anchor, size) => ({ left: anchor.right - size.width }),
  bottom: (anchor, _size) => ({ top: anchor.bottom }),
};

const executeStrategy = (
  strategy: AlignStrategy,
  anchorPosition: ElementPositionType,
  size: SizeType,
  flip: boolean,
  pessimistic: boolean
) => {
  if (!flip || canApplyStrategy[strategy](anchorPosition, size)) {
    return applyStrategy[strategy](anchorPosition, size);
  }

  const fallback = fallbackStrategy[strategy];
  if (!pessimistic || canApplyStrategy[fallback](anchorPosition, size)) {
    return applyStrategy[fallback](anchorPosition, size);
  }

  return pessimisticStrategyResult;
};

export const strategies: { [x in AlignStrategy]: StrategyType } = {
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
