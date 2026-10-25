import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M2.5 12.6h4v8h-4z', 'M10 4.1h4v16.5h-4z', 'M17.5 8.6h4v12h-4z'];

// Three bars, for reports and exports.
export const ChartIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} size={size} className={className} />;
};
