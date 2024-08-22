import { useMemo } from 'react';

import { getStrategies } from './strategies';
import { useContainer } from './useContainer';
import { useContainerSize } from './useContainerSize';
import { useElementPosition } from './useElementPosition';
import type { Params, ResultPositionType, AlignType } from './types';

type PopupStyle = ResultPositionType & {
  opacity?: 1 | 0;
  position?: 'fixed';
  additionalStyle?: { minWidth: number };
};

type UsePopupPositionParams = Params & {
  align?: AlignType;
  flip?: boolean;
};

export const usePopupPosition = ({
  delay,
  flip = true,
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
    if (!popupRect?.height || !popupRect.width) {
      return { opacity: 0 };
    }

    const [vertical, horizontal] = getStrategies(align);

    return {
      opacity: 1,
      position: 'fixed',
      ...vertical(anchorPosition, popupRect, flip),
      ...horizontal(anchorPosition, popupRect, flip),

      additionalStyle: { minWidth: anchorPosition.width },
    };
  }, [popupRect, anchorPosition, align, flip]);

  return {
    popupRef,
    anchorRef,

    position,
    anchorPosition,
  };
};
