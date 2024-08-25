import { getStrategies, mergeStrategies } from './strategies';
import type {
  AlignType,
  PopupStyle,
  SizeType,
  ElementPositionType,
} from './types';

export const calculatePopupStyle = (
  align: AlignType,
  anchorPosition: ElementPositionType,
  popupRect: SizeType,
  flip: boolean,
  pessimistic: boolean
): PopupStyle => {
  const { position, meta } = mergeStrategies(
    getStrategies(align),
    anchorPosition,
    popupRect,
    flip,
    pessimistic
  );

  if (!anchorPosition.isVisible && !meta.pessimistic) {
    return { display: 'none' };
  }
  if (!popupRect?.height || !popupRect.width) {
    return { opacity: 0 };
  }

  return {
    opacity: 1,
    position: 'fixed',
    ...position,

    additionalStyle: { minWidth: anchorPosition.width },
  };
};
