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
  '....xx....xx....',
  '.....xx..xx.....',
  '......xxxx......',
  '.......xx.......',
  '.......xx.......',
  '......xxxx......',
  '.....xx..xx.....',
  '....xx....xx....',
  '................',
  '................',
  '................',
  '................',
];

const layers: PixelLayer[] = [{ className: 'fill-current', shapes: [{ d: 'M7 7l10 10M17 7 7 17', stroke: 2.8 }], small }];

// A cross in front of what a pricing tier leaves out.
export const CrossIcon: FC<IconProps> = ({ size = 'small', className = 'mt-0.5 h-4 w-4 shrink-0' }) => {
  return <PixelIcon layers={layers} size={size} className={className} />;
};
