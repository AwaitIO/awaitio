import { codeColors } from '../../utils/codeColors';
import type { FC } from 'react';

// One line with `await` and the form it shows, joined by an arrow.
export const AwaitFormSketch: FC = () => {
  return (
    <div className="flex w-full max-w-[16rem] flex-col items-stretch gap-2">
      <div className="truncate rounded-md bg-gray-900 px-3 py-2 font-mono text-[11px]">
        <span className={codeColors.keyword}>await</span> <span className={codeColors.plain}>io.input.</span>
        <span className={codeColors.fn}>email</span>
        <span className={codeColors.plain}>(</span>
        <span className={codeColors.string}>&apos;Email&apos;</span>
        <span className={codeColors.plain}>)</span>
      </div>
      <span className="self-center font-mono text-sm text-orange-500" aria-hidden="true">
        ↓
      </span>
      <div className="flex flex-col gap-1.5 rounded-md border border-gray-200 bg-white p-2.5 text-[11px]">
        <span className="font-medium">Email</span>
        <span className="h-5 rounded border border-gray-300" />
      </div>
    </div>
  );
};
