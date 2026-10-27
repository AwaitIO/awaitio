import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M5 5h14', 'M12 5v14', 'M9 19h6'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['xxxxxxxxxx', 'xxxxxxxxxx', '....xx....', '....xx....', '....xx....', '....xx....', '....xx....', '....xx....', '...xxxx...', '..........'];

// A big T, for a heading.
export const HeadingIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
