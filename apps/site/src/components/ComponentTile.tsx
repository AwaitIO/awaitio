import { constants } from '../constants';
import type { ComponentShowcase } from '../types/ComponentShowcase';
import type { FC } from 'react';

export type ComponentTileProps = {
  component: ComponentShowcase;
};

// A sketch of the component and its io call; the whole tile opens its page in the docs.
export const ComponentTile: FC<ComponentTileProps> = ({ component }) => {
  const { Mock } = component;

  return (
    <a href={`${constants.DOCS_URL}${component.docsPath}`} className="group offset-card flex flex-col overflow-hidden bg-white transition-[border-color,box-shadow] hover:border-orange-500 hover:shadow-[5px_5px_0_var(--color-orange-500)]">
      <div className="flex h-40 items-center bg-gray-50 px-6 transition-colors group-hover:bg-orange-50/60">
        <Mock />
      </div>
      <div className="flex flex-col gap-1 border-t border-gray-200 p-4 transition-colors group-hover:border-orange-200">
        <div className="flex items-center justify-between gap-2">
          <code className="text-sm font-medium text-gray-900 transition-colors group-hover:text-orange-600">{component.method}</code>
          <span className="text-xs text-orange-600 opacity-0 transition-opacity group-hover:opacity-100">Docs →</span>
        </div>
        <p className="text-sm text-gray-600">{component.description}</p>
      </div>
    </a>
  );
};
