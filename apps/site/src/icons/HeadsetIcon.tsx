import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M4 13a8 8 0 0 1 16 0', 'M4 13v3a2 2 0 0 0 2 2h1v-6H4', 'M20 13v3a2 2 0 0 1-2 2h-1v-6h3'];

// A headset, for customer support.
export const HeadsetIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} size={size} className={className} />;
};
