import { TrafficLights } from '../TrafficLights';
import type { FC, ReactNode } from 'react';

export type BrowserFrameProps = {
  url?: string;
  children: ReactNode;
  className?: string;
  compact?: boolean;
};

export const BrowserFrame: FC<BrowserFrameProps> = ({ url = 'tools.example.com/actions/users/create_user', children, className, compact = false }) => {
  return (
    <div className={['min-w-0 overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-gray-200', className].filter(Boolean).join(' ')}>
      <div className={['flex items-center gap-3 border-b border-gray-100 bg-gray-50', compact ? 'px-3 py-2' : 'px-4 py-3'].join(' ')}>
        <TrafficLights />
        <span className="flex-1 truncate rounded-md bg-white px-2 py-0.5 font-mono text-[11px] text-gray-500 ring-1 ring-gray-200">{url}</span>
      </div>
      <div className={compact ? 'p-3' : 'p-6'}>{children}</div>
    </div>
  );
};
