import { useEffect, useState, type FC } from 'react';
import type { ActionDefinition } from '../../shared/types/ActionDefinition';
import { fetchActions } from '../api/fetchActions';
import { ActionCard } from '../components/ActionCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FolderCard } from '../components/FolderCard';
import { GroupTabs } from '../components/GroupTabs';
import { groupPath } from '../utils/groupPath';
import { listFolder } from '../utils/listFolder';
import { navigate } from '../utils/navigate';
import { segmentToLabel } from '../utils/segmentToLabel';
import { toErrorMessage } from '../utils/toErrorMessage';

export type ActionListPageProps = {
  // Folder of the actions directory to show, null for all actions.
  group: string | null;
};

export const ActionListPage: FC<ActionListPageProps> = ({ group }) => {
  const [actions, setActions] = useState<ActionDefinition[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchActions()
      .then(setActions)
      .catch((error) => {
        setErrorMessage(toErrorMessage(error));
      });
  }, []);

  const groups = [
    ...new Set(
      (actions ?? [])
        .filter((action) => {
          return action.slug.includes('/');
        })
        .map((action) => {
          return action.slug.split('/')[0] ?? '';
        }),
    ),
  ];
  // With folders there is no list of everything: / opens the first tab.
  const firstGroup = groups[0];
  const folder = group ?? firstGroup ?? '';

  useEffect(() => {
    if (group === null && firstGroup) {
      navigate(groupPath({ group: firstGroup }), { replace: true });
    }
  }, [group, firstGroup]);

  const shown = listFolder({ actions: actions ?? [], folder });
  const title = folder === '' ? 'Actions' : segmentToLabel({ segment: folder.split('/').at(-1) ?? folder });

  return (
    <div className="flex flex-col gap-6">
      {folder.includes('/') && <Breadcrumbs slug={folder} />}
      <h1 className="text-2xl font-semibold">{title}</h1>
      {groups.length > 0 && <GroupTabs groups={groups} active={folder} />}
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
      {actions === null && !errorMessage && <p className="text-sm text-gray-500">Loading…</p>}
      {actions !== null && shown.actions.length + shown.folders.length === 0 && <p className="text-sm text-gray-500">No actions here.</p>}
      <ul className="flex flex-col gap-3">
        {shown.folders.map((folder) => {
          return (
            <li key={folder.path}>
              <FolderCard folder={folder} />
            </li>
          );
        })}
        {shown.actions.map((action) => {
          return (
            <li key={action.slug}>
              <ActionCard action={action} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
