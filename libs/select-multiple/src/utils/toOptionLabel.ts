export type ToOptionLabelArgs = {
  option: unknown;
  label: ((option: never) => unknown) | undefined;
};

// What the drop-down shows for the option; undefined when the option cannot name itself and has no `label`.
export const toOptionLabel = ({ option, label }: ToOptionLabelArgs) => {
  if (label) {
    return String((label as (option: unknown) => unknown)(option));
  }

  if (typeof option === 'string' || typeof option === 'number') {
    return String(option);
  }

  if (typeof option === 'object' && option !== null && 'label' in option && typeof option.label === 'string') {
    return option.label;
  }

  return undefined;
};
