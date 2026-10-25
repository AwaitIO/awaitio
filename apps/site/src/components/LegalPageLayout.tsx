import { FadeIn } from './motion/FadeIn';
import type { FC, ReactNode } from 'react';

export type LegalPageLayoutProps = {
  title: string;
  // ISO date, shown in words
  lastModifiedAt: string;
  children: ReactNode;
};

export const LegalPageLayout: FC<LegalPageLayoutProps> = ({ title, lastModifiedAt, children }) => {
  return (
    <article className="mx-auto max-w-3xl px-4 py-20 text-gray-700 [&_a]:underline [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
      <FadeIn on="load">
        <h1 className="text-4xl font-semibold tracking-[-0.02em] text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500">Last updated: {new Date(lastModifiedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</p>
      </FadeIn>
      <FadeIn on="load" delay={0.1}>
        {children}
      </FadeIn>
    </article>
  );
};
