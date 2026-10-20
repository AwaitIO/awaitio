export type ComponentToValueArgs<TProps, TValue> = {
  // The props as the handler passed them, before the schema parsed them: functions and the original records included.
  props: TProps;
  value: TValue;
};
