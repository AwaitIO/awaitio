import { constants } from '../constants';
import type { FC } from 'react';

// The last tile: any component you write yourself, plain React in one file.
export const BringYourOwnTile: FC = () => {
  return (
    <a
      href={`${constants.DOCS_URL}/core/input-components#write-your-own`}
      className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 p-6 text-center hover:border-orange-400 hover:bg-orange-50/40"
    >
      <span className="text-3xl leading-none text-gray-400">+</span>
      <span className="text-base font-semibold text-gray-900">Bring your own</span>
      <span className="text-sm text-gray-600">Any React component in one file, registered next to these and awaited the same way.</span>
      <code className="text-xs text-orange-600">io.input.yours()</code>
    </a>
  );
};
