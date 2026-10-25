import { PixelIcon } from '../components/PixelIcon';
import type { IconProps } from '../types/IconProps';
import type { PixelLayer } from '../types/PixelLayer';
import type { FC } from 'react';

const layers: PixelLayer[] = [{ className: 'fill-current', shapes: [{ d: 'M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z' }] }];

// A triangle: the demo is playing.
export const PlayIcon: FC<IconProps> = ({ size = 'small', className = 'h-5 w-5' }) => {
  return <PixelIcon layers={layers} size={size} className={className} />;
};
