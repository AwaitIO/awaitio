import { PixelIcon } from '../components/PixelIcon';
import type { IconProps } from '../types/IconProps';
import type { PixelLayer } from '../types/PixelLayer';
import type { FC } from 'react';

const layers: PixelLayer[] = [{ className: 'fill-current', shapes: [{ d: 'M6 4h4v16h-4Z' }, { d: 'M14 4h4v16h-4Z' }] }];

// Two bars: the demo is paused.
export const PauseIcon: FC<IconProps> = ({ size = 'small', className = 'h-5 w-5' }) => {
  return <PixelIcon layers={layers} size={size} className={className} />;
};
