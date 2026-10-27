import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M20 5v6a3 3 0 0 1-3 3H5', 'M9 10l-4 4 4 4'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['..........', '........xx', '........xx', '...x....xx', '..xx....xx', '.xxxxxxxxx', '.xxxxxxxx.', '..xx......', '...x......', '..........'];

// An arrow turning back, for what the handler gets.
export const ReturnIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
