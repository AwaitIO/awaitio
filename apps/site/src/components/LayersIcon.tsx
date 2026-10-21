import { FeatureIcon } from './FeatureIcon';
import type { FC } from 'react';

export const LayersIcon: FC = () => {
  return (
    <FeatureIcon>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 17.5l9 5 9-5" />
    </FeatureIcon>
  );
};
