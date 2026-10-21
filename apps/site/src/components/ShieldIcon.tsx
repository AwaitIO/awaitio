import { FeatureIcon } from './FeatureIcon';
import type { FC } from 'react';

export const ShieldIcon: FC = () => {
  return (
    <FeatureIcon>
      <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z" />
      <rect x="9.5" y="10.5" width="5" height="4.5" rx="1" />
      <path d="M10.5 10.5V9a1.5 1.5 0 0 1 3 0v1.5" />
    </FeatureIcon>
  );
};
