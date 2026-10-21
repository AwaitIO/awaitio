import { defineComponent } from 'awaitio';
import { Checkbox, Field } from 'awaitio/ui';
import { z } from 'zod/v4';

export const inputBoolean = defineComponent({
  props: z.object({
    // Shown to the right of the box, so the question reads as one line: what checking it means.
    helpText: z.string(),
    defaultValue: z.boolean().default(false),
  }),
  returns: z.boolean(),
  initialValue: (props) => {
    return props.defaultValue;
  },
  // The help text sits beside the box instead of under the field, so the component lays out its own Field.
  wrap: false,
  component: ({ label, props, value, onChange, disabled, autoFocus, error }) => {
    return (
      <Field label={label} error={error}>
        <Checkbox checked={value} onChange={onChange} text={props.helpText} disabled={disabled} autoFocus={autoFocus} />
      </Field>
    );
  },
});
