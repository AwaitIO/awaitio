import { SketchLabel } from './SketchLabel';
import type { FC } from 'react';

export const EmailMock: FC = () => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <SketchLabel text="Work email" />
      <div className="flex h-8 items-center rounded-md border border-gray-300 bg-white px-2 text-xs text-gray-800">ada@acme.com</div>
    </div>
  );
};
