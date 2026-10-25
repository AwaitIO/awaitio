export type PixelLogoPathArgs = {
  // The logo as a 128 × 128 bitmap, one row per `|`, each row the lengths of its runs, starting with an empty run:
  // "4 80 44" is 4 empty pixels, 80 filled, 44 empty. "4 80 44*3" is that row three times.
  bitmap: string;
  // How many squares across the logo is drawn with, a divisor of 128: fewer for a coarser, more visible grid.
  cells: number;
};

// Size of the source bitmap of every logo.
const sourceSize = 128;

// Another tool's logo drawn in the brand's pixels, like the hero sun: the 128 × 128 bitmap scaled down to `cells`
// squares across, a square filled where most of its pixels are, each square a little smaller than its cell so the
// grid shows. Returns one path in a `cells × cells` box.
export const pixelLogoPath = ({ bitmap, cells }: PixelLogoPathArgs) => {
  const rows = bitmap.split('|').flatMap((entry) => {
    const [row, repeat = '1'] = entry.split('*');
    const pixels: boolean[] = [];
    let filled = false;

    for (const run of row.split(' ')) {
      for (let index = 0; index < Number(run); index++) {
        pixels.push(filled);
      }

      filled = !filled;
    }

    return Array.from({ length: Number(repeat) }, () => {
      return pixels;
    });
  });

  const step = sourceSize / cells;
  const inset = 0.04;
  let path = '';

  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      let count = 0;

      for (let sourceY = y * step; sourceY < (y + 1) * step; sourceY++) {
        for (let sourceX = x * step; sourceX < (x + 1) * step; sourceX++) {
          if (rows[sourceY]?.[sourceX]) {
            count++;
          }
        }
      }

      if (count * 2 > step * step) {
        path += `M${x + inset} ${y + inset}h${1 - inset * 2}v${1 - inset * 2}h-${1 - inset * 2}z`;
      }
    }
  }

  return path;
};
