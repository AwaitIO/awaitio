import { match } from 'ts-pattern';
import { usePathname } from '../hooks/usePathname';
import { ActionListPage } from '../pages/ActionListPage';
import { ActionStartPage } from '../pages/ActionStartPage';
import { RunPage } from '../pages/RunPage';
import { parseRoute } from '../utils/parseRoute';
import type { FC } from 'react';

// Forms and lists stay a readable column; only a folder with a page uses the full width.
export const RoutedPage: FC = () => {
  return match(parseRoute({ pathname: usePathname() }))
    .with({ kind: 'action', runId: null }, ({ slug }) => {
      return (
        <div className="mx-auto max-w-3xl">
          <ActionStartPage key={slug} slug={slug} />
        </div>
      );
    })
    .with({ kind: 'action' }, ({ slug, runId }) => {
      return (
        <div className="mx-auto max-w-3xl">
          <RunPage key={runId} slug={slug} runId={runId ?? ''} />
        </div>
      );
    })
    .with({ kind: 'list' }, ({ group }) => {
      return <ActionListPage key={group ?? ''} group={group} />;
    })
    .exhaustive();
};
