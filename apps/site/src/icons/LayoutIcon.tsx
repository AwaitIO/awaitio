import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M4 5h16v14H4z', 'M4 9h16', 'M9 9v10'];

// A window split into a header, a sidebar and content, for back offices.
export const LayoutIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} size={size} className={className} />;
};
