import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18Z', 'M12 7v5l3 2'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['...xxxx...', '.xx....xx.', '.x..x...x.', 'x...x....x', 'x...x....x', 'x...xxx..x', 'x........x', '.x......x.', '.xx....xx.', '...xxxx...'];

// A clock, for times and time zones.
export const ClockIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
