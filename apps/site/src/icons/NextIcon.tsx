import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M4 12h15', 'M13 6l6 6-6 6'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['..........', '.....x....', '.....xx...', '.....xxx..', 'xxxxxxxxx.', 'xxxxxxxxx.', '.....xxx..', '.....xx...', '.....x....', '..........'];

// An arrow to the right, for going on to another step or action.
export const NextIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
