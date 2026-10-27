import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M4 5h16v16H4z', 'M4 10h16', 'M8 3v4', 'M16 3v4'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['..x....x..', 'xxxxxxxxxx', 'xxxxxxxxxx', 'x........x', 'x.x.x.x..x', 'x........x', 'x.x.x.x..x', 'x........x', 'x.x.x....x', 'xxxxxxxxxx'];

// A calendar page, for dates.
export const CalendarIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
