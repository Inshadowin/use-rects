import { useState, useEffect, useTransition } from 'react';

import { withDelay } from './withDelay';
import { useDeepMemo } from './useDeepMemo';
import { useContainer } from './useContainer';
import type { Params, ElementPositionType } from './types';

export const useElementPosition = ({
  delay = 20,
  mainContainerId,
}: Params = {}): [(node: HTMLDivElement) => void, ElementPositionType] => {
  const [position, setPosition] = useState<ElementPositionType>({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    width: 0,
    height: 0,
  });
  const { containerRef, ref } = useContainer();
  const [, startTransition] = useTransition();

  useEffect(() => {
    const updatePosition = withDelay(() => {
      startTransition(() => {
        const entry = containerRef.current;

        if (entry) {
          const rect = entry.getBoundingClientRect();
          setPosition({
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom,

            width: rect.width,
            height: rect.height,
          });
        }
      });
    }, delay);

    updatePosition();

    const container = mainContainerId
      ? document.getElementById(mainContainerId)
      : null;
    const observer = new MutationObserver(updatePosition);
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    window.addEventListener('wheel', updatePosition);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    container?.addEventListener('scroll', updatePosition);

    return () => {
      observer.disconnect();

      window.removeEventListener('wheel', updatePosition);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
      container?.removeEventListener('scroll', updatePosition);
    };
  }, [delay, mainContainerId]);

  return [ref, useDeepMemo(() => position, [position])];
};

export default useElementPosition;
