import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18Z', 'M12 11v6', 'M12 7v1'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['...xxxx...', '.xx....xx.', '.x..xx..x.', 'x........x', 'x...xx...x', 'x...xx...x', 'x...xx...x', '.x..xx..x.', '.xx....xx.', '...xxxx...'];

// A circle with an i, for help text under a field.
export const HelpIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
