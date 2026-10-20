import { defineComponent } from 'awaitio';
import { Input } from 'awaitio/ui';
import { z } from 'zod';

export const inputUrl = defineComponent({
  props: z.object({
    placeholder: z.string().optional(),
    helpText: z.string().optional(),
    // A URL from the handler travels as its text.
    defaultValue: z
      .union([z.string(), z.instanceof(URL)])
      .transform((value) => {
        return value.toString();
      })
      .optional(),
    // Schemes the address may use, without the colon: by default only web addresses.
    allowedProtocols: z.array(z.string()).min(1).default(['http', 'https']),
  }),
  // The browser sends the text; the handler gets a URL.
  returns: z
    .string()
    .trim()
    .url('enter a URL')
    .transform((value) => {
      return new URL(value);
    }),
  initialValue: (props) => {
    return props.defaultValue ?? '';
  },
  validate: ({ label, props, value }) => {
    const protocol = value.protocol.replace(/:$/, '');

    return props.allowedProtocols.includes(protocol) ? null : `${label} must start with ${props.allowedProtocols.map((allowed) => `${allowed}://`).join(' or ')}.`;
  },
  component: ({ props, value, onChange, disabled, autoFocus, optional }) => {
    return <Input type="url" inputMode="url" value={value} onChange={onChange} placeholder={props.placeholder} required={!optional} disabled={disabled} autoFocus={autoFocus} />;
  },
});
