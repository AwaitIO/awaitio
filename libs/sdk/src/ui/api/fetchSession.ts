import { ApiError } from './ApiError';
import { requestJson } from './requestJson';
import { sessionUserSchema } from '../../shared/schemas/sessionUserSchema';

// The logged-in user, or null when the browser has no valid session.
export const fetchSession = async () => {
  try {
    return sessionUserSchema.parse(await requestJson({ path: '/api/session' }));
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }

    throw error;
  }
};
