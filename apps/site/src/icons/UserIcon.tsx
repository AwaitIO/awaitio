import { PixelIcon } from '../components/PixelIcon';
import type { IconProps } from '../types/IconProps';
import type { PixelLayer } from '../types/PixelLayer';
import type { FC } from 'react';

// Drawn by hand for the 16 × 16 grid of `size="small"`, a solid figure like the people of the team and crowd icons.
const small = [
  '................',
  '................',
  '.......xx.......',
  '......xxxx......',
  '......xxxx......',
  '.......xx.......',
  '................',
  '.....xxxxxx.....',
  '....xxxxxxxx....',
  '....xxxxxxxx....',
  '....xxxxxxxx....',
  '....xxxxxxxx....',
  '................',
  '................',
  '................',
  '................',
];

const layers: PixelLayer[] = [
  {
    className: 'fill-current',
    shapes: [
      { d: 'M8.5 7.5a3.5 3.5 0 1 0 7.0 0a3.5 3.5 0 1 0 -7.0 0Z', stroke: 2 },
      { d: 'M5 20.5a7 7 0 0 1 14 0', stroke: 2 },
    ],
    small,
  },
];

// One person, for the free plan of up to 3 users.
export const UserIcon: FC<IconProps> = ({ size = 'normal', className = 'h-12 w-12 shrink-0' }) => {
  return <PixelIcon layers={layers} size={size} className={className} />;
};
