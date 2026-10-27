import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-2 0-3h3a4 4 0 0 0 4-4c0-5-4-9-9-9z', 'M7.5 11h1', 'M11 7h1', 'M16 9h1'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['...xxxx...', '.xxxxxxxx.', 'xx.xxxx.xx', 'xxxxxxxxxx', 'x.xxxxxxxx', 'xxxxxx....', 'xxxxx.....', 'xxxxxx....', '.xxxxxxx..', '...xxxx...'];

// A paint palette, for how something looks.
export const PaletteIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
