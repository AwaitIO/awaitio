export type DisplayUiProps<TProps> = {
  // The label given to io.display.<name>(label, …); the SDK shows it as the block's heading, null for none.
  label: string | null;
  // Already parsed by the display component's props schema.
  props: TProps;
};
