import { segmentDistance } from './segmentDistance';

export type DitherRingPathArgs = {
  // How far the ring is filled, 0 to 1, clockwise from the top.
  progress: number;
  // Size of one pixel in the 32 × 32 box: 1 for large marks, 2 for small ones so the pixels stay visible.
  cell: number;
  // A finished step: the whole ring is solid and a check of the same pixels sits inside it.
  done?: boolean;
};

// The check inside a finished ring, smaller than the ring so the two read as one mark.
const checkPoints: [[number, number], [number, number], [number, number]] = [
  [12, 16.62],
  [14.88, 19.5],
  [20.16, 13.58],
];

// The AwaitIO mark in its 32 × 32 box: a ring of pixels, solid up to the progress and a 50 % dither after it, with the
// orange dot at the end of the solid part; when done, the whole ring and a check of pixels. All pixels of the ring are
// one path and all pixels of the check another, so they meet without seams.
export const ditherRingPath = ({ progress, cell, done = false }: DitherRingPathArgs) => {
  let path = '';
  let check = '';

  for (let y = 0; y < 32; y += cell) {
    for (let x = 0; x < 32; x += cell) {
      const centerX = x + cell / 2;
      const centerY = y + cell / 2;
      const angle = (Math.atan2(centerX - 16, 16 - centerY) / (2 * Math.PI) + 1) % 1;
      // With the larger pixels of small marks the ring sits half a unit wider and three pixels thick, so it reads round and solid
      // rather than square and thin.
      const onRing = cell === 1 ? Math.abs(Math.hypot(centerX - 16, centerY - 16) - 11) <= 2 : Math.abs(Math.hypot(centerX - 16, centerY - 16) - 11.5) <= 2.8;

      if (onRing && (done || angle <= progress + 0.02 || (x / cell + y / cell) % 2 === 0)) {
        path += `M${x} ${y}h${cell}v${cell}h-${cell}z`;
      } else if (
        done &&
        Math.min(
          segmentDistance({ point: [centerX, centerY], from: checkPoints[0], to: checkPoints[1] }),
          segmentDistance({ point: [centerX, centerY], from: checkPoints[1], to: checkPoints[2] }),
        ) <= (cell === 1 ? 1.6 : 1.8)
      ) {
        check += `M${x} ${y}h${cell}v${cell}h-${cell}z`;
      }
    }
  }

  return {
    path,
    check,
    dot: { cx: 16 + 11 * Math.sin(progress * 2 * Math.PI), cy: 16 - 11 * Math.cos(progress * 2 * Math.PI), r: 3.6 },
  };
};
