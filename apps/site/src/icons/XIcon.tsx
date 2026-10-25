import { PixelIcon } from '../components/PixelIcon';
import type { IconProps } from '../types/IconProps';
import type { PixelLayer } from '../types/PixelLayer';
import type { FC } from 'react';

// Drawn by hand for the 16 × 16 grid of `size="small"`: the wide stroke as an outline like the real mark, the thin one
// a single line.
const small = [
  '................',
  '................',
  '.xxx.........x..',
  '..x.x.......x...',
  '...x.x.....x....',
  '....x.x...x.....',
  '.....x.x.x......',
  '......x.x.......',
  '.......x.x......',
  '......x.x.x.....',
  '.....x...x.x....',
  '....x.....x.x...',
  '...x.......x.x..',
  '..x.........xxx.',
  '................',
  '................',
];

const layers: PixelLayer[] = [
  {
    className: 'fill-current',
    shapes: [
      { d: 'M13.68 10.62 20.24 3h-1.55l-5.7 6.62L8.44 3H3.2l6.88 10.01L3.2 21h1.55l6.02-6.99L15.57 21h5.24l-7.13-10.38Zm-2.13 2.48-.7-1L5.31 4.17h2.39l4.47 6.4.7 1 5.82 8.32H16.3l-4.75-6.79Z' },
    ],
    small,
  },
];

// The X mark.
export const XIcon: FC<IconProps> = ({ size = 'small', className = 'h-4 w-4' }) => {
  return <PixelIcon layers={layers} size={size} className={className} />;
};
