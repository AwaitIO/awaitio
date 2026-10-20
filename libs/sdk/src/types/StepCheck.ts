import type { StepCheckResult } from './StepCheckResult';

// Runs on the server after every component accepted its answer; the values are the parsed ones the handler would get.
export type StepCheck = (values: unknown[]) => Promise<StepCheckResult>;
