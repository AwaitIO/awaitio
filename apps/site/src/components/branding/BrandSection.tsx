import type { FC, ReactNode } from 'react';

export type BrandSectionProps = {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
};

export const BrandSection: FC<BrandSectionProps> = ({ id, title, description, children }) => {
  return (
    <section id={id} className="scroll-mt-24 border-t border-gray-200 py-14">
      <h2 className="text-2xl font-semibold tracking-[-0.02em]">{title}</h2>
      <p className="mt-2 max-w-2xl text-gray-600">{description}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
};
