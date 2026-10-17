import { requestJson } from './requestJson';
import { startRunResponseSchema } from '../../shared/schemas/startRunResponseSchema';
import type { RunParams } from '../../shared/types/RunParams';

export type StartRunArgs = {
  slug: string;
  params: RunParams;
};

export const startRun = async ({ slug, params }: StartRunArgs) => {
  return startRunResponseSchema.parse(await requestJson({ path: `/api/actions/${encodeURIComponent(slug)}/runs`, method: 'POST', body: { params } })).runId;
};
