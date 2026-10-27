import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M4 3h16v18H4z', 'M7 7h10', 'M7 11h10', 'M7 15h5'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['xxxxxxxxxx', 'x........x', 'x.xxxxxx.x', 'x........x', 'x.xxxxxx.x', 'x........x', 'x.xxxxxx.x', 'x........x', 'x.xxx....x', 'xxxxxxxxxx'];

// A form with several fields, for inputs on one screen.
export const FormIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
