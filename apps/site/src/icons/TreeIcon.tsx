import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M5 4v16', 'M5 8h5', 'M5 15h5', 'M13 6h7v4h-7z', 'M13 13h7v4h-7z'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['xxxxx.....', 'x.........', 'x.xxxxx...', 'x.........', 'x.xxxxx...', '..x.......', '..x.xxxxx.', '..x.......', '..x.xxxxx.', '..........'];

// A tree of nested rows, for nested data.
export const TreeIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
