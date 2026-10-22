import type { FaqEntry } from '../types/FaqEntry';
import type { FC } from 'react';

type FaqItemProps = {
  entry: FaqEntry;
};

export const FaqItem: FC<FaqItemProps> = ({ entry }) => {
  return (
    <details className="group border-b border-gray-200 py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-gray-900 [&::-webkit-details-marker]:hidden">
        {entry.question}
        <span className="shrink-0 text-gray-400 transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="mt-3 text-gray-600">{entry.answer}</div>
    </details>
  );
};
