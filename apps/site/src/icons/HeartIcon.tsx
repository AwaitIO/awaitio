import { PixelIcon } from '../components/PixelIcon';
import type { IconProps } from '../types/IconProps';
import type { PixelLayer } from '../types/PixelLayer';
import type { FC } from 'react';

const layers: PixelLayer[] = [{ className: 'fill-current', shapes: [{ d: 'M12 20.5S3 15 3 9a4.5 4.5 0 0 1 9-1.6A4.5 4.5 0 0 1 21 9c0 6-9 11.5-9 11.5Z', stroke: 2 }] }];

// A heart in the sun orange, above the sponsor strip.
export const HeartIcon: FC<IconProps> = ({ size = 'small', className = 'h-10 w-10 text-orange-500' }) => {
  return <PixelIcon layers={layers} size={size} className={className} />;
};
