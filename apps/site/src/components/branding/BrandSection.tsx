import { FadeIn } from '../motion/FadeIn';
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
      <FadeIn>
        <h2 className="font-pixel text-xl leading-tight sm:text-2xl">{title}</h2>
        <p className="mt-2 max-w-2xl text-gray-600">{description}</p>
        <div className="mt-8">{children}</div>
      </FadeIn>
    </section>
  );
};
