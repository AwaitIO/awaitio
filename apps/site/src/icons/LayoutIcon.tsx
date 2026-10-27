import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M4 5h16v14H4z', 'M4 9h16', 'M9 9v10'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['xxxxxxxxxx', 'xxxxxxxxxx', 'x..x.....x', 'x..x.....x', 'x..x.....x', 'x..x.....x', 'x..x.....x', 'x..x.....x', 'xxxxxxxxxx', '..........'];

// A window split into a header, a sidebar and content, for back offices.
export const LayoutIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
