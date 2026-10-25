import { PixelIcon } from '../components/PixelIcon';
import type { IconProps } from '../types/IconProps';
import type { PixelLayer } from '../types/PixelLayer';
import type { FC } from 'react';

// Drawn by hand for the 16 × 16 grid of `size="small"`, where the traced shapes would blur.
const small = [
  '................',
  '................',
  '................',
  '..xxxxxxxxxxxx..',
  '..xxxxxxxxxxxx..',
  '................',
  '................',
  '..xxxxxxxxxxxx..',
  '..xxxxxxxxxxxx..',
  '................',
  '................',
  '..xxxxxxxxxxxx..',
  '..xxxxxxxxxxxx..',
  '................',
  '................',
  '................',
];

const layers: PixelLayer[] = [{ className: 'fill-current', shapes: [{ d: 'M4 7h16M4 12h16M4 17h16', stroke: 2.2 }], small }];

// Three lines that open the menu.
export const MenuIcon: FC<IconProps> = ({ size = 'small', className = 'h-5 w-5' }) => {
  return <PixelIcon layers={layers} size={size} className={className} />;
};
