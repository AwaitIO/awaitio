import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M3 5h18v14H3z', 'M3 6l9 7 9-7'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['..........', 'xxxxxxxxxx', 'xx......xx', 'x.x....x.x', 'x..x..x..x', 'x...xx...x', 'x........x', 'x........x', 'xxxxxxxxxx', '..........'];

// An envelope, for email.
export const MailIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
