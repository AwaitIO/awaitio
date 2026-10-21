import type { z } from 'zod/v4';

export type FormatZodErrorArgs = {
  error: z.ZodError;
};

// "id: Invalid input: expected string, received undefined." — short enough to show on the page that tried to start the run.
export const formatZodError = ({ error }: FormatZodErrorArgs) => {
  return error.issues
    .map((issue) => {
      return issue.path.length > 0 ? `${issue.path.join('.')}: ${issue.message}.` : `${issue.message}.`;
    })
    .join(' ');
};
