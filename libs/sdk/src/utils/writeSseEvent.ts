import type { Response } from 'express';

export type WriteSseEventArgs = {
  res: Response;
  event: string;
  data: unknown;
};

export const writeSseEvent = ({ res, event, data }: WriteSseEventArgs) => {
  res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
};
