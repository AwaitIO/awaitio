export type ToOptionKeyArgs = {
  option: unknown;
  key: ((option: never) => unknown) | undefined;
};

// The option's key as text, so 7 and '7' match; undefined when the option cannot name itself and has no `key`.
export const toOptionKey = ({ option, key }: ToOptionKeyArgs) => {
  if (key) {
    return String((key as (option: unknown) => unknown)(option));
  }

  if (typeof option === 'string' || typeof option === 'number') {
    return String(option);
  }

  if (typeof option === 'object' && option !== null && 'value' in option && (typeof option.value === 'string' || typeof option.value === 'number')) {
    return String(option.value);
  }

  return undefined;
};
