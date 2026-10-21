import type { FC } from 'react';

export const ImageMock: FC = () => {
  return (
    <div className="relative mx-auto h-24 w-36 overflow-hidden rounded-md border border-gray-300 bg-sky-100">
      <span className="absolute top-3 right-4 size-4 rounded-full bg-orange-300" />
      <span className="absolute -bottom-6 -left-4 h-14 w-20 rotate-12 rounded-md bg-emerald-300" />
      <span className="absolute -right-6 -bottom-8 h-16 w-24 -rotate-12 rounded-md bg-emerald-400" />
    </div>
  );
};
