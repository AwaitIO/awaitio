import { PixelIcon } from '../components/PixelIcon';
import type { IconProps } from '../types/IconProps';
import type { PixelLayer } from '../types/PixelLayer';
import type { FC } from 'react';

// The disc, drawn by hand for the 16 × 16 grid of `size="small"`, where the traced shapes would blur.
const smallDisc = [
  '................',
  '.....xxxxxx.....',
  '...xxxxxxxxxx...',
  '..xxxxxxxxxxxx..',
  '..xxxxxxxxxxxx..',
  '.xxxxxxxxxxxxxx.',
  '.xxxxxxxxxxxxxx.',
  '.xxxxxxxxxxxxxx.',
  '.xxxxxxxxxxxxxx.',
  '.xxxxxxxxxxxxxx.',
  '.xxxxxxxxxxxxxx.',
  '..xxxxxxxxxxxx..',
  '..xxxxxxxxxxxx..',
  '...xxxxxxxxxx...',
  '.....xxxxxx.....',
  '................',
];

// The mark inside it, drawn the same way.
const smallCross = [
  '................',
  '................',
  '................',
  '................',
  '................',
  '.....xx..xx.....',
  '......xxxx......',
  '.......xx.......',
  '.......xx.......',
  '......xxxx......',
  '.....xx..xx.....',
  '................',
  '................',
  '................',
  '................',
  '................',
];

const layers: PixelLayer[] = [
  { className: 'fill-gray-200', shapes: [{ d: 'M1 12a11 11 0 1 0 22 0a11 11 0 1 0 -22 0Z' }], small: smallDisc },
  { className: 'fill-gray-600', shapes: [{ d: 'm8.5 8.5 7 7m0-7-7 7', stroke: 2.4 }], small: smallCross },
];

// A sand disc with an ink cross: the tool does not do this, in the at-a-glance table of /vs/<slug>.
export const CrossBadgeIcon: FC<IconProps> = ({ size = 'small', className = 'h-6 w-6 shrink-0' }) => {
  return <PixelIcon layers={layers} size={size} className={className} />;
};
