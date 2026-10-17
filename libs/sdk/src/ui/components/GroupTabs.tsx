import { NavLink } from './NavLink';
import { groupPath } from '../utils/groupPath';
import { segmentToLabel } from '../utils/segmentToLabel';
import type { FC } from 'react';

export type GroupTabsProps = {
  // Top-level folders of the actions directory.
  groups: string[];
  // The folder shown; its top-level folder is the active tab.
  active: string;
};

// The main navigation: one tab per top-level folder. Without folders there are no tabs at all, and no tab for
// everything: / opens the first one.
export const GroupTabs: FC<GroupTabsProps> = ({ groups, active }) => {
  const activeTop = active.split('/')[0];
  const tabs = [...groups.map((group) => ({ key: group, label: segmentToLabel({ segment: group }), href: groupPath({ group }) }))];

  return (
    <nav aria-label="Action groups" className="-mb-px flex gap-6 overflow-x-auto border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = tab.key === activeTop;

        return (
          <NavLink
            key={tab.label}
            href={tab.href}
            className={['border-b-2 py-2.5 text-sm whitespace-nowrap', isActive && 'border-gray-900 font-medium text-gray-900', !isActive && 'border-transparent text-gray-600 hover:text-gray-900']
              .filter(Boolean)
              .join(' ')}
          >
            {tab.label}
          </NavLink>
        );
      })}
    </nav>
  );
};
