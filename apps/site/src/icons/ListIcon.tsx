import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M9 6h12', 'M9 12h12', 'M9 18h12', 'M4 6h1', 'M4 12h1', 'M4 18h1'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['..........', 'xx.xxxxxxx', 'xx.xxxxxxx', '..........', 'xx.xxxxxxx', 'xx.xxxxxxx', '..........', 'xx.xxxxxxx', 'xx.xxxxxxx', '..........'];

// A list with bullets, for options and columns.
export const ListIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
