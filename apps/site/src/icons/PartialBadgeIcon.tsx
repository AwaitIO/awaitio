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
const smallHalf = [
  '................',
  '.....xxxxxx.....',
  '...xx...xxxxx...',
  '..x.....xxxxxx..',
  '..x.....xxxxxx..',
  '.x......xxxxxxx.',
  '.x......xxxxxxx.',
  '.x......xxxxxxx.',
  '.x......xxxxxxx.',
  '.x......xxxxxxx.',
  '.x......xxxxxxx.',
  '..x.....xxxxxx..',
  '..x.....xxxxxx..',
  '...xx...xxxxx...',
  '.....xxxxxx.....',
  '................',
];

const layers: PixelLayer[] = [
  { className: 'fill-white', shapes: [{ d: 'M2 12a10 10 0 1 0 20 0a10 10 0 1 0 -20 0Z' }], small: smallDisc },
  { className: 'fill-orange-500', shapes: [{ d: 'M2 12a10 10 0 1 0 20 0a10 10 0 1 0 -20 0Z', stroke: 2.2 }, { d: 'M12 2a10 10 0 0 1 0 20Z' }], small: smallHalf },
];

// A disc half filled with orange: the tool does this only in part, in the at-a-glance table of /vs/<slug>.
export const PartialBadgeIcon: FC<IconProps> = ({ size = 'small', className = 'h-6 w-6 shrink-0' }) => {
  return <PixelIcon layers={layers} size={size} className={className} />;
};
