import type { FC } from 'react';

const tree = [
  { depth: 0, name: 'src/', isFolder: true },
  { depth: 1, name: 'actions/', isFolder: true },
  { depth: 2, name: 'refundOrderAction.ts', isActive: true },
  { depth: 2, name: 'resendReceiptAction.ts' },
  { depth: 1, name: 'db.ts' },
  { depth: 1, name: 'services/', isFolder: true },
];

// The action as one file in the repository, between the rest of the app's code.
export const RepoSketch: FC = () => {
  return (
    <div className="flex w-full max-w-[15rem] flex-col gap-1 rounded-lg border border-gray-200 bg-white p-3 font-mono text-[11px] text-gray-600">
      {tree.map((entry) => {
        return (
          <span
            key={entry.name}
            className={['truncate rounded px-1.5 py-0.5', entry.isActive && 'bg-orange-100 text-gray-900', entry.isFolder && 'text-gray-900'].filter(Boolean).join(' ')}
            style={{ marginLeft: `${entry.depth * 0.9}rem` }}
          >
            {entry.name}
          </span>
        );
      })}
    </div>
  );
};
