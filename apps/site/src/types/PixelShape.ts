// One shape of a pixel icon: an SVG path `d` drawn as a line `stroke` units wide, or filled when `stroke` is missing.
// `transform` scales the path and then moves it, to place a 24-unit line icon inside a larger drawing.
export type PixelShape = {
  d: string;
  stroke?: number;
  transform?: { scale: number; x: number; y: number };
};
