import type { FC, ReactNode } from 'react';

export type FooterSectionProps = {
  title: string;
  children: ReactNode;
};

// One column of footer links under a small heading.
export const FooterSection: FC<FooterSectionProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-pixel text-base text-gray-900">{title}</h3>
      <div className="flex flex-col items-start gap-3 text-sm text-gray-600">{children}</div>
    </div>
  );
};
