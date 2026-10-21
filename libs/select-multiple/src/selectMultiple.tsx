import { defineComponent, withSignature } from 'awaitio';
import { MultiSelect } from 'awaitio/ui';
import { z } from 'zod/v4';
import type { SelectMultipleSignature } from './types/SelectMultipleSignature';
import { findOptionIndex } from './utils/findOptionIndex';
import { toSelectChoices } from './utils/toSelectChoices';

// key and label run on the server, so they are checked to be functions and never sent to the browser.
const optionFunctionSchema = z
  .custom<(option: never) => unknown>((value) => {
    return typeof value === 'function';
  }, 'Expected a function of the option')
  .optional();

// Typed by SelectMultipleSignature: the schema checks the props, the signature gives key and label the option type and
// the handler the chosen options.
export const selectMultiple = withSignature<SelectMultipleSignature>()(
  defineComponent({
    props: z
      .object({
        // Strings, numbers, { value, label } objects or any records with key and label. They stay on the server; the
        // browser gets only the labels and answers with the indexes of the chosen ones.
        options: z.array(z.unknown()),
        key: optionFunctionSchema,
        label: optionFunctionSchema,
        // Keys (ids are enough) or the options themselves.
        defaultValue: z.array(z.unknown()).optional(),
        // How many options must and may be chosen; by default any number, none included.
        minSelections: z.number().int().nonnegative().optional(),
        maxSelections: z.number().int().positive().optional(),
        helpText: z.string().optional(),
      })
      .transform(({ options, key, label, defaultValue, ...props }, ctx) => {
        const { choices, keys, issues } = toSelectChoices({ options, key, label });

        issues.forEach((message) => {
          ctx.addIssue({ code: 'custom', path: ['options'], message });
        });

        const found = (defaultValue ?? []).map((wanted) => {
          return { wanted, index: findOptionIndex({ options, keys, key, wanted }) };
        });
        const missing = found.filter(({ index }) => {
          return index === -1;
        });

        // A default that is not offered is usually data that moved on (a deleted record), so it is left out instead of
        // failing the action that could fix it.
        if (missing.length > 0) {
          console.warn(
            `io.select.multiple: defaultValue ${missing
              .map(({ wanted }) => {
                return JSON.stringify(wanted);
              })
              .join(', ')} is not among the options, left out.`,
          );
        }

        // In the order of the options, each once.
        const selected = [
          ...new Set(
            found.flatMap(({ index }) => {
              return index === -1 ? [] : [index];
            }),
          ),
        ]
          .sort((a, b) => {
            return a - b;
          })
          .map(String);

        return { ...props, choices, selected };
      }),
    // The indexes of the chosen options, in the order of the options; the handler gets the options, see toValue.
    returns: z.array(z.string()),
    initialValue: (props) => {
      return props.selected;
    },
    validate: ({ label, props, value }) => {
      const offered = props.choices.map((choice) => {
        return choice.value;
      });

      if (
        value.some((chosen) => {
          return !offered.includes(chosen);
        }) ||
        new Set(value).size !== value.length
      ) {
        return `${label}: choose from the options only.`;
      }

      if (props.minSelections !== undefined && value.length < props.minSelections) {
        return `${label}: choose at least ${props.minSelections}.`;
      }

      if (props.maxSelections !== undefined && value.length > props.maxSelections) {
        return `${label}: choose at most ${props.maxSelections}.`;
      }

      return null;
    },
    // The original options, records with their Dates and relations or enum members, as the handler passed them, in the
    // order of the options whatever order the browser sent.
    toValue: ({ props, value }) => {
      return value
        .map(Number)
        .sort((a, b) => {
          return a - b;
        })
        .map((index) => {
          return props.options[index];
        });
    },
    component: ({ props, value, onChange, disabled, autoFocus }) => {
      return (
        <MultiSelect
          choices={props.choices}
          value={value}
          onChange={(chosen) => {
            // Keep the order of the options, not the order of the picks.
            onChange(
              props.choices
                .filter((choice) => {
                  return chosen.includes(choice.value);
                })
                .map((choice) => {
                  return choice.value;
                }),
            );
          }}
          isFull={props.maxSelections !== undefined && value.length >= props.maxSelections}
          disabled={disabled}
          autoFocus={autoFocus}
        />
      );
    },
  }),
);
