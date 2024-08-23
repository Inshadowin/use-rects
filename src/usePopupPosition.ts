import { useMemo } from 'react';

import { getStrategies } from './strategies';
import { useContainer } from './useContainer';
import { useContainerSize } from './useContainerSize';
import { useElementPosition } from './useElementPosition';
import type { Params, ResultPositionType, AlignType } from './types';

type PopupStyle = ResultPositionType & {
  opacity?: 1 | 0;
  position?: 'fixed';
  display?: 'none' | undefined;
  additionalStyle?: { minWidth: number };
};

type UsePopupPositionParams = Params & {
  align?: AlignType;
  flip?: boolean;
  pessimistic?: boolean;
};

export const usePopupPosition = ({
  delay,
  flip = true,
  pessimistic = false,
  align = 'bottomleft',
  ...params
}: UsePopupPositionParams = {}) => {
  const {
    ref: popupRef,
    container: popup,
    containerRef: popupContainerRef,
  } = useContainer();

  const [anchorRef, anchorPosition] = useElementPosition({ delay, ...params });
  const popupRect = useContainerSize({
    delay: delay,
    enable: !!popup,
    containerRef: popupContainerRef,
  });

  const position = useMemo<PopupStyle | null>(() => {
    if (!anchorPosition.isVisible) {
      return { display: 'none' };
    }
    if (!popupRect?.height || !popupRect.width) {
      return { opacity: 0 };
    }

    const [vertical, horizontal] = getStrategies(align);

    return {
      opacity: 1,
      position: 'fixed',
      ...vertical(anchorPosition, popupRect, flip, pessimistic),
      ...horizontal(anchorPosition, popupRect, flip, pessimistic),

      additionalStyle: { minWidth: anchorPosition.width },
    };
  }, [popupRect, anchorPosition, align, flip, pessimistic]);

  return {
    popupRef,
    anchorRef,

    position,
    anchorPosition,
  };
};
