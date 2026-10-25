import { LogoMark } from '../logos/LogoMark';
import type { FC } from 'react';

// Your own server with your app in it, and AwaitIO as one part of that app next to the API.
export const AppSketch: FC = () => {
  return (
    <div className="flex w-full max-w-[15rem] flex-col gap-2 rounded-lg border-[1.5px] border-gray-900 bg-white p-3 text-[11px]">
      <span className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">Your server</span>
      <div className="flex flex-col gap-1.5 rounded-md border border-gray-200 bg-gray-50 p-2">
        <span className="font-medium text-gray-900">Your Node app</span>
        <div className="grid grid-cols-2 gap-1.5">
          <span className="rounded border border-gray-200 bg-white px-2 py-1 text-gray-600">/api</span>
          <span className="flex items-center gap-1.5 rounded border border-orange-400 bg-white px-2 py-1 text-gray-900">
            <LogoMark size={14} tone="light" />
            /tools
          </span>
        </div>
      </div>
    </div>
  );
};
