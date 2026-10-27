import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M4 6h16', 'M4 10h16', 'M4 14h16', 'M4 18h10'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['..........', 'xxxxxxxxxx', '..........', 'xxxxxxxxxx', '..........', 'xxxxxxxxxx', '..........', 'xxxxxx....', '..........', '..........'];

// Lines of text, for formatted text and labels.
export const TextIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
