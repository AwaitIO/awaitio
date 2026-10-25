import { codeColors } from '../../utils/codeColors';
import type { FC } from 'react';

// A backend SDK like AwaitIO's whose screens came from the vendor's cloud: the code on your server, a line to the
// hosted dashboard, and that dashboard switched off.
export const HostedSdkSketch: FC = () => {
  return (
    <div className="flex min-h-[15rem] flex-1 flex-col gap-3 p-3 text-[10px]">
      <div className="overflow-hidden rounded-lg bg-gray-900 px-3 py-3 font-mono leading-5 whitespace-nowrap sm:text-[11px]">
        <div>
          <span className={codeColors.keyword}>const</span> <span className={codeColors.plain}>email = </span>
          <span className={codeColors.keyword}>await</span> <span className={codeColors.plain}>io.input.</span>
          <span className={codeColors.fn}>email</span>
          <span className={codeColors.plain}>(</span>
          <span className={codeColors.string}>&apos;Email&apos;</span>
          <span className={codeColors.plain}>);</span>
        </div>
      </div>
      <div className="flex items-center gap-2 font-mono text-gray-500">
        <span className="rounded border border-gray-300 bg-white px-2 py-1">your server</span>
        <span className="h-px flex-1 border-t border-dashed border-gray-400" />
        <span className="rounded border border-gray-300 bg-white px-2 py-1">vendor cloud</span>
      </div>
      <div className="mt-auto flex items-center justify-between gap-2 rounded border border-gray-300 bg-gray-50 p-3 text-gray-500">
        <span className="flex flex-col gap-1">
          <span className="font-medium text-gray-700">Hosted dashboard</span>
          <span>The screens came from the vendor.</span>
        </span>
        <span className="relative h-5 w-9 shrink-0 rounded-full bg-gray-300">
          <span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white" />
        </span>
      </div>
    </div>
  );
};
