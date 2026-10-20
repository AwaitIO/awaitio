import { toOptionKey } from './toOptionKey';
import { toOptionLabel } from './toOptionLabel';

export type ToSelectChoicesArgs = {
  options: unknown[];
  key: ((option: never) => unknown) | undefined;
  label: ((option: never) => unknown) | undefined;
};

// What the browser gets for the options: each one's index as the value and its label, plus every option's key for
// finding the default. The options themselves stay on the server, so their values need not be strings.
export const toSelectChoices = ({ options, key, label }: ToSelectChoicesArgs) => {
  const keys = options.map((option) => {
    return toOptionKey({ option, key });
  });
  const labels = options.map((option) => {
    return toOptionLabel({ option, label });
  });
  const issues = [
    ...(keys.includes(undefined) ? ['an option without value needs key: (option) => …'] : []),
    ...(labels.includes(undefined) ? ['an option without label needs label: (option) => …'] : []),
    ...(new Set(keys).size !== keys.length ? ['two options have the same key'] : []),
  ];

  return {
    choices: labels.map((text, index) => {
      return { value: String(index), label: text ?? '' };
    }),
    keys,
    issues,
  };
};
