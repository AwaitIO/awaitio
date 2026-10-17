import type { ActionResult } from '../shared/types/ActionResult';

export type ToFailureResultArgs = {
  error: unknown;
};

// Annotated so `status` stays the literal the ActionResult union is discriminated by.
export const toFailureResult = ({ error }: ToFailureResultArgs): ActionResult => {
  if (error instanceof Error) {
    return { status: 'FAILURE', error: error.name, message: error.message };
  }

  return { status: 'FAILURE', error: 'Error', message: String(error) };
};
