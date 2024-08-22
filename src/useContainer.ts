import { useCallback, useRef, useState } from 'react';

export const useContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [container, setContainer] = useState<HTMLDivElement>(null);

  const ref = useCallback((node: HTMLDivElement) => {
    containerRef.current = node;
    setContainer(node);
  }, []);

  return { containerRef, container, ref };
};
