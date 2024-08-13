import { useRef, useState, useLayoutEffect, useMemo } from 'react';
import { debounce } from 'lodash';

type UseContainerSizeParams = {
  delay?: number;
  containerRef?: React.MutableRefObject<any>;
};

export const useContainerSize = ({
  delay = 50,
  containerRef: providedRef,
}: UseContainerSizeParams = {}) => {
  const localContainerRef = useRef<any>(null);
  const containerRef = providedRef ?? localContainerRef;

  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!window?.ResizeObserver) return;

    const container = containerRef.current;

    const handleResize = () => {
      container && setWidth(container.offsetWidth);
      container && setHeight(container.offsetHeight);
    };

    const observer = new ResizeObserver(
      debounce(handleResize, delay, { leading: true })
    );

    container && observer.observe(container);

    return () => {
      container && observer.unobserve(container);
    };
  }, [delay, containerRef]);

  const result = useMemo(() => {
    return { containerRef, height, width };
  }, [containerRef, height, width]);

  return result;
};
