import type { PixelShape } from './PixelShape';

// The shapes of a pixel icon that share one color, given as a fill class like `fill-current` or `fill-orange-500`.
// Later layers paint over earlier ones.
export type PixelLayer = {
  className: string;
  shapes: PixelShape[];
  // The layer drawn by hand on the 16 × 16 grid of `size="small"`, one string per row with `x` for a filled square. Used
  // instead of the traced shapes where so few squares would blur them.
  small?: string[];
  // The layer drawn by hand on the 10 × 10 grid of `size="coarse"`, the same way.
  coarse?: string[];
};
