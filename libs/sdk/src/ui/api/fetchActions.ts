import { requestJson } from './requestJson';
import { actionListSchema } from '../../shared/schemas/actionListSchema';

export const fetchActions = async () => {
  return actionListSchema.parse(await requestJson({ path: '/api/actions' })).actions;
};
