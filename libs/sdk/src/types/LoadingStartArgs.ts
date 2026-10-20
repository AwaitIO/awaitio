export type LoadingStartArgs = {
  label: string;
  description?: string;
  // How many items the handler is about to go through; the page shows a progress bar that ctx.loading.completeOne() fills.
  itemsInQueue?: number;
};
