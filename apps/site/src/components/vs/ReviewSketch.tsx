import type { FC } from 'react';

const lines = [
  { sign: ' ', text: "const email = await io.input.email('Email');" },
  { sign: '-', text: "const reason = await io.input.text('Reason');" },
  { sign: '+', text: "const reason = await io.select.single('Reason', {" },
  { sign: '+', text: '  options: refundReasons,' },
  { sign: '+', text: '});' },
];

// A change to a tool as a pull request: the title, a review approval and the diff.
export const ReviewSketch: FC = () => {
  return (
    <div className="flex w-full max-w-[16rem] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white text-[10px]">
      <div className="flex items-center justify-between gap-2 border-b border-gray-200 px-2.5 py-2">
        <span className="truncate font-medium text-gray-900">Pick refund reason from a list</span>
        <span className="shrink-0 rounded-full bg-done px-1.5 py-0.5 text-[9px] font-medium text-white">Approved</span>
      </div>
      <div className="font-mono">
        {lines.map((line, index) => {
          return (
            <div
              key={index}
              className={['truncate px-2.5 py-0.5', line.sign === '+' && 'bg-done/10 text-gray-900', line.sign === '-' && 'bg-orange-100 text-gray-600', line.sign === ' ' && 'text-gray-500']
                .filter(Boolean)
                .join(' ')}
            >
              {line.sign} {line.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};
