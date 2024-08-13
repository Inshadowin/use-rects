import { useState, useEffect, useRef, useTransition } from 'react';
import { debounce } from 'lodash';
import type { MutableRefObject } from 'react';

import { useDeepMemo } from './useDeepMemo';

type Position = {
  top: number;
  left: number;

  width: number;
  height: number;
};

export const useElementPosition = (
  mainContainerId?: string
): [MutableRefObject<HTMLDivElement | null>, Position] => {
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
    });

    updatePosition();

    const contianer = mainContainerId
      ? document.getElementById(mainContainerId)
      : null;
    const o1bserver = new MutationObserver(updatePosition);
    o1bserver.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    window.addEventListener('wheel', updatePosition);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    contianer?.addEventListener('scroll', updatePosition);

    return () => {
      o1bserver.disconnect();

      window.removeEventListener('wheel', updatePosition);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
      contianer?.removeEventListener('scroll', updatePosition);
    };
  }, []);

  return [ref, useDeepMemo(() => position, [position])];
};

export default useElementPosition;
