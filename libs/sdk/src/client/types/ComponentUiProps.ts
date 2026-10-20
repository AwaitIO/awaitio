export type ComponentUiProps<TProps, TValue> = {
  label: string;
  props: TProps;
  value: TValue;
  onChange: (value: TValue) => void;
  // Sets the value and sends the step, for a component with its own buttons (submitButton: false).
  submit: (value: TValue) => void;
  disabled: boolean;
  autoFocus: boolean;
  // What the server found wrong with the value; a component with `wrap: false` shows it itself.
  error: string | null;
};
