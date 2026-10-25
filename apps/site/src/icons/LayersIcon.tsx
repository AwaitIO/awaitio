import { FeatureIcon } from '../components/FeatureIcon';
import type { IconProps } from '../types/IconProps';
import type { FC } from 'react';

const paths = ['M12 3l9 5-9 5-9-5z', 'M3 13l9 5 9-5', 'M3 17.5l9 5 9-5'];

// Drawn by hand for the 16 × 16 grid of `size="small"`, where the traced shapes would blur.
const small = [
  '................',
  '................',
  '.......xx.......',
  '.....xx..xx.....',
  '...xx......xx...',
  '.xx..........xx.',
  '...xx......xx...',
  '.....xx..xx.....',
  '.xx....xx....xx.',
  '...xx......xx...',
  '.....xx..xx.....',
  '.xx....xx....xx.',
  '...xx......xx...',
  '.....xx..xx.....',
  '.......xx.......',
  '................',
];

// Three stacked layers.
export const LayersIcon: FC<IconProps> = ({ size, className }) => {
  return <FeatureIcon paths={paths} small={small} size={size} className={className} />;
};
