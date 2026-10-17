import { useEffect, useRef, useState, type FC } from 'react';
import { match, P } from 'ts-pattern';
import { ApiError } from '../api/ApiError';
import { startRun } from '../api/startRun';
import { useFaviconState } from '../hooks/useFaviconState';
import { actionListPath } from '../utils/actionListPath';
import { actionPath } from '../utils/actionPath';
import { getSearchParams } from '../utils/getSearchParams';
import { navigate } from '../utils/navigate';
import { toErrorMessage } from '../utils/toErrorMessage';

export type ActionStartPageProps = {
  slug: string;
};

// Opening /actions/<slug>?… starts a run with the query string as ctx.params and swaps the URL for
// /actions/<slug>/<runId>, so a refresh joins that run instead of starting another one.
export const ActionStartPage: FC<ActionStartPageProps> = ({ slug }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // StrictMode runs effects twice in development; the ref keeps that from starting two runs.
  const hasStarted = useRef(false);
  useFaviconState(errorMessage === null ? 'busy' : 'idle');

  useEffect(() => {
    if (hasStarted.current) {
      return;
    }

    hasStarted.current = true;
    startRun({ slug, params: getSearchParams() })
      .then((runId) => {
        navigate(actionPath({ slug, runId }), { replace: true });
      })
      .catch((error) => {
        setErrorMessage(error instanceof ApiError && error.code === 'ACTION_NOT_FOUND' ? `There is no action "${slug}".` : toErrorMessage(error));
      });
  }, [slug]);

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={() => {
          navigate(actionListPath());
        }}
        className="self-start text-sm text-gray-500 hover:text-gray-900"
      >
        ← Actions
      </button>
      {match(errorMessage)
        .with(P.string, (message) => <p className="text-sm text-red-600">{message}</p>)
        .with(P.nullish, () => <p className="text-sm text-gray-500">Starting…</p>)
        .exhaustive()}
    </div>
  );
};
