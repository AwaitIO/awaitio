import { PixelIcon } from '../components/PixelIcon';
import type { IconProps } from '../types/IconProps';
import type { PixelLayer } from '../types/PixelLayer';
import type { FC } from 'react';

// Drawn pixel by pixel on a 16 × 16 grid, so the letters stay sharp instead of being traced from the vector mark.
const layers: PixelLayer[] = [
  { className: 'fill-[#3178C6]', shapes: [{ d: 'M1 0h14v1h1v14h-1v1H1v-1H0V1h1Z' }] },
  {
    className: 'fill-white',
    shapes: [{ d: 'M4 8h5v1h-5Z' }, { d: 'M6 9h1v5h-1Z' }, { d: 'M10 8h4v1h-4Z' }, { d: 'M10 9h1v2h-1Z' }, { d: 'M10 10h4v1h-4Z' }, { d: 'M13 11h1v2h-1Z' }, { d: 'M10 13h4v1h-4Z' }],
  },
];

// The TypeScript mark in square pixels: white "TS" in the bottom right of a #3178C6 square.
export const TypeScriptIcon: FC<IconProps> = ({ size = 'small', className = 'h-5 w-5' }) => {
  return <PixelIcon layers={layers} size={size} className={className} box={{ x: 0, y: 0, size: 16 }} />;
};
