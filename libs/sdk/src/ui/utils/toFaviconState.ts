import { match, P } from 'ts-pattern';
import type { RunState } from '../../shared/types/RunState';
import type { FaviconState } from '../types/FaviconState';

export type ToFaviconStateArgs = {
  state: RunState | null;
  isExpired: boolean;
};

// A running run with a step waits for the person; without one (connecting, loading, the handler working between
// steps) AwaitIO is busy; anything finished is idle.
export const toFaviconState = ({ state, isExpired }: ToFaviconStateArgs): FaviconState => {
  return match({ state, isExpired })
    .with({ isExpired: true }, () => {
      return 'idle' as const;
    })
    .with({ state: P.nullish }, () => {
      return 'busy' as const;
    })
    .with({ state: { status: 'RUNNING', step: P.nonNullable } }, () => {
      return 'waiting' as const;
    })
    .with({ state: { status: 'RUNNING' } }, () => {
      return 'busy' as const;
    })
    .otherwise(() => {
      return 'idle' as const;
    });
};
