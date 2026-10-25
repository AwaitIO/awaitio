import { PixelIcon } from '../components/PixelIcon';
import type { IconProps } from '../types/IconProps';
import type { PixelLayer } from '../types/PixelLayer';
import type { FC } from 'react';

// Drawn by hand for the 16 × 16 grid of `size="small"`, where the traced shapes would blur.
const small = [
  '................',
  '................',
  '................',
  '................',
  '............xx..',
  '...........xx...',
  '..........xx....',
  '.........xx.....',
  '..xx....xx......',
  '...xx..xx.......',
  '....xxxx........',
  '.....xx.........',
  '................',
  '................',
  '................',
  '................',
];

const layers: PixelLayer[] = [{ className: 'fill-current', shapes: [{ d: 'M5 12.5 10 17l9-10', stroke: 2.8 }], small }];

// A check in front of what a pricing tier includes.
export const CheckIcon: FC<IconProps> = ({ size = 'small', className = 'mt-0.5 h-4 w-4 shrink-0 text-orange-500' }) => {
  return <PixelIcon layers={layers} size={size} className={className} />;
};
