import { NavLink } from './NavLink';
import { parentOf } from '../utils/parentOf';
import { routes } from '../utils/routes';
import { segmentToLabel } from '../utils/segmentToLabel';
import type { FC } from 'react';

export type BreadcrumbsProps = {
  slug: string;
  onNavigate?: (href: string) => void;
};

// Actions › Billing › Invoices above an action: each folder of its slug links to that folder's list.
export const Breadcrumbs: FC<BreadcrumbsProps> = ({ slug, onNavigate }) => {
  const folders = parentOf({ slug }).split('/').filter(Boolean);

  return (
    <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
      <NavLink href={routes.actionList()} onNavigate={onNavigate} className="hover:text-gray-900">
        ← Actions
      </NavLink>
      {folders.map((folder, index) => {
        return (
          <span key={folder + index} className="flex items-center gap-1.5">
            <span aria-hidden="true">›</span>
            <NavLink href={routes.group({ group: folders.slice(0, index + 1).join('/') })} onNavigate={onNavigate} className="hover:text-gray-900">
              {segmentToLabel({ segment: folder })}
            </NavLink>
          </span>
        );
      })}
    </nav>
  );
};
