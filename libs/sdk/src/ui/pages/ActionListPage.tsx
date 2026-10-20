import { useEffect, type FC } from 'react';
import { ActionCard } from '../components/ActionCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FolderCard } from '../components/FolderCard';
import { FolderSidebar } from '../components/FolderSidebar';
import { PageView } from '../components/PageView';
import { useActionList } from '../hooks/useActionList';
import { listFolder } from '../utils/listFolder';
import { navigate } from '../utils/navigate';
import { routes } from '../utils/routes';
import { segmentToLabel } from '../utils/segmentToLabel';
import { topLevelFolders } from '../utils/topLevelFolders';

export type ActionListPageProps = {
  // Folder of the actions directory to show, null for the top.
  group: string | null;
};

export const ActionListPage: FC<ActionListPageProps> = ({ group }) => {
  const { list, errorMessage } = useActionList();
  const actions = list?.actions ?? [];
  const pages = list?.pages ?? [];
  // With folders there is no list of everything: / opens the first folder of the header navigation.
  const firstFolder = list ? topLevelFolders({ list })[0] : undefined;
  const folder = group ?? firstFolder ?? '';

  useEffect(() => {
    if (group === null && firstFolder) {
      navigate(routes.group({ group: firstFolder }), { replace: true });
    }
  }, [group, firstFolder]);

  const shown = listFolder({ actions, pages, folder });
  const page = pages.find((candidate) => {
    return candidate.slug === folder;
  });
  const folderLabel = folder === '' ? 'Actions' : segmentToLabel({ segment: folder.split('/').at(-1) ?? folder });
  const status = (
    <>
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
      {list === null && !errorMessage && <p className="text-sm text-gray-500">Loading…</p>}
    </>
  );

  // A folder with a page: its subfolders and actions in a narrow column, the page's layout (with its title) in the rest.
  if (page) {
    return (
      <div className="flex flex-col gap-6">
        {folder.includes('/') && <Breadcrumbs slug={folder} />}
        {status}
        <div className="flex flex-col gap-8 md:flex-row">
          <aside className="shrink-0 md:w-1/5 md:min-w-52">
            <FolderSidebar folders={shown.folders} actions={shown.actions} />
          </aside>
          <section className="min-w-0 flex-1">
            <PageView key={page.slug} slug={page.slug} />
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {folder.includes('/') && <Breadcrumbs slug={folder} />}
      <h1 className="text-2xl font-semibold">{folderLabel}</h1>
      {status}
      {list !== null && shown.actions.length + shown.folders.length === 0 && <p className="text-sm text-gray-500">No actions here.</p>}
      <ul className="flex flex-col gap-3">
        {shown.folders.map((entry) => {
          return (
            <li key={entry.path}>
              <FolderCard folder={entry} />
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
