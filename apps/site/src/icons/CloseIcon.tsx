import { PixelIcon } from '../components/PixelIcon';
import type { IconProps } from '../types/IconProps';
import type { PixelLayer } from '../types/PixelLayer';
import type { FC } from 'react';

// Drawn by hand for the 16 × 16 grid of `size="small"`, where the traced shapes would blur.
const small = [
  '................',
  '................',
  '................',
  '...xx......xx...',
  '....xx....xx....',
  '.....xx..xx.....',
  '......xxxx......',
  '.......xx.......',
  '.......xx.......',
  '......xxxx......',
  '.....xx..xx.....',
  '....xx....xx....',
  '...xx......xx...',
  '................',
  '................',
  '................',
];

const layers: PixelLayer[] = [{ className: 'fill-current', shapes: [{ d: 'M6 6l12 12M18 6 6 18', stroke: 2.2 }], small }];

// A cross that closes the menu.
export const CloseIcon: FC<IconProps> = ({ size = 'small', className = 'h-5 w-5' }) => {
  return <PixelIcon layers={layers} size={size} className={className} />;
};
