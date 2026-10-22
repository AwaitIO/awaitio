import { defineComponent, withSignature } from 'awaitio';
import { NativeSelect } from 'awaitio/ui';
import { z } from 'zod/v4';
import type { SelectSingleNativeSignature } from './types/SelectSingleNativeSignature';
import { findOptionIndex } from './utils/findOptionIndex';
import { toSelectChoices } from './utils/toSelectChoices';

// key and label run on the server, so they are checked to be functions and never sent to the browser.
const optionFunctionSchema = z
  .custom<(option: never) => unknown>((value) => {
    return typeof value === 'function';
  }, 'Expected a function of the option')
  .optional();

// Typed by SelectSingleNativeSignature: the schema checks the props, the signature gives key and label the option type and
// the handler the chosen option.
export const selectSingleNative = withSignature<SelectSingleNativeSignature>()(
  defineComponent({
    props: z
      .object({
        // Strings, numbers, { value, label } objects or any records with key and label. They stay on the server; the
        // browser gets only the labels and answers with the index of the chosen one.
        options: z.array(z.unknown()),
        key: optionFunctionSchema,
        label: optionFunctionSchema,
        // A key (an id is enough) or the option itself.
        defaultValue: z.unknown().optional(),
        helpText: z.string().optional(),
      })
      .transform(({ options, key, label, defaultValue, ...props }, ctx) => {
        const { choices, keys, issues } = toSelectChoices({ options, key, label });

        issues.forEach((message) => {
          ctx.addIssue({ code: 'custom', path: ['options'], message });
        });

        const selected = defaultValue === undefined ? -1 : findOptionIndex({ options, keys, key, wanted: defaultValue });

        // A default that is not offered is usually data that moved on (a deleted record), so the field starts empty
        // instead of failing the action that could fix it.
        if (defaultValue !== undefined && selected === -1) {
          console.warn(`io.select.singleNative: defaultValue ${JSON.stringify(defaultValue)} is not among the options, nothing is chosen.`);
        }

        return { ...props, choices, selected: selected === -1 ? '' : String(selected) };
      }),
    // The index of the chosen option; the handler gets the option itself, see toValue.
    returns: z.string(),
    initialValue: (props) => {
      return props.selected;
    },
    validate: ({ label, props, value }) => {
      if (value === '') {
        return `Choose ${label.toLowerCase()}.`;
      }

      const isOffered = props.choices.some((choice) => {
        return choice.value === value;
      });

      return isOffered ? null : `${label}: choose one of the options.`;
    },
    // The original option, a record with its Dates and relations or an enum member, as the handler passed it.
    toValue: ({ props, value }) => {
      return props.options[Number(value)];
    },
    component: ({ props, value, onChange, disabled, autoFocus }) => {
      return <NativeSelect choices={props.choices} value={value} onChange={onChange} disabled={disabled} autoFocus={autoFocus} />;
    },
  }),
);
