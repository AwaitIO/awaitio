import { requestJson } from './requestJson';
import { startRunResponseSchema } from '../../shared/schemas/startRunResponseSchema';

export const startRun = async (actionSlug: string) => {
  return startRunResponseSchema.parse(await requestJson({ path: `/api/actions/${encodeURIComponent(actionSlug)}/runs`, method: 'POST' })).runId;
};
