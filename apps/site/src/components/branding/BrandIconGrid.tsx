import { brandIcons } from './brandIcons';
import type { FC } from 'react';

// Every icon of the site on its card in all three sizes, `normal` on the 32 grid, `medium` on the 24 grid and `small` on
// the 16 grid, with the component's name.
export const BrandIconGrid: FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {brandIcons.map(({ name, Icon }) => {
        return (
          <div key={name} className="offset-card flex flex-col items-center gap-4 bg-white p-5">
            <div className="flex h-16 items-center gap-4 text-gray-900">
              <Icon size="normal" className="h-14 w-14" />
              <Icon size="medium" className="h-10 w-10" />
              <Icon size="small" className="h-6 w-6" />
            </div>
            <span className="font-mono text-xs text-gray-500">{name}</span>
          </div>
        );
      })}
    </div>
  );
};
