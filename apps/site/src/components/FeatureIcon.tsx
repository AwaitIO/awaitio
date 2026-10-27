import { PixelIcon } from './PixelIcon';
import type { IconSize } from '../types/IconSize';
import type { PixelLayer } from '../types/PixelLayer';
import type { FC } from 'react';

export type FeatureIconProps = {
  // `d` attributes of the line icon, drawn in a 24 × 24 box.
  paths: string[];
  // The icon drawn by hand on the 16 × 16 grid of `size="small"`, where tracing the paths would blur.
  small?: string[];
  // The icon drawn by hand on the 10 × 10 grid of `size="coarse"`.
  coarse?: string[];
  size?: IconSize;
  className?: string;
};

// Every feature icon the way the brand draws it: the line icon alone in ink, in square pixels with the grid showing.
export const FeatureIcon: FC<FeatureIconProps> = ({ paths, small, coarse, size = 'normal', className = 'h-12 w-12 shrink-0 text-gray-900' }) => {
  const layers: PixelLayer[] = [
    {
      className: 'fill-current',
      shapes: paths.map((d) => {
        return { d, stroke: 2 };
      }),
      small,
      coarse,
    },
  ];

  return <PixelIcon layers={layers} size={size} className={className} />;
};
