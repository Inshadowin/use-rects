import { useRef, useState, useLayoutEffect, useMemo } from 'react';

import { withDelay } from './withDelay';

type UseContainerSizeParams = {
  delay?: number;
  enable?: boolean;
  containerRef?: React.MutableRefObject<any>;
};

export const useContainerSize = ({
  delay = 20,
  enable = true,
  containerRef: providedRef,
}: UseContainerSizeParams = {}) => {
  const localContainerRef = useRef<any>(null);
  const containerRef = providedRef ?? localContainerRef;

  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!window?.ResizeObserver || !enable) return;

    const container = containerRef.current;

    const handleResize = () => {
      container && setWidth(container.offsetWidth);
      container && setHeight(container.offsetHeight);
    };

    const observer = new ResizeObserver(withDelay(handleResize, delay));
    container && observer.observe(container);

    return () => {
      container && observer.unobserve(container);
    };
  }, [enable, delay, containerRef]);

  const result = useMemo(() => {
    return { containerRef, height, width };
  }, [containerRef, height, width]);

  return result;
};
