import { defineComponent } from 'awaitio';
import { Textarea } from 'awaitio/ui';
import { z } from 'zod';

export const inputTextarea = defineComponent({
  props: z.object({
    placeholder: z.string().optional(),
    helpText: z.string().optional(),
    defaultValue: z.string().optional(),
    lines: z.number().int().positive().default(4),
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
  component: ({ props, value, onChange, disabled, autoFocus, optional }) => {
    return (
      <Textarea
        value={value}
        onChange={onChange}
        rows={props.lines}
        placeholder={props.placeholder}
        minLength={props.minLength}
        maxLength={props.maxLength}
        required={!optional}
        disabled={disabled}
        autoFocus={autoFocus}
      />
    );
  },
});
