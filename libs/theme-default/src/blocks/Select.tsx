import { useFieldId, type Choice, type SelectProps } from 'awaitio/ui';
import ReactSelect from 'react-select';
import type { FC } from 'react';

// A searchable drop-down for one of many options (react-select), drawn with the theme's classes instead of its own
// styles, so it matches the other controls.
export const Select: FC<SelectProps> = ({ choices, value, onChange, placeholder = 'Choose…', clearable = false, disabled, autoFocus }) => {
  const selected =
    choices.find((choice) => {
      return choice.value === value;
    }) ?? null;

  return (
    <ReactSelect<Choice>
      inputId={useFieldId()}
      options={choices}
      value={selected}
      onChange={(choice) => {
        onChange(choice?.value ?? '');
      }}
      placeholder={placeholder}
      isClearable={clearable}
      isDisabled={disabled}
      autoFocus={autoFocus}
      noOptionsMessage={() => {
        return 'Nothing found';
      }}
      unstyled
      classNames={{
        control: ({ isFocused, isDisabled }) => {
          return [
            'min-h-[38px] rounded-md border px-3 text-sm shadow-sm',
            isDisabled ? 'bg-gray-100 text-gray-500' : 'bg-white',
            isFocused ? 'border-gray-900' : 'border-gray-300',
          ].join(' ');
        },
        valueContainer: () => {
          return 'gap-1 py-2';
        },
        placeholder: () => {
          return 'text-gray-400';
        },
        input: () => {
          return 'text-gray-900';
        },
        indicatorsContainer: () => {
          return 'gap-1';
        },
        clearIndicator: () => {
          return 'cursor-pointer rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900';
        },
        dropdownIndicator: () => {
          return 'p-1 text-gray-500';
        },
        menu: () => {
          return 'mt-1 overflow-hidden rounded-md border border-gray-200 bg-white text-sm shadow-lg';
        },
        menuList: () => {
          return 'py-1';
        },
        option: ({ isFocused, isSelected }) => {
          return [
            'cursor-pointer px-3 py-2',
            isSelected ? 'bg-gray-900 text-white' : isFocused ? 'bg-gray-100 text-gray-900' : 'text-gray-900',
          ].join(' ');
        },
        noOptionsMessage: () => {
          return 'px-3 py-2 text-gray-500';
        },
      }}
    />
  );
};
