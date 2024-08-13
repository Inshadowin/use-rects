import { useMemo, useRef } from 'react';

import { useContainerSize } from './useContainerSize';
import { useElementPosition } from './useElementPosition';
import type { Params } from './types';

export const usePopupPosition = ({ delay, ...params }: Params = {}) => {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [anchorRef, anchorPosition] = useElementPosition({ delay, ...params });
  const popupRect = useContainerSize({
    containerRef: popupRef,
    delay: delay,
  });

  const position = useMemo<typeof anchorPosition | null>(() => {
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
