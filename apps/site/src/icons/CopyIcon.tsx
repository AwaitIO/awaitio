import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M8 8h12v12H8z', 'M4 16V4h12'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['xxxxxx....', 'x....x....', 'x....x....', 'x..xxxxxxx', 'x..x.....x', 'xxxx.....x', '...x.....x', '...x.....x', '...xxxxxxx', '..........'];

// Two pages, for copying a value.
export const CopyIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
