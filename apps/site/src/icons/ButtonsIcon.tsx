import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M3 9h8v6H3z', 'M13 9h8v6h-8z'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['..........', '..........', '..........', 'xxxx..xxxx', 'x..x..xxxx', 'x..x..xxxx', 'xxxx..xxxx', '..........', '..........', '..........'];

// Two buttons side by side, for a question with two answers.
export const ButtonsIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
