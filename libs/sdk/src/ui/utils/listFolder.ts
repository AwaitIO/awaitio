import type { ActionDefinition } from '../../shared/types/ActionDefinition';
import type { FolderEntry } from '../types/FolderEntry';

export type ListFolderArgs = {
  actions: ActionDefinition[];
  // Folders with an index page; a folder that holds only its page is still a folder.
  pages: ActionDefinition[];
  // '' for the top of the actions directory.
  folder: string;
};

// What one folder shows, like a file browser: its direct subfolders and its own actions, nothing deeper.
// An index file shares its folder's slug (billing/index.ts → billing), so it leads that folder instead of
// showing next to it.
export const listFolder = ({ actions, pages, folder }: ListFolderArgs) => {
  const prefix = folder ? `${folder}/` : '';
  const inside = actions.filter((action) => {
    return action.slug.startsWith(prefix) && action.slug !== folder;
  });
  const pagesInside = pages
    .filter((page) => {
      return page.slug.startsWith(prefix) && page.slug !== folder;
    })
    .map((page) => {
      return [...page.slug.slice(prefix.length).split('/'), ''];
    });
  const folderPaths = [
    ...new Set(
      [
        ...inside.map((action) => {
          return action.slug.slice(prefix.length).split('/');
        }),
        ...pagesInside,
      ]
        .filter((segments) => {
          return segments.length > 1;
        })
        .map((segments) => {
          return `${prefix}${segments[0]}`;
        }),
    ),
  ];
  const folders: FolderEntry[] = folderPaths.map((path) => {
    return {
      path,
      actionCount: actions.filter((action) => {
        return action.slug === path || action.slug.startsWith(`${path}/`);
      }).length,
    };
  });
  const index = actions.filter((action) => {
    return folder !== '' && action.slug === folder;
  });
  const ownActions = inside.filter((action) => {
    return !action.slug.slice(prefix.length).includes('/') && !folderPaths.includes(action.slug);
  });

  return { actions: [...index, ...ownActions], folders };
};
