import { useFieldId, type SelectProps } from 'awaitio/ui';
import { SelectArrow } from '../components/SelectArrow';
import { constants } from '../constants';
import type { FC } from 'react';

// A native drop-down for one of many options.
export const Select: FC<SelectProps> = ({ choices, value, onChange, placeholder = 'Choose…', disabled, autoFocus }) => {
  return (
    <div className="relative">
      <select
        id={useFieldId()}
        value={value}
        disabled={disabled}
        autoFocus={autoFocus}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        className={constants.SELECT_CLASS_NAME}
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
      <SelectArrow />
    </div>
  );
};
