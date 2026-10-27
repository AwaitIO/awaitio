import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M4 4h16v16H4z', 'M8 12l3 3 5-6'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['xxxxxxxxxx', 'x........x', 'x........x', 'x......x.x', 'x.....x..x', 'x.x..x...x', 'x..xx....x', 'x........x', 'x........x', 'xxxxxxxxxx'];

// A ticked box, for checkboxes.
export const CheckboxIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
