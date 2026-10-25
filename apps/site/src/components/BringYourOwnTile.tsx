import { constants } from '../constants';
import { PlusIcon } from '../icons/PlusIcon';
import type { FC } from 'react';

// The last tile: any component you write yourself, plain React in one file.
export const BringYourOwnTile: FC = () => {
  return (
    <a
      href={`${constants.DOCS_URL}/core/input-components#write-your-own`}
      className="group flex flex-col items-center justify-center gap-3 rounded-[10px] border-[1.5px] border-dashed border-gray-900 p-6 text-center hover:border-orange-500 hover:bg-orange-50"
    >
      <PlusIcon className="h-12 w-12 text-gray-900 group-hover:text-orange-500" />
      <span className="text-base font-semibold text-gray-900">Bring your own</span>
      <span className="text-sm text-gray-600">Any React component in one file, registered next to these and awaited the same way.</span>
      <code className="text-xs text-orange-600">io.input.yours()</code>
    </a>
  );
};
