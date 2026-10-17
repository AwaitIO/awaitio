import { toFailureResult } from './toFailureResult';
import type { ActionResult } from '../shared/types/ActionResult';

export type ToActionResultArgs = {
  value: unknown;
};

// The result goes to the browser as JSON, so it is normalized here once: Dates become ISO strings,
// undefined becomes null, and a value that cannot be serialized fails the run instead of the stream.
export const toActionResult = ({ value }: ToActionResultArgs): ActionResult => {
  try {
    return { status: 'SUCCESS', data: JSON.parse(JSON.stringify(value ?? null)) };
  } catch (error) {
    return toFailureResult({ error });
  }
};
