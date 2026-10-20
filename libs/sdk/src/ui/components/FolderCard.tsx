import { NavLink } from './NavLink';
import type { FolderEntry } from '../types/FolderEntry';
import { routes } from '../utils/routes';
import { segmentToLabel } from '../utils/segmentToLabel';
import type { FC } from 'react';

export type FolderCardProps = {
  folder: FolderEntry;
};

export const FolderCard: FC<FolderCardProps> = ({ folder }) => {
  const href = routes.group({ group: folder.path });

  return (
    <NavLink href={href} className="flex w-full items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm transition-colors hover:border-gray-400">
      <span className="flex items-center gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-6 w-6 fill-gray-500">
            <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h4.38a1.5 1.5 0 0 1 1.06.44L10.5 6h6A1.5 1.5 0 0 1 18 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 14.5v-9Z" />
          </svg>
        </span>
        <span className="flex flex-col gap-1">
          <span className="font-medium">{segmentToLabel({ segment: folder.path.split('/').at(-1) ?? folder.path })}</span>
          <span className="text-sm text-gray-500">{folder.actionCount === 1 ? '1 action' : `${folder.actionCount} actions`}</span>
        </span>
      </span>
      <span className="shrink-0 text-sm whitespace-nowrap text-gray-500">Open →</span>
    </NavLink>
  );
};
