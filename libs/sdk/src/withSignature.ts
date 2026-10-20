import type { ComponentDefinition } from './types/ComponentDefinition';
import type { DisplayDefinition } from './types/DisplayDefinition';

// Gives a component a hand-written io method where its zod schema cannot type the props, typically a generic one:
// withSignature<SelectTableSignature>()(defineComponent({ … })) types io.select.table<TRow>() by its `data`.
// Only the type changes; the definition stays the same object. For a display component the signature is { action, page }.
export const withSignature = <TSignature>() => {
  return <TDefinition extends ComponentDefinition | DisplayDefinition>(definition: TDefinition) => {
    return definition as TDefinition & { signature?: TSignature };
  };
};
