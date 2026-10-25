export type BitmapPathArgs = {
  // The rows of a hand-drawn bitmap, one character per square: `x` is filled, anything else is empty.
  rows: string[];
  // Gap around each square as a share of its cell, the same as for the traced icons.
  inset: number;
};

// A bitmap drawn square by square turned into one path in a `width × height` box, so a small icon can be drawn by hand
// where tracing its vector shapes on so few squares would come out muddy.
export const bitmapPath = ({ rows, inset }: BitmapPathArgs) => {
  const side = 1 - inset * 2;
  let path = '';

  rows.forEach((row, y) => {
    [...row].forEach((value, x) => {
      if (value === 'x') {
        path += `M${x + inset} ${y + inset}h${side}v${side}h-${side}z`;
      }
    });
  });

  return path;
};
