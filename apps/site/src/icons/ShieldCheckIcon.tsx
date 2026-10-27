import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M12 3l8 3v6c0 5-3.5 8-8 9c-4.5-1-8-4-8-9V6z', 'M8.5 12l2.5 2.5 4.5-5'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['xxxxxxxxxx', 'x........x', 'x........x', 'x......x.x', 'x.x...x..x', 'x..x.x...x', '.x..x...x.', '.x......x.', '..xx..xx..', '....xx....'];

// A shield with a check, for checks of your own.
export const ShieldCheckIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
