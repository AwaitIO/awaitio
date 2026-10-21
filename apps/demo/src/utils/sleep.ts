export type SleepArgs = {
  ms: number;
};

export const sleep = ({ ms }: SleepArgs) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
};
