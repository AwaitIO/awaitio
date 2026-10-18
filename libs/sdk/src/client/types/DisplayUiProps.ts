export type DisplayUiProps<TProps> = {
  // The label given to io.display.<name>(label, …); the SDK shows it as the block's heading.
  label: string;
  // Already parsed by the display component's props schema.
  props: TProps;
};
