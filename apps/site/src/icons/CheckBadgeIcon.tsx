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
const smallCheck = [
  '................',
  '................',
  '................',
  '................',
  '................',
  '...........xx...',
  '..........xx....',
  '.........xx.....',
  '....xx..xx......',
  '.....xxxx.......',
  '......xx........',
  '................',
  '................',
  '................',
  '................',
  '................',
];

const layers: PixelLayer[] = [
  { className: 'fill-done', shapes: [{ d: 'M1 12a11 11 0 1 0 22 0a11 11 0 1 0 -22 0Z' }], small: smallDisc },
  { className: 'fill-white', shapes: [{ d: 'm7 12.5 3.2 3.2 6.5-7', stroke: 2.6 }], small: smallCheck },
];

// A green disc with a white check: the tool does this, in the at-a-glance table of /vs/<slug>.
export const CheckBadgeIcon: FC<IconProps> = ({ size = 'small', className = 'h-6 w-6 shrink-0' }) => {
  return <PixelIcon layers={layers} size={size} className={className} />;
};
