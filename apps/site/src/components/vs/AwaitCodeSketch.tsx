import { codeColors } from '../../utils/codeColors';
import { TrafficLights } from '../TrafficLights';
import type { FC } from 'react';

// AwaitIO's side of the hero: three lines of an action and the form the first `await` turns into.
export const AwaitCodeSketch: FC = () => {
  return (
    <div className="flex min-h-[15rem] flex-1 flex-col gap-3 p-3">
      <div className="overflow-hidden rounded-lg bg-gray-900 font-mono text-[10px] leading-5 sm:text-[11px]">
        <div className="flex items-center gap-3 px-3 py-2">
          <TrafficLights />
          <span className="truncate text-gray-400">refundOrderAction.ts</span>
        </div>
        <div className="overflow-hidden px-3 pb-3 whitespace-nowrap">
          <div>
            <span className={codeColors.keyword}>const</span> <span className={codeColors.plain}>email = </span>
            <span className={codeColors.keyword}>await</span> <span className={codeColors.plain}>io.input.</span>
            <span className={codeColors.fn}>email</span>
            <span className={codeColors.plain}>(</span>
            <span className={codeColors.string}>&apos;Customer email&apos;</span>
            <span className={codeColors.plain}>);</span>
          </div>
          <div>
            <span className={codeColors.keyword}>const</span> <span className={codeColors.plain}>orders = </span>
            <span className={codeColors.keyword}>await</span> <span className={codeColors.plain}>db.order.</span>
            <span className={codeColors.fn}>findMany</span>
            <span className={codeColors.plain}>(…);</span>
          </div>
          <div>
            <span className={codeColors.keyword}>await</span> <span className={codeColors.plain}>io.select.</span>
            <span className={codeColors.fn}>table</span>
            <span className={codeColors.plain}>(</span>
            <span className={codeColors.string}>&apos;Orders&apos;</span>
            <span className={codeColors.plain}>, {'{'} data: orders {'}'});</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-3 text-[11px]">
        <span className="font-medium text-gray-900">Customer email</span>
        <span className="rounded border border-gray-300 px-2 py-1 text-gray-700">ana@northwind.example</span>
        <span className="self-start rounded bg-gray-900 px-2.5 py-1 font-medium text-white">Continue</span>
      </div>
    </div>
  );
};
