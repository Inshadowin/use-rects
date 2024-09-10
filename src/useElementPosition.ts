import { useTransition, useLayoutEffect } from 'react';
import { useCreateSignal } from 'use-create-signal';
import isEqual from 'lodash.isequal';

import { withDelay } from './withDelay';
import { useDeepMemo } from './useDeepMemo';
import { useContainer } from './useContainer';
import { calculateIsVisible } from './visibilityUtilities';
import { calculateIsOutOfBounds } from './visibilityUtilities';
import type { Params, ElementPositionType } from './types';

export const useElementPosition = ({
  delay = 15,
  trackVisible = false,
}: Params = {}): [(node: HTMLDivElement) => void, ElementPositionType] => {
  const [getPosition, setPosition, position] =
    useCreateSignal<ElementPositionType>({
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,

      width: 0,
      height: 0,

      marginTop: 0,
      marginBottom: 0,

      marginLeft: 0,
      marginRight: 0,

      isVisible: false,
      isOutOfBounds: false,
    });
  const { containerRef, container, ref } = useContainer();
  const [, startTransition] = useTransition();

  const containerExists = !!container;
  useLayoutEffect(() => {
    if (!containerExists) return;

    const performUpdate = () => {
      const entry = containerRef.current;

      if (entry) {
        const rect = entry.getBoundingClientRect();
        const isOutOfBounds = calculateIsOutOfBounds(rect);
        const isVisible = trackVisible ? calculateIsVisible(entry, rect) : true;

        const newPosition: ElementPositionType = {
          top: rect.top,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom,

          width: rect.width,
          height: rect.height,

          isVisible: isVisible,
          isOutOfBounds: isOutOfBounds,

          marginTop: rect.top,
          marginLeft: rect.left,
          marginRight: window.innerWidth - rect.right,
          marginBottom: window.innerHeight - rect.bottom,
        };

        if (isEqual(newPosition, getPosition())) return;

        setPosition(newPosition);
      }
    };
    performUpdate();

    const updatePosition = withDelay(() => {
      startTransition(performUpdate);
    }, delay);

    const observer = new MutationObserver(updatePosition);
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      observer.disconnect();

      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [delay, trackVisible, containerExists]);

  return [ref, useDeepMemo(() => position, [position])];
};

export default useElementPosition;
