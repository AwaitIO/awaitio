import { requestJson } from './requestJson';

export const cancelRun = async (runId: string) => {
  await requestJson({ path: `/api/runs/${encodeURIComponent(runId)}/cancel`, method: 'POST' });
};
