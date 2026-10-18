import { NavLink } from './NavLink';
import type { ActionDefinition } from '../../shared/types/ActionDefinition';
import type { FolderEntry } from '../types/FolderEntry';
import { actionPath } from '../utils/actionPath';
import { groupPath } from '../utils/groupPath';
import { segmentToLabel } from '../utils/segmentToLabel';
import type { FC } from 'react';

export type FolderSidebarProps = {
  folders: FolderEntry[];
  actions: ActionDefinition[];
};

const linkClassName = 'flex items-center gap-3 rounded-md px-3 py-2.5 text-[15px] text-gray-700 hover:bg-gray-100 hover:text-gray-900';

// The left column of a folder with a page: its subfolders and its actions, compact, so the page gets the room.
export const FolderSidebar: FC<FolderSidebarProps> = ({ folders, actions }) => {
  if (folders.length + actions.length === 0) {
    return <p className="px-2.5 text-sm text-gray-500">No actions here.</p>;
  }

  return (
    <nav aria-label="Folder" className="flex flex-col gap-0.5">
      {folders.map((folder) => {
        return (
          <NavLink key={folder.path} href={groupPath({ group: folder.path })} className={linkClassName}>
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 shrink-0 fill-gray-400">
              <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h4.38a1.5 1.5 0 0 1 1.06.44L10.5 6h6A1.5 1.5 0 0 1 18 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 14.5v-9Z" />
            </svg>
            <span className="truncate">{segmentToLabel({ segment: folder.path.split('/').at(-1) ?? folder.path })}</span>
          </NavLink>
        );
      })}
      {actions.map((action) => {
        return (
          <NavLink key={action.slug} href={actionPath({ slug: action.slug })} className={linkClassName}>
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 shrink-0 fill-gray-400">
              <path d="M11.3 1.05a.75.75 0 0 1 .44.82L10.9 7.5h4.35a.75.75 0 0 1 .58 1.23l-7 8.5a.75.75 0 0 1-1.32-.6l.84-5.13H4a.75.75 0 0 1-.58-1.23l7-8.5a.75.75 0 0 1 .88-.22Z" />
            </svg>
            <span className="truncate">{action.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
