import { SketchLabel } from './SketchLabel';
import type { FC } from 'react';

export const TextareaMock: FC = () => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <SketchLabel text="Agenda" />
      <div className="flex h-16 flex-col gap-1.5 rounded-md border border-gray-300 bg-white p-2">
        <span className="h-1.5 w-4/5 rounded bg-gray-300" />
        <span className="h-1.5 w-3/5 rounded bg-gray-300" />
        <span className="h-1.5 w-2/5 rounded bg-gray-200" />
      </div>
    </div>
  );
};
