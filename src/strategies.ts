import type {
  SizeType,
  AlignStrategy,
  ElementPositionType,
  ResultPositionType,
} from './types';

type StrategyType = (
  anchorPostion: ElementPositionType,
  size: SizeType
) => ResultPositionType;

type AllowType = (
  anchorPostion: ElementPositionType,
  size: SizeType
) => boolean;

export const strategies: { [x in AlignStrategy]: StrategyType } = {
  top: (anchorPostion, _size) => {
    return { top: anchorPostion.top };
  },

  left: (anchorPostion, _size) => {
    return { left: anchorPostion.left };
  },

  right: (anchorPostion, size) => {
    return { right: anchorPostion.left + size.width };
  },

  bottom: (anchorPostion, _size) => {
    return { top: anchorPostion.bottom };
  },
};
export const allowed: { [x in AlignStrategy]: AllowType } = {
  top: (anchorPostion, size) => {
    return true;
  },

  left: (anchorPostion, size) => {
    return true;
  },

  right: (anchorPostion, size) => {
    return true;
  },

  bottom: (anchorPostion, size) => {
    return true;
  },
};
