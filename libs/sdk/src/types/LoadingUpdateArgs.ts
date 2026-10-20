// What ctx.loading.update() changes; the rest, and the count of completed items, stays.
export type LoadingUpdateArgs = {
  label?: string;
  description?: string;
  itemsInQueue?: number;
};
