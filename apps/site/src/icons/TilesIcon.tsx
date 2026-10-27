import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M3 6h5v12H3z', 'M10 6h4v12h-4z', 'M16 6h5v12h-5z'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['..........', '..........', 'xx..xx..xx', 'xx..xx..xx', 'xx..xx..xx', 'xx..xx..xx', 'xx..xx..xx', 'xx..xx..xx', '..........', '..........'];

// Three tiles in a row, for totals side by side.
export const TilesIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
