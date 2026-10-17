import type { RunState } from '../shared/types/RunState';

export type RunListener = (state: RunState) => void;
