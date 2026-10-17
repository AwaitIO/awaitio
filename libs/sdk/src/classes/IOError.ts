import type { IOErrorKind } from '../types/IOErrorKind';

const messages: Record<IOErrorKind, string> = {
  CANCELED: 'The action was canceled.',
  RUN_CLOSED: 'The action is no longer running, io calls are not possible.',
  STEP_IN_PROGRESS: 'Another io call is already waiting for the user. Await io calls one by one, or use io.group() to ask for several values at once.',
};

export class IOError extends Error {
  readonly kind: IOErrorKind;

  constructor(kind: IOErrorKind) {
    super(messages[kind]);
    this.name = 'IOError';
    this.kind = kind;
  }
}
