import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M4 4h7v7H4z', 'M13 4h7v7h-7z', 'M4 13h7v7H4z', 'M16.5 13.5v6M13.5 16.5h6'];

// Drawn by hand for the 16 × 16 grid of `size="small"`, where the traced shapes would blur.
const small = [
  '................',
  '................',
  '..xxxxx..xxxxx..',
  '..x...x..x...x..',
  '..x...x..x...x..',
  '..x...x..x...x..',
  '..xxxxx..xxxxx..',
  '................',
  '................',
  '..xxxxx....x....',
  '..x...x....x....',
  '..x...x..xxxxx..',
  '..x...x....x....',
  '..xxxxx....x....',
  '................',
  '................',
];

// Three blocks and a plus, for components of your own next to the built-in ones.
export const BlocksIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} small={small} size={size} className={className} />;
};
