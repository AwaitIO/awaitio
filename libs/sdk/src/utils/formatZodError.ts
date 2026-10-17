import type { z } from 'zod';

export type FormatZodErrorArgs = {
  error: z.ZodError;
};

// "id: Required. tab: Invalid enum value…" — short enough to show on the page that tried to start the run.
export const formatZodError = ({ error }: FormatZodErrorArgs) => {
  return error.issues
    .map((issue) => {
      return issue.path.length > 0 ? `${issue.path.join('.')}: ${issue.message}.` : `${issue.message}.`;
    })
    .join(' ');
};
