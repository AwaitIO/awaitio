import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M10.5 3a7.5 7.5 0 1 0 0 15a7.5 7.5 0 1 0 0-15Z', 'M16 16l5 5'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['.xxxxx....', 'x.....x...', 'x.....x...', 'x.....x...', 'x.....x...', '.xxxxx....', '.....xxx..', '......xxx.', '.......xxx', '........xx'];

// A magnifier, for search and filters.
export const SearchIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
