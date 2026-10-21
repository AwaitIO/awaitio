import { FeatureIcon } from './FeatureIcon';
import type { FC } from 'react';

export const PuzzleIcon: FC = () => {
  return (
    <FeatureIcon>
      <path d="M10 4a2 2 0 1 1 4 0v2h3a1 1 0 0 1 1 1v3h-1a2 2 0 1 0 0 4h1v3a1 1 0 0 1-1 1h-3v-1a2 2 0 1 0-4 0v1H7a1 1 0 0 1-1-1v-3h1a2 2 0 1 0 0-4H6V7a1 1 0 0 1 1-1h3z" />
    </FeatureIcon>
  );
};
