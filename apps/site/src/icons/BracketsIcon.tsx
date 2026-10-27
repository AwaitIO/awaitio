import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M8 6l-5 6 5 6', 'M16 6l5 6-5 6'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['..........', '...x..x...', '..x....x..', '.x......x.', 'x........x', '.x......x.', '..x....x..', '...x..x...', '..........', '..........'];

// Code brackets, for what you write in code.
export const BracketsIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
