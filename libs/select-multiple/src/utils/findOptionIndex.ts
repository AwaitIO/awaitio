import { toOptionKey } from './toOptionKey';

export type FindOptionIndexArgs = {
  options: unknown[];
  keys: (string | undefined)[];
  key: ((option: never) => unknown) | undefined;
  wanted: unknown;
};

// The index of the option the default names: the option itself, or one with the same key. -1 when there is none.
export const findOptionIndex = ({ options, keys, key, wanted }: FindOptionIndexArgs) => {
  const sameOption = options.indexOf(wanted);

  if (sameOption !== -1) {
    return sameOption;
  }

  // A record is matched by its own key, a plain id or enum value is the key itself.
  const wantedKey = typeof wanted === 'object' && wanted !== null ? toOptionKey({ option: wanted, key }) : String(wanted);

  return wantedKey === undefined ? -1 : keys.indexOf(wantedKey);
};
