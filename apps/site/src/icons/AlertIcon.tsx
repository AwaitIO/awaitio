import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M12 3l10 18H2z', 'M12 10v5', 'M12 17.5v1'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['....xx....', '...xxxx...', '..xx..xx..', '..xx..xx..', '.xxx..xxx.', '.xxx..xxx.', 'xxxxxxxxxx', 'xxxx..xxxx', 'xxxxxxxxxx', '..........'];

// A warning sign, for errors.
export const AlertIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
