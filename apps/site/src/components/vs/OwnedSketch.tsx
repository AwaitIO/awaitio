import type { FC } from 'react';

// A power switch locked in the on position: nobody outside your company can turn the tools off.
export const OwnedSketch: FC = () => {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[11px]">
      <span className="relative h-6 w-11 rounded-full bg-done">
        <span className="absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-white" />
      </span>
      <span className="flex flex-col">
        <span className="font-medium text-gray-900">Your tools</span>
        <span className="text-gray-500">On, in your own app</span>
      </span>
    </div>
  );
};
