export type Params = {
  delay?: number;
};

export type SizeType = { height: number; width: number };
export type ResultPositionType = {
  top?: number;
  bottom?: number;

  left?: number;
  right?: number;
};
export type FixedPositionType = {
  marginTop: number;
  marginBottom: number;

  marginLeft: number;
  marginRight: number;
};
export type ElementPositionType = SizeType &
  Required<ResultPositionType> &
  FixedPositionType & {
    isVisible: boolean;
  };

export type AlignStrategy = 'left' | 'right' | 'top' | 'bottom';
export type AlignType = 'topleft' | 'bottomleft' | 'bottomright' | 'topright';

export type PopupStyle = ResultPositionType & {
  opacity?: 1 | 0;
  position?: 'fixed';
  display?: 'none' | undefined;
};

export type CalculatePopupResult = {
  style: PopupStyle;
  meta?: { pessimistic?: boolean; flip?: boolean; anchorWidth?: number };
};

export type StrategyResultType = {
  position: ResultPositionType;
  meta?: { pessimistic?: boolean; flip?: boolean };
};

export type StrategyType = (
  anchorPosition: ElementPositionType,
  size: SizeType,
  flip: boolean,
  pessimistic: boolean
) => StrategyResultType;
