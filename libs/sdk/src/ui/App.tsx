import { match } from 'ts-pattern';
import { RoutedPage } from './components/RoutedPage';
import { SessionHeader } from './components/SessionHeader';
import { useAppInfo } from './hooks/useAppInfo';
import { usePathname } from './hooks/usePathname';
import { useSession } from './hooks/useSession';
import { AccessRequestPage } from './pages/AccessRequestPage';
import { LoginPage } from './pages/LoginPage';
import { routes } from './utils/routes';
import type { FC } from 'react';

export const App: FC = () => {
  const { session, onLoggedIn, onLogOut } = useSession();
  const pathname = usePathname();
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
            // Without a login only two pages exist: the login itself and the request for access.
            return (
              // Without the header the login stands alone, so it sits in the middle of the window.
              <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
                {routes.parse({ pathname }).kind === 'access' ? <AccessRequestPage info={info} /> : <LoginPage info={info} onLoggedIn={onLoggedIn} />}
              </div>
            );
          })
          .with({ status: 'AUTHENTICATED' }, () => {
            return <RoutedPage />;
          })
          .exhaustive()}
      </main>
    </div>
  );
};
