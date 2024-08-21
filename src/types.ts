export type Params = {
  delay?: number;
  mainContainerId?: string;
};

export type SizeType = { height: number; width: number };
export type PositionType = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

export type AlignStrategy = 'left' | 'right' | 'top' | 'bottom';
export type AlignType = 'topleft' | 'bottomleft' | 'bottomright' | 'topright';
