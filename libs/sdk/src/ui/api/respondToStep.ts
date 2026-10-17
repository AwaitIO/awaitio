import { requestJson } from './requestJson';
import type { StepResponse } from '../../shared/types/StepResponse';

export type RespondToStepArgs = StepResponse & {
  runId: string;
};

export const respondToStep = async ({ runId, stepId, values }: RespondToStepArgs) => {
  await requestJson({ path: `/api/runs/${encodeURIComponent(runId)}/respond`, method: 'POST', body: { stepId, values } });
};
