import { defineComponent } from 'awaitio';
import { Input } from 'awaitio/ui';
import { z } from 'zod';

export const inputEmail = defineComponent({
  props: z.object({
    placeholder: z.string().optional(),
    helpText: z.string().optional(),
    defaultValue: z.string().optional(),
  }),
  // The address without the spaces around it; the server checks it is one.
  returns: z.string().trim().email('enter an email address'),
  initialValue: (props) => {
    return props.defaultValue ?? '';
  },
  component: ({ props, value, onChange, disabled, autoFocus, optional }) => {
    return <Input type="email" autoComplete="email" value={value} onChange={onChange} placeholder={props.placeholder} required={!optional} disabled={disabled} autoFocus={autoFocus} />;
  },
});
