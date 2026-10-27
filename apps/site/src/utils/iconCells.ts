import type { IconSize } from '../types/IconSize';

// Squares across a pixel icon for each size, and the gap around each square as a share of its cell: the large icons
// show the grid of the brand, the small ones next to text are drawn almost solid so they stay crisp.
export const iconCells: Record<IconSize, { cells: number; inset: number }> = {
  coarse: { cells: 10, inset: 0.05 },
  small: { cells: 16, inset: 0.03 },
  medium: { cells: 24, inset: 0.06 },
  normal: { cells: 32, inset: 0.1 },
};
