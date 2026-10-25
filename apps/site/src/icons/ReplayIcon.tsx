import { PixelIcon } from '../components/PixelIcon';
import type { IconProps } from '../types/IconProps';
import type { PixelLayer } from '../types/PixelLayer';
import type { FC } from 'react';

// Drawn by hand for the 16 × 16 grid of `size="small"`, where the traced shapes would blur.
const small = [
  '................',
  '....x...........',
  '...xx...........',
  '..xxxxxxxxx.....',
  '..xxxxx...xx....',
  '...........xx...',
  '............xx..',
  '............xx..',
  '..x..........x..',
  '..xx........xx..',
  '..xx........xx..',
  '...xx......xx...',
  '....xx....xx....',
  '.....xxxxxx.....',
  '................',
  '................',
];

const layers: PixelLayer[] = [
  {
    className: 'fill-current',
    shapes: [
      { d: 'M3.5 12a8.5 8.5 0 1 0 2.5-6', stroke: 2.6 },
      { d: 'M3.5 3.5v5h5', stroke: 2.6 },
    ],
    small,
  },
];

// An arrow going round to the start, the size of the play and pause icons next to it.
export const ReplayIcon: FC<IconProps> = ({ size = 'small', className = 'h-5 w-5' }) => {
  return <PixelIcon layers={layers} size={size} className={className} />;
};
