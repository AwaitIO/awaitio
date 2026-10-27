import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M3 12h18', 'M3 8v8', 'M21 8v8', 'M9 10v4', 'M15 10v4'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['..........', '..........', 'x........x', 'x.x....x.x', 'xxxxxxxxxx', 'x.x....x.x', 'x........x', '..........', '..........', '..........'];

// A measured span, for limits such as the lowest and highest value.
export const RulerIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
