import { useEffect, useState, type FC } from 'react';
import type { ActionDefinition } from '../../shared/types/ActionDefinition';
import { fetchActions } from '../api/fetchActions';
import { actionPath } from '../utils/actionPath';
import { navigate } from '../utils/navigate';
import { toErrorMessage } from '../utils/toErrorMessage';

export const ActionListPage: FC = () => {
  const [actions, setActions] = useState<ActionDefinition[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchActions()
      .then(setActions)
      .catch((error) => {
        setErrorMessage(toErrorMessage(error));
      });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Actions</h1>
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
      {actions === null && !errorMessage && <p className="text-sm text-gray-500">Loading…</p>}
      {actions?.length === 0 && <p className="text-sm text-gray-500">No actions are defined.</p>}
      <ul className="flex flex-col gap-3">
        {actions?.map((action) => {
          const href = actionPath({ slug: action.slug });

          return (
            <li key={action.slug}>
              {/* A real link: it opens in a new tab with a modifier key, a plain click stays in the app. */}
              <a
                href={href}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
                    return;
                  }

                  event.preventDefault();
                  navigate(href);
                }}
                className="flex w-full items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm transition-colors hover:border-gray-400"
              >
                <span className="flex flex-col gap-1">
                  <span className="font-medium">{action.name}</span>
                  {action.description && <span className="text-sm text-gray-500">{action.description}</span>}
                  <span className="font-mono text-xs text-gray-400">{href}</span>
                </span>
                <span className="text-sm text-gray-500">Run →</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
