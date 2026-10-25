import { codeColors } from '../../utils/codeColors';
import type { FC } from 'react';

// The top of an action: imports of the app's own database client and services, used right below.
export const ServicesSketch: FC = () => {
  return (
    <div className="w-full max-w-[16rem] rounded-md bg-gray-900 px-3 py-3 font-mono text-[11px] leading-5 whitespace-nowrap">
      <div className="truncate">
        <span className={codeColors.keyword}>import</span> <span className={codeColors.plain}>{'{ db }'} </span>
        <span className={codeColors.keyword}>from</span> <span className={codeColors.string}>&apos;../db&apos;</span>
      </div>
      <div className="truncate">
        <span className={codeColors.keyword}>import</span> <span className={codeColors.plain}>{'{ refunds }'} </span>
        <span className={codeColors.keyword}>from</span> <span className={codeColors.string}>&apos;../services&apos;</span>
      </div>
      <div className="mt-2 truncate">
        <span className={codeColors.keyword}>await</span> <span className={codeColors.plain}>refunds.</span>
        <span className={codeColors.fn}>issue</span>
        <span className={codeColors.plain}>(order.id);</span>
      </div>
    </div>
  );
};
