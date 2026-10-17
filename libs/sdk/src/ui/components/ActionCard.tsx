import { NavLink } from './NavLink';
import type { ActionDefinition } from '../../shared/types/ActionDefinition';
import { actionPath } from '../utils/actionPath';
import type { FC } from 'react';

export type ActionCardProps = {
  action: ActionDefinition;
};

export const ActionCard: FC<ActionCardProps> = ({ action }) => {
  const href = actionPath({ slug: action.slug });

  return (
    <NavLink href={href} className="flex w-full items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm transition-colors hover:border-gray-400">
      <span className="flex items-center gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-6 w-6 fill-gray-500">
            <path d="M11.3 1.05a.75.75 0 0 1 .44.82L10.9 7.5h4.35a.75.75 0 0 1 .58 1.23l-7 8.5a.75.75 0 0 1-1.32-.6l.84-5.13H4a.75.75 0 0 1-.58-1.23l7-8.5a.75.75 0 0 1 .88-.22Z" />
          </svg>
        </span>
        <span className="flex flex-col gap-1">
          <span className="font-medium">{action.name}</span>
          {action.description && <span className="text-sm text-gray-500">{action.description}</span>}
        </span>
      </span>
      <span className="shrink-0 text-sm whitespace-nowrap text-gray-500">Run →</span>
    </NavLink>
  );
};
