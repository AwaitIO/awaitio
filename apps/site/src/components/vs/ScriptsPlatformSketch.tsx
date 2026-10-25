import type { FC } from 'react';

const scripts = [
  { language: 'TS', name: 'refund_order' },
  { language: 'PY', name: 'sync_invoices' },
  { language: 'SQL', name: 'monthly_report' },
];

// A scripts platform: the scripts listed in its web app, two of them chained into a flow, and a generated form to
// run one.
export const ScriptsPlatformSketch: FC = () => {
  return (
    <div className="flex min-h-[15rem] flex-1 text-[10px] text-gray-600">
      <div className="flex w-28 shrink-0 flex-col gap-1.5 border-r border-gray-200 bg-gray-50 p-2 sm:w-32">
        <span className="font-mono text-[9px] tracking-widest text-gray-400 uppercase">Scripts</span>
        {scripts.map((script) => {
          return (
            <span key={script.name} className="flex items-center gap-1.5 truncate rounded border border-gray-200 bg-white px-1.5 py-1">
              <span className="rounded bg-gray-200 px-1 font-mono text-[8px] text-gray-700">{script.language}</span>
              <span className="truncate font-mono">{script.name}</span>
            </span>
          );
        })}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3">
        <div className="flex items-center gap-2">
          <span className="rounded border border-gray-300 bg-white px-2 py-1 font-mono">refund_order</span>
          <span className="h-px w-5 bg-gray-400" />
          <span className="rounded border border-gray-300 bg-white px-2 py-1 font-mono">notify_slack</span>
        </div>
        <div className="mt-auto flex flex-col gap-1.5 rounded border border-gray-200 bg-white p-2.5">
          <span className="font-medium text-gray-800">order_id</span>
          <span className="h-5 rounded border border-gray-300" />
          <span className="self-start rounded bg-gray-700 px-2 py-0.5 font-medium text-white">Run</span>
        </div>
      </div>
    </div>
  );
};
