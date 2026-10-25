import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M10 11l-2 2 2 2M14 11l2 2-2 2'];

// A folder with code brackets, for your own codebase.
export const CodeFolderIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} size={size} className={className} />;
};
