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
  const { isVisible, isOutOfBounds } = anchorPosition;
  if ((!isVisible || !isOutOfBounds) && !meta.pessimistic) {
    return { style: { display: 'none', position: 'fixed' } };
  }
  if (popupRect.height === null || popupRect.width === null) {
    return { style: { opacity: 0, position: 'fixed' } };
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
