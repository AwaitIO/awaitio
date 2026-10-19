import { defineComponent } from 'awaitio';
import { Input } from 'awaitio/ui';
import { z } from 'zod';

export const inputText = defineComponent({
  props: z.object({
    placeholder: z.string().optional(),
    helpText: z.string().optional(),
    defaultValue: z.string().optional(),
    minLength: z.number().int().nonnegative().optional(),
    maxLength: z.number().int().positive().optional(),
  }),
  returns: z.string(),
  initialValue: (props) => {
    return props.defaultValue ?? '';
  },
  validate: ({ label, props, value }) => {
    if (value.trim().length === 0) {
      return `${label} is required.`;
    }

    if (props.minLength !== undefined && value.length < props.minLength) {
      return `${label} must be at least ${props.minLength} characters long.`;
    }

    if (props.maxLength !== undefined && value.length > props.maxLength) {
      return `${label} must be at most ${props.maxLength} characters long.`;
    }

    return null;
  },
  component: ({ props, value, onChange, disabled, autoFocus }) => {
    return <Input value={value} onChange={onChange} placeholder={props.placeholder} minLength={props.minLength} maxLength={props.maxLength} required disabled={disabled} autoFocus={autoFocus} />;
  },
});
