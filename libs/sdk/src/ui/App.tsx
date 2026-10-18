import { match } from 'ts-pattern';
import { RoutedPage } from './components/RoutedPage';
import { SessionHeader } from './components/SessionHeader';
import { useAppInfo } from './hooks/useAppInfo';
import { useSession } from './hooks/useSession';
import { LoginPage } from './pages/LoginPage';
import type { FC } from 'react';

export const App: FC = () => {
  const { session, onLoggedIn, onLogOut } = useSession();
  const info = useAppInfo({
    userEmail: match(session)
      .with({ status: 'AUTHENTICATED' }, ({ user }) => {
        return user.email;
      })
      .otherwise(() => {
        return null;
      }),
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {match(session)
        .with({ status: 'AUTHENTICATED' }, ({ user }) => {
          return <SessionHeader info={info} user={user} onLogOut={onLogOut} />;
        })
        .otherwise(() => {
          return null;
        })}
      <main className="mx-auto max-w-7xl px-4 py-10">
        {match(session)
          .with({ status: 'LOADING' }, () => {
            return <p className="text-sm text-gray-500">Loading…</p>;
          })
          .with({ status: 'FAILED' }, ({ message }) => {
            return <p className="text-sm text-red-600">{message}</p>;
          })
          .with({ status: 'ANONYMOUS' }, () => {
            return <LoginPage info={info} onLoggedIn={onLoggedIn} />;
          })
          .with({ status: 'AUTHENTICATED' }, () => {
            return <RoutedPage />;
          })
          .exhaustive()}
      </main>
    </div>
  );
};
