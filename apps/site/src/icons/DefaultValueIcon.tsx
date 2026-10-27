import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M3 7h18v10H3z', 'M6.5 12h6', 'M15.5 9.5v5'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['..........', '..........', 'xxxxxxxxxx', 'x......x.x', 'x.xxx..x.x', 'x......x.x', 'xxxxxxxxxx', '..........', '..........', '..........'];

// A field with text and a cursor, for a value it starts with.
export const DefaultValueIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
