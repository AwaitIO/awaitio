import { ApiError } from './ApiError';
import { constants } from '../../shared/constants';
import { errorResponseSchema } from '../../shared/schemas/errorResponseSchema';

export type RequestJsonArgs = {
  path: string;
  method?: 'GET' | 'POST';
  body?: unknown;
};

// The session cookie goes along automatically (same origin). Every request carries the UI's header and every POST a
// JSON body: together they are what the server's cross-site check accepts, and what no other origin can send.
export const requestJson = async ({ path, method = 'GET', body }: RequestJsonArgs) => {
  const response = await fetch(path, {
    method,
    headers: method === 'POST' ? { [constants.REQUEST_HEADER_NAME]: '1', 'Content-Type': 'application/json' } : { [constants.REQUEST_HEADER_NAME]: '1' },
    body: method === 'POST' ? JSON.stringify(body ?? {}) : undefined,
  });
  const payload: unknown = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    const error = errorResponseSchema.safeParse(payload);

    throw new ApiError({ status: response.status, code: error.success ? error.data.error : 'REQUEST_FAILED', message: error.success ? error.data.message : undefined });
  }

  return payload;
};
