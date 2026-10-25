import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

// The classic pixel arrow, drawn square by square: `o` is the white edge, `x` the sun orange inside.
const rows = [
  'o...........',
  'oo..........',
  'oxo.........',
  'oxxo........',
  'oxxxo.......',
  'oxxxxo......',
  'oxxxxxo.....',
  'oxxxxxxo....',
  'oxxxxxxxo...',
  'oxxxxxxxxo..',
  'oxxxxxxxxxo.',
  'oxxxxxxoooo.',
  'oxxxoxxo....',
  'oxxoooxxo...',
  'oxo..oxxo...',
  'oo....oxxo..',
  'o.....oxxo..',
  '.......oxxo.',
  '.......oo...',
];

const squares = (pixel: string) => {
  let path = '';

  rows.forEach((row, y) => {
    [...row].forEach((value, x) => {
      if (value === pixel) {
        path += `M${x} ${y}h1v1h-1z`;
      }
    });
  });

  return path;
};

const edge = squares('o');
const fill = squares('x');

// The mouse pointer of the how-it-works demo in the brand's square pixels, sun orange with a light edge so it reads on
// any background. Drawn by hand instead of traced, so every pixel of the arrow sits where it should.
export const CursorIcon: FC<IconProps> = ({ className = 'h-[48px] w-[30px] drop-shadow-sm' }) => {
  return (
    <svg viewBox="0 0 12 19" className={className} shapeRendering="crispEdges" aria-hidden="true">
      <path d={edge} className="fill-white" />
      <path d={fill} className="fill-orange-500" />
    </svg>
  );
};
