export type RunRespondResult = { status: 'OK' } | { status: 'VALIDATION_ERROR'; message: string } | { status: 'STALE_STEP' } | { status: 'RUN_CLOSED' };
