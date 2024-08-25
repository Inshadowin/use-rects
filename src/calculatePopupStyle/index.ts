import { getStrategies } from './getStrategies';
import { mergeStrategiesResults } from './mergeStrategiesResults';
import type { AlignType, PopupStyle, StrategyType } from '../types';

export const calculatePopupStyle = (
  align: AlignType,
  ...params: Parameters<StrategyType>
): PopupStyle => {
  const results = getStrategies(align).map(s => s(...params));
  const { position, meta } = mergeStrategiesResults(results);

  const [anchorPosition, popupRect] = params;
  if (!anchorPosition.isVisible && !meta.pessimistic) {
    return { display: 'none' };
  }
  if (!popupRect?.height || !popupRect.width) {
    return { opacity: 0 };
  }

  return {
    opacity: 1,
    position: 'fixed',
    ...position,

    additionalStyle: { minWidth: anchorPosition.width },
  };
};
