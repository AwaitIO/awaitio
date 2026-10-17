import type { IOError } from '../classes/IOError';
import type { Step } from '../shared/types/Step';
import type { StepComponent } from '../shared/types/StepComponent';

// The step a handler is parked on, with the resolver that wakes it up.
export type PendingStep = {
  stepId: string;
  components: StepComponent[];
  step: Step;
  resolve: (values: unknown[]) => void;
  reject: (error: IOError) => void;
};
