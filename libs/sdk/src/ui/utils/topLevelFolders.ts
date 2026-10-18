import type { ActionList } from '../../shared/types/ActionList';

export type TopLevelFoldersArgs = {
  list: ActionList;
};

// The folders directly in the actions directory, in the order the server lists their actions; a folder with only a
// page counts too.
export const topLevelFolders = ({ list }: TopLevelFoldersArgs) => {
  return [
    ...new Set(
      [
        ...list.actions.filter((action) => {
          return action.slug.includes('/');
        }),
        ...list.pages,
      ].map((route) => {
        return route.slug.split('/')[0] ?? '';
      }),
    ),
  ];
};
