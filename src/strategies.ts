import type {
  SizeType,
  AlignType,
  AlignStrategy,
  ResultPositionType,
  ElementPositionType,
} from './types';

type StrategyResultType = {
  position: ResultPositionType;
  meta?: { pessimistic?: boolean; flip?: boolean };
};

export type StrategyType = (
  anchorPosition: ElementPositionType,
  size: SizeType,
  flip: boolean,
  pessimistic: boolean
) => StrategyResultType;

type CanApplyStrategyType = (
  anchorPosition: ElementPositionType,
  size: SizeType
) => boolean;

type ApplyStrategyType = (
  anchorPosition: ElementPositionType,
  size: SizeType
) => ResultPositionType;

type ExecutorType = (
  strategy: AlignStrategy,
  anchorPosition: ElementPositionType,
  size: SizeType,
  flip: boolean,
  pessimistic: boolean
) => StrategyResultType;

type MergedExecutorType = (
  strategies: StrategyType[],
  ...params: Parameters<StrategyType>
) => StrategyResultType;

const pessimisticStrategy: { [x in AlignStrategy]: ResultPositionType } = {
  left: { left: 0 },
  right: { left: 0 },
  top: { top: 0 },
  bottom: { top: 0 },
};
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

const strategies: { [x in AlignStrategy]: StrategyType } = {
  top: (...params) => executeStrategy('top', ...params),
  left: (...params) => executeStrategy('left', ...params),
  right: (...params) => executeStrategy('right', ...params),
  bottom: (...params) => executeStrategy('bottom', ...params),
};

const executeStrategy: ExecutorType = (
  strategy,
  anchorPosition,
  size,
  flip,
  pessimistic
) => {
  if (!flip || canApplyStrategy[strategy](anchorPosition, size)) {
    return { position: applyStrategy[strategy](anchorPosition, size) };
  }

  const fallback = fallbackStrategy[strategy];
  if (!pessimistic || canApplyStrategy[fallback](anchorPosition, size)) {
    return {
      meta: { flip: true },
      position: applyStrategy[fallback](anchorPosition, size),
    };
  }

  return {
    meta: { pessimistic: true },
    position: pessimisticStrategy[strategy],
  };
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

export const mergeStrategies: MergedExecutorType = (strategies, ...params) => {
  const results = strategies.map(s => s(...params));

  return {
    position: results.reduce((acc, curr) => ({ ...acc, ...curr.position }), {}),

    meta: {
      flip: results.some(r => r.meta?.flip),
      pessimistic: results.some(r => r.meta?.pessimistic),
    },
  };
};
