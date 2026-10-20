import { requestJson } from './requestJson';
import { accessRequestResponseSchema } from '../../shared/schemas/accessRequestResponseSchema';
import type { AccessRequest } from '../../shared/types/AccessRequest';

export const requestAccess = async (body: AccessRequest) => {
  return accessRequestResponseSchema.parse(await requestJson({ path: '/api/access-request', method: 'POST', body })).user;
};
