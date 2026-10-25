import { PixelIcon } from '../components/PixelIcon';
import type { IconProps } from '../types/IconProps';
import type { PixelLayer } from '../types/PixelLayer';
import type { FC } from 'react';

// Drawn by hand for the 16 × 16 grid of `size="small"`, where the traced shapes would blur.
const small = [
  '................',
  '................',
  '................',
  '......xxxxxxx...',
  '......xxxxxxx...',
  '.........xxxx...',
  '........xx.xx...',
  '.......xx..xx...',
  '......xx...xx...',
  '.....xx....xx...',
  '....xx..........',
  '...xx...........',
  '................',
  '................',
  '................',
  '................',
];

const layers: PixelLayer[] = [{ className: 'fill-current', shapes: [{ d: 'M7 17 17 7M8 7h9v9', stroke: 2.4 }], small }];

// An arrow pointing up and to the right, after a link that leaves the site.
export const ArrowIcon: FC<IconProps> = ({ size = 'small', className = 'h-3.5 w-3.5' }) => {
  return <PixelIcon layers={layers} size={size} className={className} />;
};
