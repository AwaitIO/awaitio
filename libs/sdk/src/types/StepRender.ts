import type { StepCheck } from './StepCheck';
import type { StepComponent } from '../shared/types/StepComponent';

// Shows the components as one step and resolves with their answers once they pass the components' checks and `check`.
export type StepRender = (components: StepComponent[], check?: StepCheck) => Promise<unknown[]>;
