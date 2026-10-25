import type { FC } from 'react';

// The picture is 36 × 24 square pixels with a gap between them, like the sun and the icons.
const columns = 36;
const rows = 24;
const side = 0.8;

type Layer = 'skyLight' | 'sky' | 'sun' | 'sunDither' | 'hillBack' | 'hillBackDither' | 'hillFront';

// Which layer a pixel belongs to: a sky that gets denser towards the horizon, a dithered sun, a dithered back hill and
// a solid front hill.
const layerAt = (column: number, row: number): Layer | null => {
  const front = row >= 17 + Math.round(3 * Math.sin((column + 4) / 7));
  const back = row >= 13 + Math.round(4 * Math.cos((column - 6) / 6));
  const sunDistance = Math.hypot(column - 26.5, row - 6.5);
  const checker = (column + row) % 2 === 0;

  if (front) {
    return 'hillFront';
  }

  if (back) {
    return checker || row > 18 ? 'hillBack' : 'hillBackDither';
  }

  if (sunDistance <= 3) {
    return 'sun';
  }

  if (sunDistance <= 4.2) {
    return checker ? 'sunDither' : 'skyLight';
  }

  if (row > 8) {
    return checker ? 'sky' : 'skyLight';
  }

  return row > 3 && column % 2 === 0 && row % 2 === 0 ? 'sky' : 'skyLight';
};

const paths: Record<Layer, string> = { skyLight: '', sky: '', sun: '', sunDither: '', hillBack: '', hillBackDither: '', hillFront: '' };

for (let row = 0; row < rows; row++) {
  for (let column = 0; column < columns; column++) {
    const layer = layerAt(column, row);

    if (layer) {
      paths[layer] += `M${column + 0.1} ${row + 0.1}h${side}v${side}h-${side}z`;
    }
  }
}

const colors: Record<Layer, string> = {
  skyLight: 'fill-sky-100',
  sky: 'fill-sky-200',
  sun: 'fill-orange-500',
  sunDither: 'fill-orange-300',
  hillBack: 'fill-emerald-300',
  hillBackDither: 'fill-emerald-200',
  hillFront: 'fill-emerald-500',
};

// A landscape for io.display.image, drawn from the brand's square pixels instead of smooth shapes.
export const ImageMock: FC = () => {
  return (
    <div className="mx-auto h-24 w-36 overflow-hidden rounded-md border border-gray-300 bg-white">
      <svg viewBox={`0 0 ${columns} ${rows}`} className="h-full w-full" aria-hidden="true">
        {(Object.keys(paths) as Layer[]).map((layer) => {
          return <path key={layer} d={paths[layer]} className={colors[layer]} />;
        })}
      </svg>
    </div>
  );
};
