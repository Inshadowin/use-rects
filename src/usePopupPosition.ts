import { useMemo } from 'react';

import { getStrategies } from './strategies';
import { useContainer } from './useContainer';
import { useContainerSize } from './useContainerSize';
import { useElementPosition } from './useElementPosition';
import type { Params, ResultPositionType, AlignType } from './types';

type PopupStyle = ResultPositionType & {
  position: 'fixed';
  additionalStyle: { minWidth: number };
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
  const { containerRef: popupContainer, ref: popupRef } = useContainer();
  const [anchorRef, anchorPosition] = useElementPosition({ delay, ...params });
  const popupRect = useContainerSize({
    delay: delay,
    containerRef: popupContainer,
    enable: !!popupContainer.current,
  });

  const position = useMemo<PopupStyle | null>(() => {
    if (!popupRect?.height || !popupRect.width) {
      return null;
    }

    const [vertical, horizontal] = getStrategies(align);

    return {
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
