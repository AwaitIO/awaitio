import { codeColors } from '../../utils/codeColors';
import type { FC } from 'react';

// The editor knows the type of what a person enters: a hover over `email` shows `string`.
export const TypesSketch: FC = () => {
  return (
    <div className="relative w-full max-w-[16rem] rounded-md bg-gray-900 px-3 pt-8 pb-3 font-mono text-[11px]">
      <span className="absolute top-2 left-3 rounded border border-gray-700 bg-gray-800 px-1.5 py-0.5 text-gray-300">
        const email: <span className={codeColors.keyword}>string</span>
      </span>
      <span className={codeColors.keyword}>const</span> <span className="text-white underline decoration-orange-400">email</span>
      <span className={codeColors.plain}> = </span>
      <span className={codeColors.keyword}>await</span> <span className={codeColors.plain}>io.input.</span>
      <span className={codeColors.fn}>email</span>
      <span className={codeColors.plain}>()</span>
    </div>
  );
};
