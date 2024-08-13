import { useState, useEffect, useRef, useTransition } from 'react';
import { debounce } from 'lodash';
import type { MutableRefObject } from 'react';

import { useDeepMemo } from './useDeepMemo';
import type { Params } from './types';

type Position = {
  top: number;
  left: number;

  width: number;
  height: number;
};

export const useElementPosition = ({
  delay = 20,
  mainContainerId,
}: Params = {}): [MutableRefObject<HTMLDivElement | null>, Position] => {
  const [position, setPosition] = useState<Position>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const ref = useRef<HTMLDivElement | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const updatePosition = debounce(() => {
      startTransition(() => {
        const entry = ref.current;

        if (entry) {
          const rect = entry.getBoundingClientRect();
          setPosition({
            top: rect.top,
            left: rect.left,
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
