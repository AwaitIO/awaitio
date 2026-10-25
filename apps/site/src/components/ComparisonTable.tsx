import { CodeText } from './CodeText';
import type { Competitor } from '../types/Competitor';
import { awaitioFacts } from '../utils/awaitioFacts';
import { comparisonRows } from '../utils/comparisonRows';
import type { FC } from 'react';

export type ComparisonTableProps = {
  competitor: Pick<Competitor, 'name' | 'facts'>;
};

// AwaitIO and one other tool side by side. Three columns from sm up; below that every row stacks its label and both
// answers, each answer named, so the card never pushes a 320 px phone wider.
export const ComparisonTable: FC<ComparisonTableProps> = ({ competitor }) => {
  return (
    <div className="offset-card overflow-hidden bg-white">
      <div className="hidden border-b-[1.5px] border-gray-900 font-mono text-xs font-semibold tracking-widest text-gray-500 uppercase sm:grid sm:grid-cols-[10rem_1fr_1fr]">
        <div className="px-5 py-3" />
        <div className="px-5 py-3 text-orange-600">AwaitIO</div>
        <div className="px-5 py-3">{competitor.name}</div>
      </div>
      {comparisonRows.map((row, index) => {
        return (
          <div key={row.key} className={['grid gap-3 px-5 py-4 sm:grid-cols-[10rem_1fr_1fr] sm:gap-0 sm:p-0', index > 0 && 'border-t border-gray-200'].filter(Boolean).join(' ')}>
            <div className="text-sm font-semibold text-gray-900 sm:px-5 sm:py-4">{row.label}</div>
            <div className="flex min-w-0 flex-col gap-1 text-sm text-gray-700 sm:px-5 sm:py-4">
              <span className="font-mono text-xs font-semibold tracking-widest text-orange-600 uppercase sm:hidden">AwaitIO</span>
              <p>
                <CodeText text={awaitioFacts[row.key]} />
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-1 text-sm text-gray-600 sm:px-5 sm:py-4">
              <span className="font-mono text-xs font-semibold tracking-widest text-gray-500 uppercase sm:hidden">{competitor.name}</span>
              <p>
                <CodeText text={competitor.facts[row.key]} />
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
