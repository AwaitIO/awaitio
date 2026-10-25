export type DitherSunPathArgs = {
  // Radius of the sun in pixels of the path, the half disc is twice as wide as it is high.
  radius: number;
  cell: number;
  // How many groups the flickering pixels are split into, each group blinks at its own time.
  groups: number;
};

// The upper half of the sun as square pixels that get denser towards the horizon: sparse at the top, a checkerboard in
// the middle and solid near the line. The solid part is one path; the dithered pixels go into groups that blink out
// (`embers`) and the gaps between them into groups that light up for a moment (`sparks`), so the sun burns.
export const ditherSunPath = ({ radius, cell, groups }: DitherSunPathArgs) => {
  let core = '';
  const embers = Array.from({ length: groups }, () => {
    return '';
  });
  const sparks = Array.from({ length: groups }, () => {
    return '';
  });

  for (let y = 0; y < radius; y += cell) {
    for (let x = 0; x < radius * 2; x += cell) {
      if (Math.hypot(x + cell / 2 - radius, y + cell / 2 - radius) > radius) {
        continue;
      }

      const depth = (y + cell / 2) / radius;
      const column = x / cell;
      const row = y / cell;
      const pixel = `M${x} ${y}h${cell}v${cell}h-${cell}z`;
      // A scattered but stable group for every pixel, so neighbours rarely blink together.
      const hash = (Math.imul(column, 73856093) ^ Math.imul(row, 19349663)) >>> 0;

      if (depth > 0.62) {
        core += pixel;
      } else if (depth > 0.3 ? (column + row) % 2 === 0 : column % 2 === 0 && row % 2 === 0) {
        embers[hash % groups] += pixel;
      } else if (hash % 3 === 0) {
        sparks[(hash >>> 2) % groups] += pixel;
      }
    }
  }

  return { core, embers, sparks };
};
