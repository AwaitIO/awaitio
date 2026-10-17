import type { AppEnvironment } from '../../shared/types/AppEnvironment';
import type { FC } from 'react';

export type EnvironmentBadgeProps = {
  environment: AppEnvironment;
};

// The color marks only the dot, so the title stays readable whatever color is configured.
export const EnvironmentBadge: FC<EnvironmentBadgeProps> = ({ environment }) => {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: environment.color }} />
      {environment.title}
    </span>
  );
};
