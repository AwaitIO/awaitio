import { match, P } from 'ts-pattern';
import { usePathname } from './hooks/usePathname';
import { ActionListPage } from './pages/ActionListPage';
import { ActionStartPage } from './pages/ActionStartPage';
import { RunPage } from './pages/RunPage';
import { parseRoute } from './utils/parseRoute';
import type { FC } from 'react';

export const App: FC = () => {
  const route = parseRoute({ pathname: usePathname() });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto max-w-3xl px-4 py-10">
        {match(route)
          .with({ slug: P.string, runId: P.string }, ({ slug, runId }) => {
            return <RunPage key={runId} slug={slug} runId={runId} />;
          })
          .with({ slug: P.string, runId: P.nullish }, ({ slug }) => {
            return <ActionStartPage key={slug} slug={slug} />;
          })
          .with({ slug: P.nullish }, () => {
            return <ActionListPage />;
          })
          .exhaustive()}
      </main>
    </div>
  );
};
