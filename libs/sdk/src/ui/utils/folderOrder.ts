import type { ActionDefinition } from '../../shared/types/ActionDefinition';
import type { PageDefinition } from '../../shared/types/PageDefinition';

export type FolderOrderArgs = {
  // A folder of the actions directory, e.g. users or billing/invoices.
  path: string;
  actions: ActionDefinition[];
  pages: PageDefinition[];
};

// A folder takes the order of its index file, a page or an action; a folder without one has none.
export const folderOrder = ({ path, actions, pages }: FolderOrderArgs) => {
  return (
    [...pages, ...actions].find((route) => {
      return route.slug === path;
    })?.order ?? null
  );
};
