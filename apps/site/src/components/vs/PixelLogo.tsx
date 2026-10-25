import { pixelLogoPath } from '../../utils/pixelLogoPath';
import type { FC } from 'react';

export type PixelLogoProps = {
  // The logo bitmap, see `pixelLogoPath`.
  bitmap: string;
  // Squares across, a divisor of 128.
  cells: number;
  className?: string;
  label: string;
};

// Another tool's logo drawn in square pixels, in one color, so every logo on /vs looks like part of the brand.
export const PixelLogo: FC<PixelLogoProps> = ({ bitmap, cells, className, label }) => {
  return (
    <svg viewBox={`0 0 ${cells} ${cells}`} className={className} role="img" aria-label={`${label} logo`}>
      <path d={pixelLogoPath({ bitmap, cells })} fill="currentColor" />
    </svg>
  );
};
