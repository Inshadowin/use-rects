import { useMemo } from 'react';

import { useContainer } from './useContainer';
import { useContainerSize } from './useContainerSize';
import { useElementPosition } from './useElementPosition';
import { calculatePopupResult } from './calculatePopupResult';
import type { Params, CalculatePopupResult, AlignType } from './types';

type UsePopupPositionParams = Params & {
  align?: AlignType;
  flip?: boolean;
  pessimistic?: boolean;
};

export const usePopupPosition = ({
  delay,
  flip = true,
  pessimistic = false,
  trackVisible = true,
  align = 'bottomleft',
  ...params
}: UsePopupPositionParams = {}) => {
  const {
    ref: popupRef,
    container: popup,
    containerRef: popupContainerRef,
  } = useContainer();

  const [anchorRef, anchorPosition] = useElementPosition({
    delay,
    trackVisible,
    ...params,
  });
  const popupRect = useContainerSize({
    delay: delay,
    enable: !!popup,
    containerRef: popupContainerRef,
  });

  const popupPosition = useMemo<CalculatePopupResult>(() => {
    return calculatePopupResult(
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

    popupPosition,
    anchorPosition,
  };
};
