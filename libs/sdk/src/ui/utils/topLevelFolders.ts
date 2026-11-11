import { compareByOrder } from './compareByOrder';
import { folderOrder } from './folderOrder';
import type { ActionList } from '../../shared/types/ActionList';

export type TopLevelFoldersArgs = {
  list: ActionList;
};

// The folders directly in the actions directory; a folder with only a page counts too, unless the page is unlisted.
// A folder whose index file has an order comes first, lower first; the rest follow alphabetically.
export const topLevelFolders = ({ list }: TopLevelFoldersArgs) => {
  return [
    ...new Set(
      [
        ...list.actions.filter((action) => {
          return action.slug.includes('/');
        }),
        ...list.pages.filter((page) => {
          return !page.unlisted;
        }),
      ].map((route) => {
        return route.slug.split('/')[0] ?? '';
      }),
    ),
  ].sort((a, b) => {
    return compareByOrder({ a: folderOrder({ path: a, ...list }), b: folderOrder({ path: b, ...list }) }) || a.localeCompare(b);
  });
};
