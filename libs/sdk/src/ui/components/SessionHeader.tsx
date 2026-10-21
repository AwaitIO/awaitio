import { AppTitle } from './AppTitle';
import { FolderNav } from './FolderNav';
import type { AppInfo } from '../../shared/types/AppInfo';
import type { SessionUser } from '../../shared/types/SessionUser';
import { routes } from '../utils/routes';
import type { FC } from 'react';

export type SessionHeaderProps = {
  info: AppInfo | null;
  user: SessionUser;
  onLogOut: () => void;
};

export const SessionHeader: FC<SessionHeaderProps> = ({ info, user, onLogOut }) => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 text-sm">
        {info && <AppTitle info={info} homeHref={routes.actionList()} />}
        <span className="flex-1" />
        <span className="text-gray-600" title={user.email}>
          {user.name}
        </span>
        <button
          type="button"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          aria-label="Log out"
          title="Log out"
          onClick={onLogOut}
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0">
            <path d="M8 3.5H5A1.5 1.5 0 0 0 3.5 5v10A1.5 1.5 0 0 0 5 16.5h3" />
            <path d="M12.5 6.5 16 10l-3.5 3.5" />
            <path d="M16 10H7.5" />
          </svg>
        </button>
      </div>
      <div className="mx-auto max-w-7xl px-4">
        <FolderNav />
      </div>
    </header>
  );
};
