import type { IconSize } from '../types/IconSize';
import type { PixelLayer } from '../types/PixelLayer';
import { bitmapPath } from '../utils/bitmapPath';
import { iconCells } from '../utils/iconCells';
import { pixelShapesPath } from '../utils/pixelShapesPath';
import type { FC } from 'react';

export type PixelIconProps = {
  layers: PixelLayer[];
  size: IconSize;
  className?: string;
  // The square of the shapes' coordinates, 24 units from the origin for the usual line icons.
  box?: { x: number; y: number; size: number };
};

const defaultBox = { x: 0, y: 0, size: 24 };

// Draws every icon of the site in the brand's square pixels, like the hero sun and the logo: each layer of vector
// shapes becomes squares on the grid of the chosen size, in its own color. A layer with a hand-drawn `small` bitmap uses
// it on the 16 × 16 grid instead.
export const PixelIcon: FC<PixelIconProps> = ({ layers, size, className, box = defaultBox }) => {
  const { cells, inset } = iconCells[size];

  return (
    <svg viewBox={`0 0 ${cells} ${cells}`} className={className} aria-hidden="true">
      {layers.map((layer, index) => {
        const d = size === 'small' && layer.small ? bitmapPath({ rows: layer.small, inset }) : pixelShapesPath({ shapes: layer.shapes, box, cells, inset });

        return <path key={index} d={d} className={layer.className} />;
      })}
    </svg>
  );
};
