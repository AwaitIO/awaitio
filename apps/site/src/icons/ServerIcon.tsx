import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M4 4h16v6H4z', 'M4 14h16v6H4z', 'M7 7h1M7 17h1'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['..........', 'xxxxxxxxxx', 'x.x.x....x', 'xxxxxxxxxx', '..........', '..........', 'xxxxxxxxxx', 'x.x.x....x', 'xxxxxxxxxx', '..........'];

// Two server units, for what the server checks.
export const ServerIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
