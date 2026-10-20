import { match } from 'ts-pattern';
import { NavLink } from './NavLink';
import { useActionList } from '../hooks/useActionList';
import { usePathname } from '../hooks/usePathname';
import { groupPath } from '../utils/groupPath';
import { parseRoute } from '../utils/parseRoute';
import { segmentToLabel } from '../utils/segmentToLabel';
import { topLevelFolders } from '../utils/topLevelFolders';
import type { FC } from 'react';

// The main navigation, the second row of the header: one tab per top-level folder, the one the page is in highlighted (a folder, or
// an action inside it). Without folders there is none, and / opens the first folder.
export const FolderNav: FC = () => {
  const { list } = useActionList();
  const folders = list ? topLevelFolders({ list }) : [];
  const route = parseRoute({ pathname: usePathname() });
  const active = match(route)
    .with({ kind: 'list' }, ({ group }) => {
      return (group ?? folders[0] ?? '').split('/')[0];
    })
    .with({ kind: 'action' }, ({ slug }) => {
      return slug.split('/')[0];
    })
    .with({ kind: 'access' }, () => {
      return '';
    })
    .exhaustive();

  if (folders.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Action groups" className="-mb-px flex gap-8 overflow-x-auto">
      {folders.map((folder) => {
        const isActive = folder === active;

        return (
          <NavLink
            key={folder}
            href={groupPath({ group: folder })}
            className={['border-b-2 py-3 text-[15px] whitespace-nowrap', isActive && 'border-gray-900 font-medium text-gray-900', !isActive && 'border-transparent text-gray-600 hover:text-gray-900']
              .filter(Boolean)
              .join(' ')}
          >
            {segmentToLabel({ segment: folder })}
          </NavLink>
        );
      })}
    </nav>
  );
};
