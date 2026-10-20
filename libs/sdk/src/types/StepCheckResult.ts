// What the handler's checks found: a message under each field (null where it is fine) and one for the whole step.
export type StepCheckResult = {
  errors: (string | null)[];
  message: string | null;
};
