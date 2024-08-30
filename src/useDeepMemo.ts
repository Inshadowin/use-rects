import React from 'react';
import isEqual from 'lodash.isequal';

const useDeepCompareMemoize = (value: any[]) => {
  const ref = React.useRef<any[]>([]);

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
};

export const useDeepMemo = <T>(factory: () => T, dependencies: any[]): T => {
  return React.useMemo(factory, useDeepCompareMemoize(dependencies));
};
