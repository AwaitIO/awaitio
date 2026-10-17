import { requestJson } from './requestJson';
import { sessionUserSchema } from '../../shared/schemas/sessionUserSchema';
import type { LoginRequest } from '../../shared/types/LoginRequest';

export const logIn = async (body: LoginRequest) => {
  return sessionUserSchema.parse(await requestJson({ path: '/api/login', method: 'POST', body }));
};
