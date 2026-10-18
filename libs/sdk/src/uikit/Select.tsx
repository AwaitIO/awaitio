import { useContext, type FC } from 'react';
import type { Choice } from './ChoiceList';
import { constants } from './constants';
import { FieldContext } from './FieldContext';

export type SelectProps = {
  choices: Choice[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
};

// A native drop-down for one of many options.
export const Select: FC<SelectProps> = ({ choices, value, onChange, placeholder = 'Choose…', disabled, autoFocus }) => {
  return (
    <select
      id={useContext(FieldContext)}
      value={value}
      disabled={disabled}
      autoFocus={autoFocus}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      className={constants.CONTROL_CLASS_NAME}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {choices.map((choice) => {
        return (
          <option key={choice.value} value={choice.value}>
            {choice.label}
          </option>
        );
      })}
    </select>
  );
};
