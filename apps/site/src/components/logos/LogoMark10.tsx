import { logoColors } from './logoColors';
import type { LogoMarkProps } from './LogoMarkProps';
import type { FC } from 'react';

export const LogoMark10: FC<LogoMarkProps> = ({ size, tone }) => {
  const { ink, accent } = logoColors({ tone });

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="11" stroke={ink} strokeOpacity="0.18" strokeWidth="3.5" />
      <path d="M16 5a11 11 0 0 1 11 11" stroke={ink} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="27" cy="16" r="3.2" fill={accent} />
    </svg>
  );
};
