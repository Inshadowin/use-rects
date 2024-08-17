import { useCallback, useRef, useState } from 'react';

export const useContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [_container, setContainer] = useState<HTMLDivElement>(null);

  const ref = useCallback((node: HTMLDivElement) => {
    setContainer(node);
    containerRef.current = node;
  }, []);

  return { containerRef, ref };
};
