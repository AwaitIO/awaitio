import { AppTitle } from './AppTitle';
import { Button } from './Button';
import type { AppInfo } from '../../shared/types/AppInfo';
import type { SessionUser } from '../../shared/types/SessionUser';
import type { FC } from 'react';

export type SessionHeaderProps = {
  info: AppInfo | null;
  user: SessionUser;
  onLogOut: () => void;
};

export const SessionHeader: FC<SessionHeaderProps> = ({ info, user, onLogOut }) => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-2 text-sm">
        {info && <AppTitle info={info} />}
        <span className="flex-1" />
        <span className="text-gray-600" title={user.email}>
          {user.name}
        </span>
        <Button variant="secondary" className="px-3 py-1" onClick={onLogOut}>
          Log out
        </Button>
      </div>
    </header>
  );
};
