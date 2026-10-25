import { PixelIcon } from '../components/PixelIcon';
import type { IconProps } from '../types/IconProps';
import type { PixelLayer } from '../types/PixelLayer';
import type { FC } from 'react';

// Drawn by hand for the 16 × 16 grid of `size="small"`, where the traced shapes would blur.
const small = [
  '.....xxxxxx.....',
  '...xxxxxxxxxx...',
  '..xxxxxxxxxxxx..',
  '.xxx.xxxxxx.xxx.',
  '.xxx..xxxx..xxx.',
  'xxxx........xxxx',
  'xxx..........xxx',
  'xxx..........xxx',
  'xxx..........xxx',
  'xxxx........xxxx',
  '.xxxx......xxxx.',
  '.x..xx....xxxxx.',
  '..x.......xxxx..',
  '...xx.....xxx...',
  '.....x....xx....',
  '................',
];

const layers: PixelLayer[] = [
  {
    className: 'fill-current',
    shapes: [
      {
        d: 'M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z',
      },
    ],
    small,
  },
];

// The GitHub mark.
export const GitHubIcon: FC<IconProps> = ({ size = 'small', className = 'h-4 w-4' }) => {
  return <PixelIcon layers={layers} size={size} className={className} />;
};
