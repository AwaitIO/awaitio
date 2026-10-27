import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M3 7h3M9 7h6M18 7h3M3 17h3M9 17h6M18 17h3', 'M3 7v3M3 14v3M21 7v3M21 14v3'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['..........', '..........', 'xxx.xx.xxx', 'x........x', '..........', 'x........x', 'xxx.xx.xxx', '..........', '..........', '..........'];

// A field drawn dashed, for one that may stay empty.
export const OptionalIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
