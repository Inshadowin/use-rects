import { useMemo } from 'react';

import { useContainer } from './useContainer';
import { useContainerSize } from './useContainerSize';
import { useElementPosition } from './useElementPosition';
import type { Params, ResultPositionType, AlignType, SizeType } from './types';

type PopupStyle = SizeType & ResultPositionType;

type UsePopupPositionParams = Params & {
  align?: AlignType;
  flip?: boolean;
};

export const usePopupPosition = ({
  delay,
  flip = true,
  align = 'topleft',
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

    const left =
      anchorPosition.left + popupRect.width > window.innerWidth
        ? window.innerWidth - popupRect.width - 1
        : anchorPosition.left;

    const top =
      anchorPosition.top + popupRect.height > window.innerHeight
        ? anchorPosition.top - popupRect.height
        : anchorPosition.top + anchorPosition.height;

    return { left, top, width: popupRect.width, height: popupRect.height };
  }, [popupRect, anchorPosition]);

  return {
    popupRef,
    anchorRef,

    position,
    anchorPosition,
  };
};
