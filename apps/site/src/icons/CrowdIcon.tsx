import { PixelIcon } from '../components/PixelIcon';
import type { IconProps } from '../types/IconProps';
import type { PixelLayer } from '../types/PixelLayer';
import type { FC } from 'react';

// Drawn by hand for the 16 × 16 grid of `size="small"`, where the traced shapes would blur.
const small = [
  '................',
  '................',
  '..xx...xx...xx..',
  '..xx...xx...xx..',
  '................',
  '..xx...xx...xx..',
  '.xxxx.xxxx.xxxx.',
  '................',
  '................',
  '..xx...xx...xx..',
  '..xx...xx...xx..',
  '................',
  '..xx...xx...xx..',
  '.xxxx.xxxx.xxxx.',
  '................',
  '................',
];

const layers: PixelLayer[] = [
  {
    className: 'fill-current',
    shapes: [
      { d: 'M3 4.5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0Z', stroke: 1.8 },
      { d: 'M10 4.5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0Z', stroke: 1.8 },
      { d: 'M17 4.5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0Z', stroke: 1.8 },
      { d: 'M2 11a3 3 0 0 1 6 0M9 11a3 3 0 0 1 6 0M16 11a3 3 0 0 1 6 0', stroke: 1.8 },
      { d: 'M3 14.5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0Z', stroke: 1.8 },
      { d: 'M10 14.5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0Z', stroke: 1.8 },
      { d: 'M17 14.5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0Z', stroke: 1.8 },
      { d: 'M2 21a3 3 0 0 1 6 0M9 21a3 3 0 0 1 6 0M16 21a3 3 0 0 1 6 0', stroke: 1.8 },
    ],
    small,
  },
];

// Two rows of people, for the plan of a larger company.
export const CrowdIcon: FC<IconProps> = ({ size = 'normal', className = 'h-12 w-12 shrink-0' }) => {
  return <PixelIcon layers={layers} size={size} className={className} />;
};
