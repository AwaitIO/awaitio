import type { FC, ReactNode } from 'react';

export type FeatureIconProps = {
  children: ReactNode;
};

// The tile around every feature icon: same size, stroke and color for all of them.
export const FeatureIcon: FC<FeatureIconProps> = ({ children }) => {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-500 ring-1 ring-orange-100">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
      </svg>
    </span>
  );
};
