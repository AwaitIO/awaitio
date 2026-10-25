import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M5 11h14v9.6H5z', 'M8 11V7.5a4 4 0 0 1 8 0V11', 'M12 14.5v3'];

// A padlock, for tools that stay private in your own app.
export const LockIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} size={size} className={className} />;
};
