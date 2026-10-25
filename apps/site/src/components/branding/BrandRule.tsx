import { match } from 'ts-pattern';
import type { FC, ReactNode } from 'react';

export type BrandRuleProps = {
  verdict: 'do' | 'dont';
  label: string;
  children: ReactNode;
};

// One do or don't example: the drawing on top, a green or red label under it.
export const BrandRule: FC<BrandRuleProps> = ({ verdict, label, children }) => {
  return (
    <figure className="overflow-hidden offset-card bg-white">
      <div className="flex h-36 items-center justify-center">{children}</div>
      <figcaption className="flex items-center gap-2 border-t border-gray-200 px-4 py-3 text-sm">
        {match(verdict)
          .with('do', () => {
            return <span className="font-semibold text-green-600">Do</span>;
          })
          .with('dont', () => {
            return <span className="font-semibold text-red-600">Don’t</span>;
          })
          .exhaustive()}
        <span className="text-gray-700">{label}</span>
      </figcaption>
    </figure>
  );
};
