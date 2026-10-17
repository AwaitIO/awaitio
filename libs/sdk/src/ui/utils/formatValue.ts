import { match, P } from 'ts-pattern';

export const formatValue = (value: unknown) => {
  return match(value)
    .with(P.nullish, () => {
      return '—';
    })
    .with(P.union(P.string, P.number, P.boolean), (primitive) => {
      return String(primitive);
    })
    .otherwise((nested) => {
      return JSON.stringify(nested);
    });
};
