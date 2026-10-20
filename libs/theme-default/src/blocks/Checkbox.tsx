import { useFieldId, type CheckboxProps } from 'awaitio/ui';
import type { FC } from 'react';

// A checkbox with its text to the right; its id comes from the Field, so the label above toggles it as well.
export const Checkbox: FC<CheckboxProps> = ({ checked, onChange, text, disabled, autoFocus }) => {
  return (
    <label className="flex cursor-pointer items-center gap-2 self-start text-sm text-gray-600">
      <input
        id={useFieldId()}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        autoFocus={autoFocus}
        onChange={(event) => {
          onChange(event.target.checked);
        }}
        className="size-4 accent-gray-900"
      />
      {text}
    </label>
  );
};
