import { useEffect, useState, type FC } from 'react';
import { match, P } from 'ts-pattern';
import { cancelRun } from '../api/cancelRun';
import { startRun } from '../api/startRun';
import { ActionResult } from '../components/ActionResult';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Button } from '../components/Button';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { RunOutcome } from '../components/RunOutcome';
import { StepView } from '../components/StepView';
import { useFaviconState } from '../hooks/useFaviconState';
import { useRunState } from '../hooks/useRunState';
import { actionPath } from '../utils/actionPath';
import { navigate } from '../utils/navigate';
import { toErrorMessage } from '../utils/toErrorMessage';
import { toFaviconState } from '../utils/toFaviconState';

export type RunPageProps = {
  slug: string;
  runId: string;
};

export const RunPage: FC<RunPageProps> = ({ slug, runId }) => {
  const runState = useRunState(runId);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const isRunning = runState.state?.status === 'RUNNING' && !runState.isExpired;
  useFaviconState(isStarting ? 'busy' : toFaviconState({ state: runState.state, isExpired: runState.isExpired }));

  // A link with a wrong or renamed slug still shows the run; the address bar gets the run's real slug.
  useEffect(() => {
    if (runState.state && runState.state.actionSlug !== slug) {
      navigate(actionPath({ slug: runState.state.actionSlug, runId }), { replace: true });
    }
  }, [runState.state, slug, runId]);

  const cancel = async () => {
    try {
      await cancelRun(runId);
    } catch (error) {
      setErrorMessage(toErrorMessage(error));
    }
  };

  // Leaving a running action cancels it, so no handler stays parked for a page nobody looks at.
  const leaveTo = async (href: string) => {
    if (isRunning) {
      await cancel();
    }

    navigate(href);
  };

  const runAgain = async () => {
    // A double click would otherwise start two runs and orphan one of them.
    if (!runState.state || isStarting) {
      return;
    }

    setIsStarting(true);

    try {
      navigate(actionPath({ slug: runState.state.actionSlug, runId: await startRun({ slug: runState.state.actionSlug, params: runState.state.params }) }), { replace: true });
    } catch (error) {
      setErrorMessage(toErrorMessage(error));
      setIsStarting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* The run's controls sit next to its breadcrumbs and title, centred on both, so they stay in one place whatever the
          step below is. */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Breadcrumbs
            slug={runState.state?.actionSlug ?? slug}
            onNavigate={(href) => {
              void leaveTo(href);
            }}
          />
          <h1 className="text-2xl font-semibold">{runState.state?.actionName ?? ' '}</h1>
        </div>
        <div className="flex shrink-0 gap-3">
          {isRunning && (
            <Button
              variant="secondary"
              onClick={() => {
                void cancel();
              }}
            >
              Cancel
            </Button>
          )}
          {runState.state && !isRunning && (
            <Button
              disabled={isStarting}
              onClick={() => {
                void runAgain();
              }}
            >
              {match(isStarting)
                .with(true, () => 'Starting…')
                .with(false, () => 'Run again')
                .exhaustive()}
            </Button>
          )}
        </div>
      </div>
      {match(runState)
        .with({ isExpired: true }, () => {
          return <p className="text-sm text-gray-500">This run is no longer available. It finished a while ago or the server restarted.</p>;
        })
        .with({ state: P.nullish }, () => {
          return <p className="text-sm text-gray-500">Connecting…</p>;
        })
        .with({ state: { result: { status: 'SUCCESS' } } }, ({ state: { result, finishedAt } }) => {
          return (
            <div className="flex flex-col gap-4">
              <RunOutcome status="SUCCESS" finishedAt={finishedAt} />
              <div className="flex flex-col gap-2 sm:pl-11">
                <p className="text-sm text-gray-500">Result:</p>
                <ActionResult data={result.data} />
              </div>
            </div>
          );
        })
        .with({ state: { result: { status: 'FAILURE' } } }, ({ state: { result, finishedAt } }) => {
          return (
            <div className="flex flex-col gap-4">
              <RunOutcome status="FAILURE" finishedAt={finishedAt} />
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:ml-11">
                <p className="font-medium">{result.error}</p>
                <p className="whitespace-pre-wrap">{result.message}</p>
              </div>
            </div>
          );
        })
        .with({ state: { status: 'CANCELED' } }, ({ state: { finishedAt } }) => {
          return <RunOutcome status="CANCELED" finishedAt={finishedAt} />;
        })
        .with({ state: { step: P.nonNullable } }, ({ state: { step } }) => {
          return <StepView key={step.stepId} runId={runId} step={step} />;
        })
        .with({ state: P.nonNullable }, ({ state: { loading } }) => {
          return <LoadingIndicator loading={loading} />;
        })
        .exhaustive()}
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
};
