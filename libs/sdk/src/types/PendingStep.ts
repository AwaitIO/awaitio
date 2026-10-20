import type { StepCheck } from './StepCheck';
import type { Step } from '../shared/types/Step';
import type { StepComponent } from '../shared/types/StepComponent';

// The step a handler is parked on, with the resolver that wakes it up.
export type PendingStep = {
  stepId: string;
  components: StepComponent[];
  step: Step;
  check?: StepCheck;
  resolve: (values: unknown[]) => void;
  // An IOError, or whatever the handler's own check threw.
  reject: (error: unknown) => void;
};
