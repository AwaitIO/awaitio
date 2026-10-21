import { constants } from '../constants';
import type { FC, ReactNode } from 'react';

export type LegalPageProps = {
  title: string;
  children: ReactNode;
};

export const LegalPage: FC<LegalPageProps> = ({ title, children }) => {
  return (
    <article className="mx-auto max-w-3xl px-4 py-20 text-gray-700 [&_a]:underline [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
      <h1 className="text-4xl font-semibold tracking-[-0.02em] text-gray-900">{title}</h1>
      <p className="text-sm text-gray-500">Last updated: {constants.LEGAL_LAST_UPDATED}</p>
      {children}
    </article>
  );
};
