import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M3 7h18v10H3z', 'M13 10l4 4', 'M17 10l-4 4'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['..........', '..........', 'xxxxxxxxxx', 'x....x.x.x', 'x.....x..x', 'x....x.x.x', 'xxxxxxxxxx', '..........', '..........', '..........'];

// A field with a ×, for emptying it again.
export const ClearIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
