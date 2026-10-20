import { defineComponent } from 'awaitio';
import { Select } from 'awaitio/ui';
import { z } from 'zod';

export const selectSingle = defineComponent({
  props: z.object({
    options: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        }),
      )
      .min(1),
    defaultValue: z.string().optional(),
    helpText: z.string().optional(),
  }),
  returns: z.string(),
  initialValue: (props) => {
    return props.defaultValue ?? '';
  },
  validate: ({ label, props, value }) => {
    if (value === '') {
      return `Choose ${label.toLowerCase()}.`;
    }

    const isOffered = props.options.some((option) => {
      return option.value === value;
    });

    return isOffered ? null : `${label}: choose one of the options.`;
  },
  component: ({ props, value, onChange, disabled, autoFocus }) => {
    return <Select choices={props.options} value={value} onChange={onChange} disabled={disabled} autoFocus={autoFocus} />;
  },
});
