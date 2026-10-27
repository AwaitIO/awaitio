import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M8 3h8l5 5v8l-5 5H8l-5-5V8z', 'M9 12h6'];

// Drawn by hand for the 10 × 10 grid of `size="coarse"`, where the traced shapes would blur.
const coarse = ['...xxxx...', '..xxxxxx..', '.xxxxxxxx.', 'xxxxxxxxxx', 'x........x', 'x........x', 'xxxxxxxxxx', '.xxxxxxxx.', '..xxxxxx..', '...xxxx...'];

// A stop sign, for stopping early.
export const StopIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} coarse={coarse} size={size} className={className} />;
};
