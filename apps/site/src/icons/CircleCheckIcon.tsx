import { PixelIcon } from '../components/PixelIcon';
import type { IconProps } from '../types/IconProps';
import type { PixelLayer } from '../types/PixelLayer';
import type { FC } from 'react';

const layers: PixelLayer[] = [
  {
    className: 'fill-current',
    shapes: [
      { d: 'M2 12a10 10 0 1 0 20 0a10 10 0 1 0 -20 0Z', stroke: 2.2 },
      { d: 'm8 12.5 2.8 2.8L16.5 9.5', stroke: 2.2 },
    ],
  },
];

// A check in a circle, for a finished action.
export const CircleCheckIcon: FC<IconProps> = ({ size = 'small', className = 'h-5 w-5 shrink-0' }) => {
  return <PixelIcon layers={layers} size={size} className={className} />;
};
