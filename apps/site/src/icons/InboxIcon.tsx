import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M3 13l3-8h12l3 8v6H3z', 'M3 13h5l1 2h6l1-2h5'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['..........', '.xxxxxxxx.', '.x......x.', 'x........x', 'x........x', 'xxx....xxx', 'x..xxxx..x', 'x........x', 'xxxxxxxxxx', '..........'];

// An empty tray, for what shows when there is nothing.
export const InboxIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
