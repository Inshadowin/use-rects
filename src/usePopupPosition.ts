import { useMemo } from 'react';

import { useContainer } from './useContainer';
import { useContainerSize } from './useContainerSize';
import { useElementPosition } from './useElementPosition';
import { calculatePopupStyle } from './calculatePopupStyle';
import type { Params, PopupStyle, AlignType } from './types';

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
    return calculatePopupStyle(
      align,
      anchorPosition,
      popupRect,
      flip,
      pessimistic
    );
  }, [align, anchorPosition, popupRect, flip, pessimistic]);

  return {
    popupRef,
    anchorRef,

    position,
    anchorPosition,
  };
};
