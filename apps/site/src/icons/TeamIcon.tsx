import { PixelIcon } from '../components/PixelIcon';
import type { IconProps } from '../types/IconProps';
import type { PixelLayer } from '../types/PixelLayer';
import type { FC } from 'react';

// Drawn by hand for the 16 × 16 grid of `size="small"`, where the traced shapes would blur.
const small = [
  '................',
  '................',
  '.......xx.......',
  '......xxxx......',
  '..xx..xxxx..xx..',
  '..xx...xx...xx..',
  '................',
  '.......xx.......',
  '.xx..xxxxxx..xx.',
  'xxxx.xxxxxx.xxxx',
  'xxxx.xxxxxx.xxxx',
  '.....xxxxxx.....',
  '................',
  '................',
  '................',
  '................',
];

const layers: PixelLayer[] = [
  {
    className: 'fill-current',
    shapes: [
      { d: 'M9 8a3 3 0 1 0 6 0a3 3 0 1 0 -6 0Z', stroke: 2 },
      { d: 'M6.5 19.5a5.5 5.5 0 0 1 11 0', stroke: 2 },
      { d: 'M2.8 10a2 2 0 1 0 4 0a2 2 0 1 0 -4 0Z', stroke: 2 },
      { d: 'M17.2 10a2 2 0 1 0 4 0a2 2 0 1 0 -4 0Z', stroke: 2 },
      { d: 'M1.5 18a3.5 3.5 0 0 1 4.2-3.4', stroke: 2 },
      { d: 'M22.5 18a3.5 3.5 0 0 0-4.2-3.4', stroke: 2 },
    ],
    small,
  },
];

// Three people, for the plan of a small team.
export const TeamIcon: FC<IconProps> = ({ size = 'normal', className = 'h-12 w-12 shrink-0' }) => {
  return <PixelIcon layers={layers} size={size} className={className} />;
};
