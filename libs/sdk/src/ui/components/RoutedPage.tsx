import { match } from 'ts-pattern';
import { usePathname } from '../hooks/usePathname';
import { AccessRequestPage } from '../pages/AccessRequestPage';
import { ActionListPage } from '../pages/ActionListPage';
import { ActionStartPage } from '../pages/ActionStartPage';
import { RunPage } from '../pages/RunPage';
import { routes } from '../utils/routes';
import type { FC } from 'react';

// Every page uses the full width of the UI, so lists, pages and runs line up under the header.
export const RoutedPage: FC = () => {
  return match(routes.parse({ pathname: usePathname() }))
    .with({ kind: 'action', runId: null }, ({ slug }) => {
      return <ActionStartPage key={slug} slug={slug} />;
    })
    .with({ kind: 'action' }, ({ slug, runId }) => {
      return <RunPage key={runId} slug={slug} runId={runId ?? ''} />;
    })
    .with({ kind: 'access' }, () => {
      return <AccessRequestPage info={null} />;
    })
    .with({ kind: 'list' }, ({ group }) => {
      return <ActionListPage key={group ?? ''} group={group} />;
    })
    .exhaustive();
};
