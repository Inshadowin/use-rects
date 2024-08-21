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
export type ElementPositionType = SizeType & Required<ResultPositionType>;

export type AlignStrategy = 'left' | 'right' | 'top' | 'bottom';
export type AlignType = 'topleft' | 'bottomleft' | 'bottomright' | 'topright';
