export const toErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : String(error);
};
