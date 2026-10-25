import { PixelIcon } from '../components/PixelIcon';
import type { IconProps } from '../types/IconProps';
import type { PixelLayer } from '../types/PixelLayer';
import type { FC } from 'react';

const layers: PixelLayer[] = [
  {
    className: 'fill-current',
    shapes: [
      { d: 'M4 21.5V5l8-3 8 3v16.5Z', stroke: 2 },
      { d: 'M7.5 7h2.5v2.5h-2.5Z' },
      { d: 'M14 7h2.5v2.5h-2.5Z' },
      { d: 'M7.5 11.5h2.5v2.5h-2.5Z' },
      { d: 'M14 11.5h2.5v2.5h-2.5Z' },
      { d: 'M10 21.5v-4.5h4v4.5', stroke: 2 },
    ],
  },
];

// An office building, for the enterprise plan.
export const BuildingIcon: FC<IconProps> = ({ size = 'normal', className = 'h-12 w-12 shrink-0' }) => {
  return <PixelIcon layers={layers} size={size} className={className} />;
};
