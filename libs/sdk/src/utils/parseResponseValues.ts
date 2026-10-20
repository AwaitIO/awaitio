import { isEmptyValue } from './isEmptyValue';
import type { StepComponent } from '../shared/types/StepComponent';
import type { ComponentRegistry } from '../types/ComponentRegistry';
import type { ParsedResponseValues } from '../types/ParsedResponseValues';

export type ParseResponseValuesArgs = {
  registry: ComponentRegistry;
  components: StepComponent[];
  values: unknown[];
};

// The server is the source of truth: every value goes through its component's `returns` schema and `validate`,
// and the handler gets the parsed output. Every field is checked, so the form can show all problems at once,
// each under its own field. The literal return type keeps `status` a discriminant.
export const parseResponseValues = ({ registry, components, values }: ParseResponseValuesArgs): ParsedResponseValues => {
  if (values.length !== components.length) {
    return {
      status: 'INVALID',
      errors: components.map(() => {
        return null;
      }),
      message: `Expected ${components.length} values, received ${values.length}.`,
    };
  }

  const results = components.map((component, index) => {
    // A display component has nothing to answer.
    if (component.display && registry.displayByType.has(component.type)) {
      return { error: null, value: undefined };
    }

    const definition = registry.byType.get(component.type);

    if (!definition) {
      return { error: `Unknown component ${component.type}.`, value: undefined };
    }

    // A disabled field keeps its starting value; what the browser sent for it does not count, and there is nothing to check.
    if (component.disabled) {
      const kept = definition.returns.safeParse(definition.initialValue?.(component.props));

      return kept.success ? { error: null, value: kept.data } : { error: `${component.label}: a disabled field needs a defaultValue.`, value: undefined };
    }

    // An optional field left empty gives undefined; its component's checks are for an answer, not for no answer.
    if (component.optional && isEmptyValue({ value: values[index] })) {
      return { error: null, value: undefined };
    }

    const parsed = definition.returns.safeParse(values[index]);

    if (!parsed.success) {
      return { error: `${component.label}: ${parsed.error.issues[0]?.message ?? 'invalid value'}.`, value: undefined };
    }

    return { error: definition.validate?.({ label: component.label, props: component.props, value: parsed.data }) ?? null, value: parsed.data };
  });
  const errors = results.map((result) => {
    return result.error;
  });

  if (
    errors.some((error) => {
      return error !== null;
    })
  ) {
    return { status: 'INVALID', errors, message: null };
  }

  return {
    status: 'VALID',
    values: results.map((result) => {
      return result.value;
    }),
  };
};
