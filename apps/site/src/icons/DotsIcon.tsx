import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M5 12h1', 'M11.5 12h1', 'M18 12h1', 'M3 7h18v10H3z'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['..........', '..........', '..........', '..........', 'xx..xx..xx', 'xx..xx..xx', '..........', '..........', '..........', '..........'];

// Three dots, for a menu.
export const DotsIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
