import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M3 5h18v14H3z', 'M3 16l5-5 4 4 3-3 6 6', 'M15.5 8.5h1'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['..........', 'xxxxxxxxxx', 'x........x', 'x.....xx.x', 'x.....xx.x', 'x........x', 'x..x.....x', 'x.xxx.x..x', 'xxxxxxxxxx', '..........'];

// A picture with a hill and a sun, for images.
export const ImageIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
