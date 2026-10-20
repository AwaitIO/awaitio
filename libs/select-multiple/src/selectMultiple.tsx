import { defineComponent } from 'awaitio';
import { MultiSelect } from 'awaitio/ui';
import { z } from 'zod';

export const selectMultiple = defineComponent({
  props: z.object({
    options: z.array(z.object({ value: z.string(), label: z.string() })).min(1),
    defaultValue: z.array(z.string()).optional(),
    // How many options must and may be chosen; by default any number, none included.
    minSelections: z.number().int().nonnegative().optional(),
    maxSelections: z.number().int().positive().optional(),
    helpText: z.string().optional(),
  }),
  // The chosen options' values, in the order of the options.
  returns: z.array(z.string()),
  initialValue: (props) => {
    return props.defaultValue ?? [];
  },
  validate: ({ label, props, value }) => {
    const offered = props.options.map((option) => {
      return option.value;
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
  component: ({ props, value, onChange, disabled, autoFocus }) => {
    return (
      <MultiSelect
        choices={props.options}
        value={value}
        onChange={(chosen) => {
          // Keep the order of the options, not the order of the picks.
          onChange(
            props.options
              .filter((option) => {
                return chosen.includes(option.value);
              })
              .map((option) => {
                return option.value;
              }),
          );
        }}
        isFull={props.maxSelections !== undefined && value.length >= props.maxSelections}
        disabled={disabled}
        autoFocus={autoFocus}
      />
    );
  },
});
