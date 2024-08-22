export type Params = {
  delay?: number;
  mainContainerId?: string;
};

export type SizeType = { height: number; width: number };
export type ResultPositionType = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};
export type FixedPositionType = { marginRight: number; marginBottom: number };
export type ElementPositionType = SizeType &
  Required<ResultPositionType> &
  FixedPositionType;

export type AlignStrategy = 'left' | 'right' | 'top' | 'bottom';
export type AlignType = 'topleft' | 'bottomleft' | 'bottomright' | 'topright';
