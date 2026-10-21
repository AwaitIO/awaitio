import { useEffect, useState } from 'react';
import { runStateSchema } from '../../shared/schemas/runStateSchema';
import type { RunState } from '../../shared/types/RunState';
import { withBasePath } from '../../uikit/withBasePath';

// Follows one run over SSE. The server sends the current state on every (re)connect, so a page refresh or a
// dropped connection picks up exactly where it was; states older than the one shown are ignored.
export const useRunState = (runId: string) => {
  const [state, setState] = useState<RunState | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    let lastVersion = -1;
    const source = new EventSource(withBasePath(`/api/runs/${encodeURIComponent(runId)}/events`));

    source.addEventListener('state', (event) => {
      const next = runStateSchema.parse(JSON.parse((event as MessageEvent<string>).data));

      if (next.version <= lastVersion) {
        return;
      }

      lastVersion = next.version;
      setState(next);

      if (next.status !== 'RUNNING') {
        source.close();
      }
    });

    // EventSource retries on its own; it ends up CLOSED only when the server answers with an error, which means
    // the run is gone (finished long ago, or the server restarted).
    source.addEventListener('error', () => {
      if (source.readyState === EventSource.CLOSED) {
        setIsExpired(true);
      }
    });

    return () => {
      source.close();
    };
  }, [runId]);

  return { state, isExpired };
};
