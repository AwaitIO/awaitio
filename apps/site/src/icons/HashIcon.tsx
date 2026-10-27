import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M9 4L7 20', 'M17 4l-2 16', 'M4 9h16', 'M3 15h16'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['..........', '...x..x...', 'xxxxxxxxxx', '...x..x...', '...x..x...', '...x..x...', 'xxxxxxxxxx', '...x..x...', '...x..x...', '..........'];

// A hash, for numbers.
export const HashIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
