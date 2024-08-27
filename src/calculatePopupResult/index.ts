import { getStrategies } from './getStrategies';
import { mergeStrategiesResults } from './mergeStrategiesResults';
import type { AlignType, CalculatePopupResult, StrategyType } from '../types';

export const calculatePopupResult = (
  align: AlignType,
  ...params: Parameters<StrategyType>
): CalculatePopupResult => {
  const results = getStrategies(align).map(s => s(...params));
  const { position, meta } = mergeStrategiesResults(results);

  const [anchorPosition, popupRect] = params;
  if (!anchorPosition.isVisible && !meta.pessimistic) {
    return { style: { display: 'none' } };
  }
  if (!popupRect?.height || !popupRect.width) {
    return { style: { opacity: 0 } };
  }

  return {
    style: {
      opacity: 1,
      position: 'fixed',
      ...position,
    },

    meta: {
      flip: meta.flip,
      pessimistic: meta.pessimistic,
      anchorWidth: anchorPosition.width,
    },
  };
};
