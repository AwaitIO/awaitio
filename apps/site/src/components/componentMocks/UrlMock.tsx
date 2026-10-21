import { SketchLabel } from './SketchLabel';
import type { FC } from 'react';

export const UrlMock: FC = () => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <SketchLabel text="Webhook URL" />
      <div className="flex h-8 items-center rounded-md border border-gray-300 bg-white px-2 text-xs text-gray-800">
        <span className="text-gray-400">https://</span>acme.com/hooks
      </div>
    </div>
  );
};
