import { match, P } from 'ts-pattern';
import { usePathname } from '../hooks/usePathname';
import { ActionListPage } from '../pages/ActionListPage';
import { ActionStartPage } from '../pages/ActionStartPage';
import { RunPage } from '../pages/RunPage';
import { parseRoute } from '../utils/parseRoute';
import type { FC } from 'react';

export const RoutedPage: FC = () => {
  return match(parseRoute({ pathname: usePathname() }))
    .with({ slug: P.string, runId: P.string }, ({ slug, runId }) => {
      return <RunPage key={runId} slug={slug} runId={runId} />;
    })
    .with({ slug: P.string, runId: P.nullish }, ({ slug }) => {
      return <ActionStartPage key={slug} slug={slug} />;
    })
    .with({ slug: P.nullish }, () => {
      return <ActionListPage />;
    })
    .exhaustive();
};
