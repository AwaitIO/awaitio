import { defineComponent } from 'awaitio';
import { Input } from 'awaitio/ui';
import { z } from 'zod';

export const inputNumber = defineComponent({
  props: z.object({
    placeholder: z.string().optional(),
    helpText: z.string().optional(),
    defaultValue: z.number().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    decimals: z.number().int().nonnegative().default(0),
  }),
  // The field holds what was typed; the handler gets a number. A plain decimal only, so Number() never sees 1e3 or 0x10.
  returns: z
    .string({ required_error: 'enter a number' })
    .trim()
    .regex(/^-?\d+(\.\d+)?$/, 'enter a number')
    .transform((value) => {
      return Number(value);
    }),
  initialValue: (props) => {
    return props.defaultValue?.toString() ?? '';
  },
  validate: ({ label, props, value }) => {
    if (props.min !== undefined && value < props.min) {
      return `${label} must be at least ${props.min}.`;
    }

    if (props.max !== undefined && value > props.max) {
      return `${label} must be at most ${props.max}.`;
    }

    if (Number(value.toFixed(props.decimals)) !== value) {
      return props.decimals === 0 ? `${label} must be a whole number.` : `${label} can have at most ${props.decimals} decimal places.`;
    }

    return null;
  },
  component: ({ props, value, onChange, disabled, autoFocus, optional }) => {
    return (
      <Input
        type="number"
        inputMode={props.decimals === 0 ? 'numeric' : 'decimal'}
        value={value}
        onChange={onChange}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
        step={10 ** -props.decimals}
        required={!optional}
        disabled={disabled}
        autoFocus={autoFocus}
      />
    );
  },
});
