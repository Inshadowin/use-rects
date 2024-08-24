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
